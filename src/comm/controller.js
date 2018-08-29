const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const {promisify} = require('util')

const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)
const config = require('../config/default')
const mime = require('./mime')
const compress = require('./compress')
const range = require('./range')
const isFresh = require('./cache.js')

const tplPath = path.join(__dirname, '../views/dir.ejs')
const source = fs.readFileSync(tplPath, 'utf-8')
const template = ejs.compile(source.toString())

module.exports = async function (req, res, filePath) {
  try {
    const stats = await stat(filePath)
    if (stats.isFile()) {
      const contentType = mime(filePath).content
      res.statusCode = 200
      res.setHeader('Content-Type', contentType)
      if (isFresh(stats, req, res)) {
        res.statusCode = 304
        res.end()
        return
      }

      let rs
      const {code, start, end} = range(stats.size, req, res)
      if (code === 200) {
        // 通过流的形式返回给客户端
        rs = fs.createReadStream(filePath)
      } else {
        // 返回range, 拿到文件部分内容
        rs = fs.createReadStream(filePath, {start, end})
      }

      if (filePath.match(config.compress)) {
        // 文件压缩
        rs = compress(rs, req, rs)
      }
      rs.pipe(res)
    } else if (stats.isDirectory()) {
      const files = await readdir(filePath)
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/html')
      const dir = path.relative(config.root, filePath)
      const data = {
        title: path.basename(filePath),
        dir: dir ? `/${dir}` : '',
        files: files.map(file => {
          return {
            file,
            icon: mime(path.join(filePath, file)).icon
          }
        })
      }
      res.end(template(data))
    }
  } catch (e) {
    console.log(e.message)
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/plain')
    res.end(`${filePath} is not a directory or file`)
  }
}

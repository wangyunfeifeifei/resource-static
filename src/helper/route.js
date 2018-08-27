const fs = require('fs')
const path = require('path')
const Handlebars = require('handlebars')
const {promisify} = require('util')

const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)
const config = require('../config/default')
const mime = require('./mime')
const compress = require('./compress')

const tplPath = path.join(__dirname, '../views/dir.hbs')
const source = fs.readFileSync(tplPath, 'utf-8')
const template = Handlebars.compile(source.toString())

module.exports = async function (req, res, filePath) {
  try {
    const stats = await stat(filePath)
    if (stats.isFile()) {
      const contentType = mime(filePath)
      res.statusCode = 200
      res.setHeader('Content-Type', contentType)
      // 通过流的形式返回给客户端
      let rs = fs.createReadStream(filePath)
      if (filePath.match(config.compress)) {
        // 代码压缩
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
            icon: mime(file)
          }
        })
      }
      res.end(template(data))
    }
  } catch (e) {
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/plain')
    res.end(`${filePath} is not a directory or file`)
  }
}

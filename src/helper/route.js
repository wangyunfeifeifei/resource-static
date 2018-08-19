const fs = require('fs')
const {promisify} = require('util')

const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)

module.exports = async function (req, res, filePath) {
  try {
    const stats = await stat(filePath)
    if (stats.isFile()) {
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/plain')
      // 通过流的形式返回给客户端
      fs.createReadStream(filePath).pipe(res)
    }
    if (stats.isDirectory()) {
      const files = await readdir(filePath)
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/plain')
      res.end(files.join('\n'))
    }
  } catch (e) {
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/plain')
    res.end(`${filePath} is not a directory or file`)
  }
}

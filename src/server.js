const http = require('http')
const conf = require('./config/default')
const chalk = require('chalk')
const path = require('path')
const route = require('./comm/controller')

function Server () {
  this.config = conf
}

Server.prototype.start = function () {
  const server = http.createServer(function (req, res) {
    const url = req.url
    const filePath = path.join(conf.root, url)
    res.setHeader('charset', 'utf-8')
    route(req, res, filePath)
  })

  server.listen(this.config.port, this.config.hostname, () => {
    const addr = `http://${conf.hostname}:${conf.port}`
    console.log(`Server started at ${chalk.green(addr)}`)
  })
}

module.exports = Server

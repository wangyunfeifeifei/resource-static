const http = require('http')
const conf = require('./config/default')
const chalk = require('chalk')
const path = require('path')
const route = require('./helper/route')

const server = http.createServer(function (req, res) {
  const url = req.url
  const filePath = path.join(conf.root, url)
  route(req, res, filePath)
})

server.listen(conf.port, conf.hostname, () => {
  const addr = `http://${conf.hostname}:${conf.port}`
  console.log(`Server started at ${chalk.green(addr)}`)
})

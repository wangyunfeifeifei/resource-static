const program = require('./commander')
const Server = require('./server')

const server = new Server()

const {port, hostname, root} = server.config
Object.assign(server.config, {
  port: program.port || port,
  hostname: program.host || hostname,
  root: program.dir || root
})

server.start()

const program = require('commander')
const pkg = require('../package.json')

program
  .version(pkg.version)
  .option('-p, --port', '设置端口号')
  .option('-h, --host', '设置host')
  .option('-d, --dir', '设置根路径')
  .parse(process.argv)

module.exports = program

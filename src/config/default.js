module.exports = {
  root: process.cwd(),
  hostname: '127.0.0.1',
  port: 6553,
  compress: /\.(html|js|css|txt|md)/,
  cache: {
    maxAge: 600,
    expires: true,
    lastModified: true,
    etag: true
  }
}

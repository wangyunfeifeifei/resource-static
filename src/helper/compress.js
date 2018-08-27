const {createGzip, createDeflate} = require('zlib')

module.exports = (readStream, req, res) => {
  const acceptEncoding = req.acceptEncoding
  if (!acceptEncoding || !acceptEncoding.match(/\b(gzip|deflate)\b/)) {
    return readStream
  } else if (acceptEncoding.match(/\bgzip\b/)) {
    res.setHeader('Content-Type', 'gzip')
    return readStream.pipe(createGzip())
  } else if (acceptEncoding.match(/\bdeflate\b/)) {
    res.setHeader('Content-Type', 'gzip')
    return readStream.pipe(createDeflate())
  }
}

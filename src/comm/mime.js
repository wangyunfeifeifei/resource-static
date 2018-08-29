const path = require('path')
const fs = require('fs')

const mimeTypes = {
  'css': {
    content: 'text/css',
    icon: 'fa fa-css3'
  },
  'gif': {
    content: 'image/gif',
    icon: 'fa fa-gift'
  },
  'html': {
    content: 'text/html',
    icon: 'fa fa-html5'
  },
  'ico': {
    content: 'text/x-icon',
    icon: 'fa fa-font'
  },
  'jpeg': {
    content: 'image/jpeg',
    icon: 'fa fa-picture-o'
  },
  'jpg': {
    content: 'image/jpeg',
    icon: 'fa fa-picture-o'
  },
  'js': {
    content: 'text/javascript',
    icon: 'fa fa-code'
  },
  'json': {
    content: 'application/json',
    icon: 'fa fa-code'
  },
  'pdf': {
    content: 'application/pdf',
    icon: 'fa fa-pdf-o'
  },
  'png': {
    content: 'image/png',
    icon: 'fa fa-picture-o'
  },
  'svg': {
    content: 'image/svg+xml',
    icon: 'fa fa-picture-o'
  },
  'swf': {
    content: 'application/x-shockwave-flash',
    icon: 'fa fa-picture-o'
  },
  'tiff': {
    content: 'image/tiff',
    icon: 'fa fa-picture-o'
  },
  'txt': {
    content: 'text/plain',
    icon: 'fa fa-file-text'
  },
  'wav': {
    content: 'audio/x-wav',
    icon: 'fa fa-file-audio-o'
  },
  'wma': {
    content: 'audio/x-ms-wma',
    icon: 'fa fa-file-audio-o'
  },
  'wmv': {
    content: 'video/x-ms-wmv',
    icon: 'fa fa-video-camera'
  },
  'xml': {
    content: 'text/xml',
    icon: 'fa fa-code'
  }
}

module.exports = (filePath) => {
  if (fs.statSync(filePath).isDirectory()) {
    return {
      content: 'directory',
      icon: 'fa fa-folder-open-o'
    }
  }
  let ext = path.extname(filePath).split('.').pop().toLowerCase()

  if (!ext) {
    ext = filePath
  }
  return mimeTypes[ext] || mimeTypes['txt']
}

const path = require('path')

module.exports = {
  entry: {
    app: 'play/app.js',
    preview: 'play/preview.js'
  },
  dist: 'dist-play',
  port: 5000,

  webpack : {
    resolve: {
      alias: {
        'public': path.resolve(__dirname, './public'),
        'config': path.resolve(__dirname, './config'),
        'components': path.resolve(__dirname, './client/components'),
        'views': path.resolve(__dirname, './client/views'),
        'client' : path.resolve(__dirname, './client'),
      }
    },
  },
  // compile Vue template
  templateCompiler: true,
  hmrEntry: ['preview'],
  // no code split for 3rd party libraries
  vendor: false,
  html: [{
    chunks: ['app'],
    filename: 'index.html'
  }, {
    chunks: ['preview'],
    filename: 'preview.html'
  }]
}

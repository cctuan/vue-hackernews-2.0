

const theme1Transformer = function(title, description, rating){
  return [
    {
      flags: "text_no_trim",
      height: 350,
      width: 600,
      crop: "lfill"
    },
    {
      height: 20,
      overlay: "3d-golden-star_png_29_go1wlw",
      width: 30,
      x: 240,
      y: 150,
      crop: "fill"
    },
    {
      overlay: 'text:Verdana_30_bold:' + rating + '.0',
      x: 275,
      y: 150,
      color: '#FFFFFF'
    },
    {
      overlay: 'text:Verdana_20_bold:' + encodeURI(title),
      gravity: "west",
      x: 0,
      y: 100,
      color: '#FFFFFF'
    },
    {
      overlay: 'text:Verdana_20_bold:' + encodeURI(description),
      gravity: "west",
      x: 0,
      y: 130,
      color: '#FFFFFF'
    }
  ]
}

const cloudinaryUrl = 'http://res.cloudinary.com/beer/image/upload/';
const converterToBrowserUrl = function(transformList){
  return cloudinaryUrl + transformList.map(transform => {
    return Object.keys(transform).map(key => {
      let val = transform[key]
      switch(key) {
        case 'overlay': {
          if (val.indexOf('text:') === 0) {
            return 'l_' + val
          } else {
            return 'c_fill,l_' + val
          }
        }
        case 'flags': {
          return 'fl_' + val
        }
        case 'crop': {
          return 'c_' + val
        }
        case 'height': {
          return 'h_' + val
        }
        case 'width': {
          return 'w_' + val
        }
        case 'x': {
          return 'x_' + val
        }
        case 'y': {
          return 'y_' + val
        }
        case 'color': {
          return 'co_rgb:' + val.replace('#', '')
        }
        case 'gravity': {
          return 'g_' + val
        }
      }
    }).join(',')
  }).join('/')
}

module.exports = {
  theme1: function(imgPublicId, title, description, rating) {
    return converterToBrowserUrl(
      theme1Transformer(title, description, rating)) + '/' + imgPublicId
    // return theme1Transformer(title, description, rating)
  }
}

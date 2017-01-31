/**
http://res.cloudinary.com/beer/image/upload/
fl_text_no_trim,h_325,w_600,c_lfill/
c_fill,l_bg_template_1_fadng9/
h_20,c_fill,l_3d-golden-star_png_29_go1wlw,g_north_west,w_30,x_504,y_260,c_fill/
l_text:Roboto_18:5.0,g_north_west,x_540,y_266,co_rgb:FFFFFF/
l_text:Roboto_27_bold:gewfew,g_north_west,x_27,y_220,co_rgb:FFFFFF/
l_text:Roboto_21:fewfewf,g_north_west,x_27,y_266,co_rgb:FFFFFF/
j34wpae81xklnk2uyudc.png
**/
/**
http://res.cloudinary.com/beer/image/upload/fl_text_no_trim,h_325,w_600,c_lfill,c_limit,c_pad,b_white/c_fill,l_bg_template_1_fadng9/h_21,c_fill,l_3d-golden-star_png_29_go1wlw,g_north_west,w_21,x_504,y_260,c_fill/l_text:Roboto_18:4.0,x_540,y_266,g_north_west,co_rgb:FFFFFF/l_text:Roboto_27_bold:test,g_north_west,x_27,y_220,co_rgb:FFFFFF/l_text:Roboto_21:qqqq,g_north_west,x_27,y_266,co_rgb:FFFFFF/tksbcawadnxusefqsizl.png
**/
const basicSize = {
  height: 325,
  width: 600,
  crop: 'lfill'
}
const theme1Transformer = function(title, description, rating){
  return [
    {
      flags: "text_no_trim",
      height: basicSize.height,
      width: basicSize.width,
      crop: basicSize.crop,
      background: 'white'
    },
    {
      overlay: "bg_template_1_fadng9",
    },
    {
      height: 21,
      overlay: "3d-golden-star_png_29_go1wlw",
      gravity: "north_west",
      width: 21,
      x: 504,
      y: 260,
      crop: "fill"
    },
    {
      overlay: 'text:Roboto_18:' + rating + '.0',
      x: 540,
      y: 266,
      gravity: "north_west",
      color: '#FFFFFF'
    },
    {
      overlay: 'text:Roboto_27_bold:' + encodeURI(title),
      gravity: "north_west",
      x: 27,
      y: 220,
      color: '#FFFFFF',
      crop: 'crop',
      width: 250
    },
    {
      overlay: 'text:Roboto_21:' + encodeURI(description),
      gravity: "north_west",
      x: 27,
      y: 266,
      crop: 'fit',
      width: 470,
      color: '#FFFFFF'
    }
  ]
}

const theme2Transformer = function(title, description, rating){
  return [
    {
      flags: "text_no_trim",
      height: basicSize.height,
      width: basicSize.width,
      crop: basicSize.crop,
      background: 'white'
    },
    {
      overlay: "bg_template_1_fadng9",
    },
    {
      height: 21,
      overlay: "3d-golden-star_png_29_go1wlw",
      gravity: "north_west",
      width: 21,
      x: 504,
      y: 27,
      crop: "fill"
    },
    {
      overlay: 'text:Roboto_18:' + rating + '.0',
      x: 540,
      y: 32,
      gravity: "north_west",
      color: '#FFFFFF'
    },
    {
      overlay: 'text:Roboto_27_bold:' + encodeURI(title),
      gravity: "north_west",
      x: 255,
      y: 220,
      color: '#FFFFFF',
      crop: 'crop',
      width: 345
    },
    {
      overlay: 'text:Roboto_21:' + encodeURI(description),
      gravity: "north_west",
      x: 365,
      y: 266,
      color: '#FFFFFF',
      crop: 'fit',
      width: 235
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
        case 'background': {
          return 'b_' + val
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
  },
  theme2: function(imgPublicId, title, description, rating) {
    return converterToBrowserUrl(
      theme2Transformer(title, description, rating)) + '/' + imgPublicId
    // return theme1Transformer(title, description, rating)
  },
  basicSize: basicSize
}

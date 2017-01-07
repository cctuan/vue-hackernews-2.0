const CONSTANTS = require('config/constants')

const parseDrinkType = (post) => {
  let val = post['type']
  if (CONSTANTS.DRINK_TYPE[val]) {
    post['type'] = {
      val : val,
      map : CONSTANTS.DRINK_TYPE[val]
    }
  }
  return post
}

const parseColor = (meta) => {
  let val = meta['color']
  if (CONSTANTS.COLOR[val]){
    meta['color'] = {
      val : val,
      map : CONSTANTS.COLOR[val]
    }
  }
  return meta
}

const parseClarity = (meta) => {
  let val = meta['clarity']
  if (CONSTANTS.CLARITY[val]){
    meta['clarity'] = {
      val : val,
      map : CONSTANTS.CLARITY[val]
    }
  }
  return meta
}

const parseNoseType = (nose) => {
  let noseType = nose['type']
  if (noseType) {
    Object.keys(noseType).forEach(noseTypeKey => {
      if (CONSTANTS.ALL_TASTE_TYPE[noseTypeKey]) {
        noseType[noseTypeKey] = {
          val : noseTypeKey,
          map : CONSTANTS.ALL_TASTE_TYPE[noseTypeKey]
        }
      }
    })
    nose['type'] = noseType
  }
  return nose
}

const parseNoseStrong = (nose) => {
  let val = nose['strong']
  if (CONSTANTS.INTENSITY[val]) {
    nose['strong'] = {
      val : val,
      map : CONSTANTS.INTENSITY[val]
    }
  }
  return nose
}

const parseNose = (meta) => {
  let nose = meta['nose']
  if (nose) {
    Object.keys(nose).forEach(noseKey => {
      switch(noseKey) {
        case 'type' : {
          nose = parseNoseType(nose)
          break
        }
        case 'strong' : {
          nose = parseNoseStrong(nose)
          break
        }
      }
    })
  }
  return meta
}

const parseTasteAcid = (taste) => {
  let val = taste['acid']
  if (CONSTANTS.ACID[val]) {
    taste['acid'] = {
      val : val,
      map : CONSTANTS.ACID[val]
    }
  }
  return taste
}

const parseNoseWineBody = (taste) => {
  let val = taste['wine_body']
  if (CONSTANTS.WINE_BODY[val]) {
    taste['wine_body'] = {
      val : val,
      map : CONSTANTS.WINE_BODY[val]
    }
  }
  return taste
}

const parseNoseBeerBody = (taste) => {
  let val = taste['beer_body']
  if (CONSTANTS.BEER_BODY[val]) {
    taste['beer_body'] = {
      val : val,
      map : CONSTANTS.BEER_BODY[val]
    }
  }
  return taste
}

const parseNoseTannin = (taste) => {
  let val = taste['tannin']
  if (CONSTANTS.TANNIN[val]) {
    taste['tannin'] = {
      val : val,
      map : CONSTANTS.TANNIN[val]
    }
  }
  return taste
}

const parseNoseSweetness = (taste) => {
  let val = taste['sweetness']
  if (CONSTANTS.SWEETNESS[val]) {
    taste['sweetness'] = {
      val : val,
      map : CONSTANTS.SWEETNESS[val]
    }
  }
  return taste
}

// should use length_d
const parseNoseLength = (taste) => {
  let val = taste['length_d']
  if (CONSTANTS.LENGTH[val]) {
    taste['length_d'] = {
      val : val,
      map : CONSTANTS.LENGTH[val]
    }
  }
  return taste
}

const parseTaste = (meta) => {
  let taste = meta['taste']
  if (taste) {
    Object.keys(taste).forEach(tasteKey => {
      switch(tasteKey) {
        case 'acid' : {
          taste = parseTasteAcid(taste)
          break
        }
        case 'wine_body' : {
          taste = parseNoseWineBody(taste)
          break
        }
        case 'beer_body' : {
          taste = parseNoseBeerBody(taste)
          break
        }
        case 'tannin': {
          taste = parseNoseTannin(taste)
          break
        }
        case 'sweetness': {
          taste = parseNoseSweetness(taste)
          break
        }
        case 'length_d': {
          taste = parseNoseLength(taste)
          break
        }
        case 'type' : {
          taste = parseNoseType(taste)
          break
        }
      }
    })
  }
  return meta
}

const parseOtherMatury = (other) => {
  let val = other['matury']
  if (CONSTANTS.MATURE[val]) {
    other['matury'] = {
      val : val,
      map : CONSTANTS.MATURE[val]
    }
  }
  return other
}

const parseOther = (meta) => {
  let other = meta['other']
  if (other) {
    Object.keys(other).forEach(otherKey => {
      switch(otherKey) {
        case 'matury' : {
          other = parseOtherMatury(other)
          break
        }
      }
    })
  }
  return meta
}

const parseDrinkMeta = (post) => {
  let meta = post['meta']
  if (meta) {
    Object.keys(meta).forEach(metaKey => {
      switch(metaKey) {
        case 'color' : {
          meta = parseColor(meta)
          break;
        }
        case 'clarity' : {
          meta = parseClarity(meta)
          break;
        }
        case 'nose' : {
          meta = parseNose(meta)
          break;
        }
        case 'taste' : {
          meta = parseTaste(meta)
          break;
        }
        case 'other' : {
          meta = parseOther(meta)
          break;
        }
      }
    })
  }
  return post
}

const parsePost = (post) => {
  let _post = {}
  if (post && post.constructor && post.constructor.name === 'model') {
    _post = post.toObject()
  } else if (typeof post === 'object'){
    _post = post
  }
  if (post) {
    Object.keys(_post).forEach(topKey => {
      switch (topKey) {
        case 'type' : {
          _post = parseDrinkType(_post)
          break;
        }
        case 'meta' : {
          _post = parseDrinkMeta(_post)
          break
        }
      }
    })
  }
  return _post
}

module.exports = parsePost

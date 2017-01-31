
const cloudinary = require('cloudinary')
const fs = require('fs')
const config = require('../config/env')
const themeTransformer = require('../config/themeTransformer')
const THEME_CONFIG = require('../config/constants/THEME_CONFIG')


cloudinary.config({
  cloud_name: config.CLOUD_NAME,
  api_key: config.CLOUD_API_KEY,
  api_secret: config.CLOUD_API_SECRET,
})

const uploadTemplateType = (type, config) => {
//const uploadTemplateType1 = (originalUrl, imgPublicId, originalPublicId,
//  title, description, rating) => {
  return new Promise((resolve, reject) => {
    let transformUrl = ''
    switch (type) {
      case THEME_CONFIG.THEME2: {
        transformUrl = themeTransformer.theme2(config.imgPublicId, config.title,
          config.description, config.rating)
        break
      }
      case THEME_CONFIG.THEME1:
      default: {
        transformUrl = themeTransformer.theme2(config.imgPublicId, config.title,
          config.description, config.rating)
        break
      }
    }
    let uploadConfig = {}
    if (config.originalPublicId) {
      uploadConfig.public_id = config.originalPublicId
    }
    cloudinary.v2.uploader.upload(transformUrl, uploadConfig, (error, result) => {
      if (error) {
        console.error(error, 'error')
        reject(error)
        return
      }
      resolve(result)
    })
  })
}

const removeImage = (publicId) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.destroy(publicId,
      (err, result) => {
      if (err) {
        reject(err)
        return
      }
      resolve(result)
    })
  })
}

const updateTheme = (type, config) => {
  return uploadTemplateType(type, config)
}

const uploadImage = (file, options) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(file, themeTransformer.basicSize,
      (err, result) => {
      if (err) {
        reject(err)
        return
      }
      resolve(result)
    }, options)
  })
}


module.exports = {
  uploadImage: uploadImage,
  updateTheme: updateTheme,
  removeImage: removeImage
}

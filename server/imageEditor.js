
const cloudinary = require('cloudinary')
const fs = require('fs')
const config = require('../config/env')
const themeTransformer = require('../config/themeTransformer')


cloudinary.config({
  cloud_name: config.CLOUD_NAME,
  api_key: config.CLOUD_API_KEY,
  api_secret: config.CLOUD_API_SECRET,
})



const uploadTemplateType1 = (config) => {
//const uploadTemplateType1 = (originalUrl, imgPublicId, originalPublicId,
//  title, description, rating) => {
  return new Promise((resolve, reject) => {
    let transformUrl = themeTransformer.theme1(config.imgPublicId, config.title,
        config.description, config.rating)
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

const updateTheme = (type, config) => {
  switch (type) {
    case 1: {
      return uploadTemplateType1(config)
    }
  }
}

const uploadImage = (file, options) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file, (result) => {
      resolve(result)
    }, options)
  })
}


module.exports = {
  uploadImage: uploadImage,
  updateTheme: updateTheme
}

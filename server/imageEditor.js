
const cloudinary = require('cloudinary')
const fs = require('fs')
const config = require('../config/env')

cloudinary.config({
  cloud_name: config.CLOUD_NAME,
  api_key: config.CLOUD_API_KEY,
  api_secret: config.CLOUD_API_SECRET,
})

const uploadTemplateType1 = (url) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file, (result) => {
      resolve(result)
    }, options)
  })
}

const updateTheme = (url, type) => {
  switch (type) {
    case 1: {
      return uploadTemplateType1(url)
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

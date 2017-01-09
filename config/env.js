
module.exports = {
  PORT : process.env.PORT || '5000',

  MONGO_URL : process.env.MONGO_URL || 'mongodb://localhost:27017/1shot',

  // facebook
  FACEBOOK_CLIENT_ID : process.env.FACEBOOK_CLIENTID || '1794055487535064',
  FACEBOOK_SECRET : process.env.FACEBOOK_SECRET || '6675e6f6f33d9074421aed51402979ab',

  // cloudinary
  CLOUD_NAME: process.env.CLOUD_NAME || 'beer',
  CLOUD_API_KEY: process.env.CLOUD_API_KEY || '567238462875787',
  CLOUD_API_SECRET: process.env.CLOUD_API_SECRET || 'cJVOLKrziY_ZF6D2BkS-mALKLjI',
}

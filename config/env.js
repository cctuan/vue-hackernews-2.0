
module.exports = {
  ROOT_PATH : process.env.ROOT_PATH || 'http://localhost:8000',
  PORT : process.env.PORT || '8000',

  MONGO_URL : process.env.MONGO_URL || 'mongodb://localhost:27017/1shot',
  REDIS_URL : process.env.REDIS_URL || 'http://127.0.0.1:6379',

  // facebook
  FACEBOOK_CLIENT_ID : process.env.FACEBOOK_CLIENTID || '1794055487535064',
  FACEBOOK_SECRET : process.env.FACEBOOK_SECRET || '6675e6f6f33d9074421aed51402979ab',

  // cloudinary
  CLOUD_NAME: process.env.CLOUD_NAME || 'beer',
  CLOUD_API_KEY: process.env.CLOUD_API_KEY || '567238462875787',
  CLOUD_API_SECRET: process.env.CLOUD_API_SECRET || 'cJVOLKrziY_ZF6D2BkS-mALKLjI',
  CHANNEL_ACCESS_TOKEN : process.env.CHANNEL_ACCESS_TOKEN || 'ZkxIYFAFfehk0zngKumn1VXo/9Iti5aYlxvP7VnTfRxRF8mWTFklkgEzap5J9FqtZRVPMYPu1mrBz9KgZ2vudvywUsIRrahzeC5SOLXuOKPIbNL88vVjAKjdXJWMRE8yd903X4nZGHP4CSbl5AtLbQdB04t89/1O/w1cDnyilFU=',
  CHANNEL_SECRET: process.env.CHANNEL_SECRET || '6982a7bd80a6fec79aadf8cf44a06cc4' 
}

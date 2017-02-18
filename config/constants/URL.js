
const original = process.URL

const URL = {
  getPostUrl: (id) => `${original}${URL.POST}/view`,
  POST: '/post',
  MAIN: '/main',
}

module.exports = URL

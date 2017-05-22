const fs = require('fs')
const bluebird = require('bluebird')
const path = require('path')
const mongoose = require('mongoose')
const express = require('express')
const redis = require('redis')

const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
const session = require('express-session')
const mongoStore = require('connect-mongo')(session)
const uuidV4 = require('uuid/v4')
const { wrap: async } = require('co')

const LineBotSDK = require('line-bot-sdk-nodejs')
const favicon = require('serve-favicon')
const compression = require('compression')
const serialize = require('serialize-javascript')
const passport = require('passport')
const pkg = require('./../package.json')
const router = require('./routes')

const UserModel = require('./models/UserModel')

const {
  PORT,
  MONGO_URL,
  REDIS_URL,
  CHANNEL_SECRET,
  CHANNEL_ACCESS_TOKEN,
  ROOT_PATH
} = require('config/env')

const LINEConfig = {
  channelAccessToken: CHANNEL_ACCESS_TOKEN,
  channelSecret: CHANNEL_SECRET,
}

const LINEClient = new LineBotSDK.client(LINEConfig)

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

const resolve = file => path.resolve(__dirname, file)
const isProd = process.env.NODE_ENV === 'production'
const serverInfo =
  `express/${require('express/package.json').version} ` +
  `vue-server-renderer/${require('vue-server-renderer/package.json').version}`

const app = express()


const redisClient = redis.createClient({
  url: REDIS_URL
})
redisClient.on("error", function (err) {
    console.error("Error " + err);
})

redisClient.set("george", "iscoming");

require('./passport')(passport)

let indexHTML // generated by html-webpack-plugin
let renderer  // created from the webpack-generated server bundle
if (isProd) {
  // in production: create server renderer and index HTML from real fs
  renderer = createRenderer(fs.readFileSync(resolve('./../dist/server-bundle.js'), 'utf-8'))
  indexHTML = parseIndex(fs.readFileSync(resolve('./../dist/index.html'), 'utf-8'))
} else {
  // in development: setup the dev server with watch and hot-reload,
  // and update renderer / index HTML on file change.
  require('build/setup-dev-server')(app, {
    bundleUpdated: bundle => {
      renderer = createRenderer(bundle)
    },
    indexUpdated: index => {
      indexHTML = parseIndex(index)
    }
  })
}

function createRenderer (bundle) {
  // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
  return require('vue-server-renderer').createBundleRenderer(bundle, {
    cache: require('lru-cache')({
      max: 1000,
      maxAge: 1000 * 60 * 15
    })
  })
}

function parseIndex (template) {
  const scriptRegex = /<\!--script(.*)-->/g
  const linkRegex = /<\!--link(.*)-->/g
  const scriptContent = scriptRegex.exec(template)
  const linkContent = linkRegex.exec(template)
  return {
    script: scriptContent[1],
    link: linkContent[1]
  }
}

const serve = (path, cache) => express.static(resolve(path), {
  maxAge: cache && isProd ? 60 * 60 * 24 * 30 : 0
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CookieParser should be above session
app.use(cookieParser());
app.use(cookieSession({
  name: 'uid',
  keys: ['kk1', 'kk2'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: pkg.nam,
  store: new mongoStore({
    url: MONGO_URL,
    collection : 'sessions'
  })
}));

// use passport session
app.use(passport.initialize());
app.use(passport.session());
app.use(compression({ threshold: 0 }))
app.use(favicon('./public/favicon.ico'))
app.use('/service-worker.js', serve('../dist/service-worker.js'))
// app.use('/manifest.json', serve('../manifest.json'))
app.use('/dist', serve('../dist'))
app.use('/public', serve('../public'))

app.get('/auth/facebook', passport.authenticate('facebook'))
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  failureRedirect: '/login'
}), function(req, res) {
  res.redirect('/')
})

app.get('/auth/logout', (req, res) => {
  req.logout()
  res.json({})
})

app.get('/redirect', async(function *(req, res) {
  const secret = req.query.secret
  if (req.isAuthenticated()) {
    // need to bind userId to this account
    try {
      if (secret) {
        const userId = yield redisClient.getAsync(req.query.secret)
        if (!userId) {
          throw Error('cannot find userId')
        }
        redisClient.del(req.query.secret)
        const user = req.user
        if (user.line && user.line.userId === userId) {
          console.info('User already has line user Id')
        } else {
          user.line = {
            userId : userId
          }
          // console.log(user , 'user is ')
          // console.log(userId, 'userId')
          yield user.save()
        }
      } else {
        console.error('secret is not defined')
      }
      res.redirect('/');
    } catch (e) {
      console.error(e)
      res.redirect('/');
    }
  } else {
    try {
      if (req.query.secret){
        const userId = yield redisClient.getAsync(req.query.secret)
        if (!userId){
          throw Error('cannot find userId')
        }
        redisClient.del(req.query.secret)
        const newUser = new UserModel({
          line : {
            userId : userId
          }
        });
        let result = yield newUser.uploadAndSave()
        req.login(result, err => {
          if (err) {
            throw err
          }
          res.redirect('/');
        })
      }
    } catch(e){
      console.error(e)
      res.redirect('/');
    }
  }
}))

app.use('/api', router)

const LINE_LOGIN_MESSAGE = '登入' 
const REDIS_EXPIRE_TIME = 60 * 5

app.post('/webhook', (req, res) => {
  const isMessageValidated = LINEClient.requestValidator(
    // read the X-Line-Signature from headers
    req.headers['x-line-signature'], 
    JSON.stringify(req.body) // raw body from request
  )
  res.status(200).end('')
  if (!isMessageValidated){
    return
  }
  let receives = LINEClient.bodyParser(req.body);
  receives.forEach(function(receive) {
    switch (receive.type) {
      case LineBotSDK.EVENT_TYPES.MESSAGE: {
        switch (receive.message.type) {
          case LineBotSDK.CONTENT_TYPES.TEXT: {
            if (receive.message.text === LINE_LOGIN_MESSAGE) {
              const userId = receive.source.userId
              const hashId = uuidV4(userId + '' + Date.now(), 'UID')

              redisClient.set(hashId, userId, 'EX', REDIS_EXPIRE_TIME)
              LINEClient.to({userId : userId})
                .message(ROOT_PATH + '/redirect' + '?secret=' + hashId + '&openExternalBrowser=1')
                .send();
              return
            }
            break;
          }
        }
      }
    }
  })
});

app.get('*', (req, res) => {
  if (!renderer) {
    return res.end('waiting for compilation... refresh in a moment.')
  }
  res.setHeader("Content-Type", "text/html")
  res.setHeader("Server", serverInfo)

  var s = Date.now()

  let context = { url: req.url }
  if (req.user) {
    context.user = req.user
  }
  if (req.cookies.visited || req.user) {
    context.visited = true
  }
  const renderStream = renderer.renderToStream(context)

  renderStream.once('data', () => {
    const {
      title, htmlAttrs, bodyAttrs, link, style, script, noscript, meta
    } = context.meta.inject()
    res.write(`
      <!doctype html>
      <html data-vue-meta-server-rendered ${htmlAttrs.text()}>
        <head>
          ${meta.text()}
          ${title.text()}
          ${link.text()}
          ${style.text()}
          ${script.text()}
          ${noscript.text()}
          ${indexHTML.link}
        </head>
        <body ${bodyAttrs.text()}>
    `)
  })

  renderStream.on('data', chunk => {
    res.write(chunk)
  })

  renderStream.on('end', () => {
    // embed initial store state
    if (context.initialState) {
      res.write(
        `<script>window.__INITIAL_STATE__=${
          serialize(context.initialState, { isJSON: true })
        }</script>`
      )
    }
    res.end(`${indexHTML.script}`)
    console.log(`whole request: ${Date.now() - s}ms`)
  })

  renderStream.on('error', err => {
    if (err && err.code === '404') {
      res.status(404).end('404 | Page Not Found')
      return
    }
    // Render Error Page or Redirect
    res.status(500).end('Internal Error 500')
    console.error(`error during render : ${req.url}`)
    console.error(err)
  })
})

function connect () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  return mongoose.connect(MONGO_URL, options).connection;
}

connect()
  .on('error', console.log)
  .on('disconnected', connect)
  .once('open', () => {
    app.listen(PORT, () => {
      console.log(`server started at localhost:${PORT}`)
    })
  });

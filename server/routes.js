'use strict';

const express = require('express')
const mongoose = require('mongoose')
const multer  = require('multer')
/*
 * Module dependencies.
 */
const UserModel = require('./models/UserModel')
const PostModel = require('./models/PostModel')
const ImageEditor = require('./imageEditor')
const { wrap: async } = require('co')
const router = express.Router()

const fail = {
  failureRedirect: '/login'
};

const authCheck = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  } else {
    res.redirect('/');
  }
}

const upload = multer()

router.post('/upload/theme', authCheck, async(function *(req, res) {
  let response
  try {
    response = yield ImageEditor.updateTheme(req.body.url, req.body.type)
  } catch (e) {
    res.status(500).json({
      status: 500,
      result: e
    })
    return
  }
  res.status(200).json({
    status: 200,
    result: response
  })
}))

router.post('/image', authCheck, upload.any(), async(function *(req, res) {
  let response
  try {
    let prefix = 'data:image/png;base64,'
    response = yield ImageEditor.uploadImage(
      prefix + new Buffer(req.files[0].buffer).toString('base64')
    )
  } catch (e) {
    res.status(500).json({
      status: 500,
      result: e
    })
    return
  }
  res.status(200).json({
    status: 200,
    result: response
  })
}))

router.get('/post/:id', async(function *(req, res) {
  let post = {}
  try {
    post = yield PostModel.load(req.params.id)
    req.post = post
  } catch (e) {
    res.status(400).json({
      status: 400,
      result: e
    })
    return
  }
  res.status(200).json({
    status: 200,
    result: {
      post,
      isAuth: req.user ? post.author === req.user._id : false
    },
  })
}))

router.get('/posts', authCheck, async(function *(req, res) {
  const page = (req.query.page > 0 ? req.query.page : 1) - 1;
  const limit = 30
  const options = {
    limit: limit,
    page: page,
    criteria : {
      // testing
      'author' : req.user._id
    }
  }

  if (req.query.q) {
    options.criteria['name'] = new RegExp(req.query.q, 'i')
  }

  let posts = []
  let count = 0
  try {
    posts = yield PostModel.list(options)
    count = yield PostModel.count({
      'author' : req.user._id
    })

  } catch (e) {
    res.status(400).json({
      status: 400,
      result: e
    })
    return
  }

  res.status(200).json({
    status: 200,
    result: posts,
    count: count,
    options: options
  })
}))

router.post('/post/auth', authCheck, async(function *(req, res) {
  let isAuth = false
  let post = {}
  try {
    post = yield PostModel.load(req.body.postId)
    isAuth = post.author.toString() === (req.user ? req.user._id.toString() : '')
  } catch (e) {
    res.status(500).json({
      status: 500,
      result: e
    })
    return
  }
  res.status(200).json({
    status: 200,
    isAuth,
    post
  })
}))

router.post('/post', authCheck, async(function *(req, res) {
  let result = {}

  try {
    let post = new PostModel(req.body);
    post.author = req.user
    yield post.updateThumb()
    result = yield post.uploadAndSave()
  } catch (e) {
    res.status(500).json({
      status: 500,
      result: e
    })
    return
  }
  res.status(200).json({
    status: 200,
    result: result,
  })
}))

router.delete('/post/:id', authCheck, async(function *(req, res) {
  try {
    let post = {}
    post = yield PostModel.load(req.params.id)
    yield post.removeAllThumb()
    yield post.remove()
  } catch (e) {
    console.log(e)
    res.status(500).json({
      status: 500,
      result: e
    })
    return
  }

  res.status(200).json({
    status: 200
  })
  return
}))

router.post('/post/:id', authCheck, async(function *(req, res) {
  let result = {}
  try {
    let post = {}

    post = yield PostModel.load(req.params.id)

    if (post.author.toString() !== req.user._id.toString()) {
      res.redirect('/')
      return
    }
    yield post.update(req.body)
    yield post.updateThumb()
    result = yield post.save()
  } catch (e) {
    console.error(e)
    res.status(500).json({
      status: 500,
      result: e
    })
    return
  }

  res.status(200).json({
    status: 200,
    result: result,
  })
}))

module.exports = router

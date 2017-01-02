'use strict';

const express = require('express')
/*
 * Module dependencies.
 */
const UserModel = require('./models/UserModel')
const PostModel = require('./models/PostModel')
const { wrap: async } = require('co')
const router = express.Router()

const fail = {
  failureRedirect: '/login'
};

router.get('/post/:id', async(function *(req, res) {
  let article = {}
  try {
    article = yield PostModel.load(req.params.id)
  } catch (e) {
    res.status(400).json({
      status: 400,
      result: e
    })
    return
  }
  res.status(200).json({
    status: 200,
    result: article,
  })
}))

router.get('/posts', async(function *(req, res) {
  const page = (req.query.page > 0 ? req.query.page : 1) - 1;
  const limit = 30;
  const options = {
    limit: limit,
    page: page
  };
  let articles = []
  let count = 0
  try {
    articles = yield PostModel.list(options)
    count = yield PostModel.count()
  } catch (e) {
    res.status(400).json({
      status: 400,
      result: e
    })
    return
  }

  res.status(200).json({
    status: 200,
    result: articles,
    count: count,
    options: options
  })
}))


router.post('/post', async(function *(req, res) {
  const post = new PostModel(req.body);
  let result = {}
  try {
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

router.post('/post/:id', async(function *(req, res) {
  const post = new PostModel(req.body);
  // post.author = req.user
  try {
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

module.exports = router

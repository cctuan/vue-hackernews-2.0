'use strict';

const express = require('express')
const mongoose = require('mongoose')
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

const authCheck = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  } else {
    res.redirect('/');
  }
}

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
    result: post,
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
  try {
    const post = yield PostModel.load(req.body.postId)
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
    isAuth
  })
}))


router.post('/post', authCheck, async(function *(req, res) {
  let result = {}
  try {
    let post = new PostModel(req.body);
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

router.post('/post/:id', authCheck, async(function *(req, res) {
  let result = {}
  try {
    let post = {}
    if (req.post) {
      post = req.post
    } else {
      post = yield PostModel.load(req.params.id)
    }
    if (req.post.author !== req.query.user._id) {
      res.redirect('/')
      return
    }
    post = Object.assign(post, req.body)
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

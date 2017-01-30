
const mongoose = require('mongoose')
const imageEditor = require('../imageEditor')
const PostSchema = mongoose.Schema({
  type: {
    type: Number,
    required: true
  },
  // 酒款名稱
  name: String,
  // 短評
  description_s: String,
  rating : Number,

  thumb: {
    current:  mongoose.Schema.Types.Mixed,
    original:  mongoose.Schema.Types.Mixed,
    theme: {
      type: mongoose.Schema.Types.Mixed
    }
  },
  // taste, appearance, nose, other
  meta: {
    color : Number,
    clarity : Number,
    nose : {
      type: mongoose.Schema.Types.Mixed,
      strong: Number,
    },
    taste : {
      body : Number,
      danie : Number,
      sweet : Number,
      acid : Number,
      type : mongoose.Schema.Types.Mixed,
    },
    other : {
      maturity : Number,
      price : Number,
      year: Number,
      description: String,
    }
  },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
},{
    timestamps: true
})

PostSchema.methods = {
  uploadAndSave: function () {
    console.log(this, 'PostSchema')
    const err = this.validateSync();
    console.log(err, 'err')
    if (err && err.toString()) {
      throw new Error(err.toString());
    }

    console.log(this, 'data')
    if (this.thumb.theme && this.thumb.theme.type) {
      //  originalUrl, imgPublicId, originalPublicId,
      //  title, description, rating
      let config = {
        originalUrl : this.thumb.current.url,
        imgPublicId : this.thumb.current.public_id,
        title: this.name,
        description: this.description_s,
        rating: this.rating
      }
      if (this.thumb.current.public_id !== this.thumb.original.public_id) {
        config.originalPublicId = this.thumb.current.public_id
      }
      return imageEditor.updateTheme(this.thumb.theme.type, config).then(themeObject => {
        if (themeObject.secure_url) {
          this.thumb.current = themeObject
          return this.save()
        } else {
          return this.save()
        }
      }).catch(e => {
        console.log(e)
        return this.save()
      })
    } else {
      console.log('_____THEME TYPE IS NULL_____')
      return this.save()
    }

    /*
    if (images && !images.length) return this.save();
    const imager = new Imager(imagerConfig, 'S3');

    imager.upload(images, function (err, cdnUri, files) {
      if (err) return cb(err);
      if (files.length) {
        self.image = { cdnUri : cdnUri, files : files };
      }
      self.save(cb);
    }, 'article');
    */
  },
}

PostSchema.statics = {

  /**
   * Find post by id
   *
   * @param {ObjectId} id
   * @api private
   */

  load: function (_id) {
    return this.findOne({ _id })
      .maxTime(1000)
      .exec()
  },

  /**
   * List posts
   *
   * @param {Object} options
   * @api private
   */

  list: function (options) {
    const criteria = options.criteria || {};
    const page = options.page || 0;
    const limit = options.limit || 30;
    return this.find(criteria)
      .populate('user', 'name username')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(limit * page)
      .exec();
  }
};

module.exports = mongoose.model('Post', PostSchema);

import mongoose from 'mongoose';

const {
  String,
  Date,
  Boolean,
  ObjectId,
  Number,
} = mongoose.Schema.Types;

const PostSchema = new mongoose.Schema({
  title: String,
  author: ObjectId,
  previewText: String,
  body: String,
  category: String,
  publishing_date: Date,
  published: Boolean,
  attachedGallery: ObjectId,
  likes: Number,
  heroImage: ObjectId,
});

// add the model to the global context to ensure singleton
global.PostModel = global.PostModel || mongoose.model('Post', PostSchema);
module.exports = global.PostModel;

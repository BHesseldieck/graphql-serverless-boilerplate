import mongoose from 'mongoose';

const {
  String,
  Date,
  Boolean,
  ObjectId,
} = mongoose.Schema.Types;

const GallerySchema = new mongoose.Schema({
  title: String,
  author: ObjectId,
  category: String,
  description: String,
  publishing_date: Date,
  published: Boolean,
  attachedOnly: Boolean,
  images: [ObjectId],
});

// add the model to the global context to ensure singleton
global.GalleryModel = global.GalleryModel || mongoose.model('Gallery', GallerySchema);
module.exports = global.GalleryModel;

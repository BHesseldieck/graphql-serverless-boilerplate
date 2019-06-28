import mongoose from 'mongoose';

const {
  String,
  Boolean,
  ObjectId,
} = mongoose.Schema.Types;

const ImageSchema = new mongoose.Schema({
  title: String,
  uri: String,
  published: Boolean,
  resolution: String,
  taggedUsers: [ObjectId],
  galleryId: ObjectId,
});

// add the model to the global context to ensure singleton
global.ImageModel = global.ImageModel || mongoose.model('Image', ImageSchema);
module.exports = global.ImageModel;

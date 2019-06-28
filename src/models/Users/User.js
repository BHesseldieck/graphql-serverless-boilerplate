import mongoose from 'mongoose';

const {
  String,
  ObjectId,
} = mongoose.Schema.Types;

const UserSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  title: String,
  email: String,
  phone: String,
  articles: [ObjectId],
  image: ObjectId,
});

// add the model to the global context to ensure singleton
global.UserModel = global.UserModel || mongoose.model('User', UserSchema);
module.exports = global.UserModel;

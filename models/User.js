import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    maxlength: 20,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

const User = mongoose.model('users', UserSchema);

export default User;
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const GigSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    maxlength: 300
  },
  tools: [
    { name: {
      type: String
    }}
  ],
  likes: {
    count: {
      type: Number,
      default: 0,
    },
    people: [
      { uid: {
          type: Schema.Types.ObjectId,
          ref: 'users'
      }}
    ]
  },
  views: {
    count: {
      type: Number,
      default: 0,
    },
    people: [
      { user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }}
    ]
  }
})

const Gig = mongoose.model('gigs', GigSchema);

export default Gig;
/* eslint-disable no-undef */
import User from '../../../models/User';

export default {
  Query: {
    user: (root, args) => {
      return new Promise((resolve, reject) => {
        User.findById(args)
          .exec((err, res) => {
            err ? reject(err) : resolve(res);
          });
      })
    },
    users: () => {
      return new Promise((resolve, reject) => {
        User.find({})
          .exec((err, res) => {
            err ? reject(err) : resolve(res);
          });
      })
    }
  },
  Mutation: {
    addUser: (root, { username, email }) => {
      const newUser = new User({ username, email });
      console.log(newUser);
      return new Promise((resolve, reject) => {
        newUser.save((err, res) => {
          err ? reject(err) : resolve(res)
        });
      });
    },
    editUser: (root, { _id, username, email }) => {
      console.log(username);
      console.log(email);
      const updateFields = {};
      if (username) updateFields.username = username;
      if (email) updateFields.email = email;
      return new Promise((resolve, reject) => {
        User.findByIdAndUpdate(
          { _id }, 
          { $set: updateFields },
          { new: true })
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          })
          // .exec((err, res) => {
          //   console.log(res);
          //   err ? reject(err) : resolve(res);
          // });
      });
    },
    deleteUser: (root, arg) => {
      return new Promise((resolve, reject) => {
        User.findByIdAndRemove(arg)
          .exec((err, res) => {
            err ? reject(err) : resolve(res);
          });
      });
    }
  }
};
/* eslint-disable no-undef */
import Gig from '../../../models/Gig';

export default {
  Query: {
    gig: (root, args) => {
      return new Promise((resolve, reject) => {
        Gig.findById(args)
          .populate('owner', ['username','_id'])
          .then(res => {
            return resolve(res);
          })
          .catch(err => reject(err));
      })
    },
    gigs: () => {
      return new Promise((resolve, reject) => {
        Gig.find({})
          .populate('owner', ['username','_id'])
          .then(res => {
            return resolve(res);
          })
          .catch(err => reject(err));
      })
    }
  },
  Mutation: {
    createGig: (root, { owner, title, desc, tools }) => {
      const toolsList = tools.map(t => ({ name:t}));
      const newGig = new Gig({ owner, title, desc });
      newGig.tools = toolsList;
      return new Promise((resolve, reject) => {
        newGig.save()
          .then(res => {
            res.populate('owner', ['username','_id'])
            resolve(res)
          })
          .catch(err => reject(err));
      });
    },
    editGig: (root, { _id, title, desc, tools }) => {
      const updateFields = {};
      if (title) updateFields.title = title;
      if (desc) updateFields.desc = desc;
      const toolsList = tools.map(t => ({ name:t }));
      if (tools) updateFields.tools = toolsList ;
      return new Promise((resolve, reject) => {
        Gig.findByIdAndUpdate(
          { _id }, 
          { $set: updateFields },
          { new: true })
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          })
      });
    },
    deleteGig: (root, {_id, uid }) => {
      return new Promise((resolve, reject) => {
        Gig.findById({_id})
          .then(gig => {
            if ( gig.owner._id !== uid) {
              console.log("You are not gig owner")
            } else {
              gig.remove();
              resolve(gig)
            }
          })
          .catch(err => reject(err))
      });
    },
    likesGig: (root, {_id, uid}) => {
      return new Promise((resolve, reject) => {
        Gig.findById({_id})
          .then(gig => {
            const likers = gig.likes.people;
            let index = likers.map(l => l.uid).indexOf(uid);
            if (index < 0) {
              const newLike = { uid: uid };
              likers.unshift(newLike)
              gig.likes.people = likers;
              gig.likes.count += 1;
            } else {
              likers.splice(index, 1);
              gig.likes.people = likers;
              gig.likes.count -= 1;
            }
            gig.save()
              .then(g => resolve(gig))
              .catch(e => reject(e));
          })
          .catch(err => reject(err));
      })
    }
  }
};
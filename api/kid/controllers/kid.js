'use strict';
var distance = require('euclidean-distance')


module.exports = {

  recommendBooks: async ctx => {
       const { kidId } = ctx.params
       const kid = await strapi.services.kid.findOne({ kidId });
       const profile = kid.profile
       const books = strapi.query.book
       const b = books[0]
       const bookProfile = b.profile.profile
      // let dists = {}
       //books.forEach((book) => {
      //  dists[book._id] = distance(profile, book.profile)
     //  })
     console.log(profile)
      let d = distance(profile.profile, bookProfile)
       ctx.send({"data": d})
   },

// newFriend: async ctx => {
//     const { kidId } = ctx.params
//     const newFriend = ctx.request.body
//     const kid = await strapi.services.kid.findOne({ kidId });
//     const friends = kid.friendList
//     friends['']
//     ctx.send(friends)
// }


};

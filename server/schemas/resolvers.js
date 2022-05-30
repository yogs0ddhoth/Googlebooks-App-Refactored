const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
// const { isValidObjectId } = require('mongoose');
const resolvers = {
  Query: {
    me: async (parent, args, context) =>{ 
      return await User.findOne( // get a single user by either their id or their username
        { $or: [{ _id: context._id}, { username: context.username }] }
      ).populate('savedBooks');
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      // create a user, sign a token
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },
    loginUser: async (parent,  { email, password }) => {
       // login a user, sign a token
      const user = await User.findOne({ email: email });
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);

      return { token, user };
    },
    saveBook: async (parent, { book }, context) => {
      return await User.findOneAndUpdate( // save a book to a user's `savedBooks` field
        { _id: context._id }, 
        { $addToSet: { savedBooks: book } }, 
        { 
          new: true, 
          runValidators: true 
        }
      );
    },
    removeBook: async (parents, args, context) => {
      return await User.findOneAndUpdate( // remove a book from `savedBooks`
        { _id: context._id }, 
        { $pull: { savedBooks: { bookId: args.bookId } } }, 
        { 
          new: true, 
          runValidators: true 
        }
      );
    },
  }
}

module.exports = resolvers;
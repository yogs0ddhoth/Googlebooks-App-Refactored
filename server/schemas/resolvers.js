const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { isValidObjectId } = require('mongoose');
const resolvers = {
  Query: {
    me: async (parent, args, context) =>{
      console.log('Query-Test Context:', context);
      return User.findOne(
        { $or: [{ _id: context._id}, { username: context.username }] }
      ).populate('savedBooks');
    }
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },
    loginUser: async (parent,  { email, password }) => {
      
      const user = await User.findOne( { email: email } );
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
      console.log('args:', book);
      console.log('context:', context);
      const updatedUser = await User.findOneAndUpdate(
        { _id: context._id },
        { $addToSet: { savedBooks: book } },
        { new: true, runValidators: true }
      );
      
      console.log('Updated User:', updatedUser);

      return updatedUser;
    },

    removeBook: async (parents, args, context) => {
      console.log('args:', args);
      // console.log('context:', context);

      const updatedUser = await User.findOneAndUpdate(
        { _id: context._id },
        // { username: 'asdf' }, 
        { $pull: { savedBooks: { bookId: args.bookId } } },
        { new: true, 
          runValidators: true 
        }
      );
      
      console.log('Updated User:', updatedUser);

      return updatedUser;
    }
  }
}

module.exports = resolvers;
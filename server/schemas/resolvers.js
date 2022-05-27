const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const resolvers = {
  Query: {
    me: async (parent, args, context) =>{
      console.log('Query-Test Context:', context);
      return User.findOne(
        { $or: [{ _id: _id}, { username: username }] }
      ).populate('books');
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
    // saveBook: async (parent, ())
  }
}

module.exports = resolvers;
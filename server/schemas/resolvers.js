const { User } = require('../models');
const { signToken } = require('../utils/auth')
export const resolvers = {
  Query: {
    me: async (parent, ) =>{
      return User.findOne(
        {}
      )
    }
  }
}
const { AuthenticationError } = require('apollo-server-express');
const { User, PlayerStats } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      me: async (parent, args, context) => {
        if (context.user) {
          const userData = await User.findOne({ _id: context.user._id })
            .select('-__v -password')
  
          return userData;
        }
  
        throw new AuthenticationError('Not logged in');
      },
      stats: async (parent, args, context) => {
        if (context.user) {
          const userData = await User.findOne({ _id: context.user._id })
            .select('-__v -password')
  
          return userData.savedStats;
        }
  
        throw new AuthenticationError('Not logged in');
      },
    },
    Mutation: {
      addUser: async (parent, args) => {
        const user = await User.create(args);
        const token = signToken(user);
  
        return { token, user };
      },
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
  
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
      addStats: async (parent, args, context) => {

        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            // { ...args, username: context.user.username },
            { _id: context.user._id },
            { $addToSet: { savedStats: {...args, location: args.courtLocation} } },
            { new: true, runValidators: true }
          );
            console.log(args, updatedUser);
          return updatedUser;
        }
  
        throw new AuthenticationError('You need to be logged in!');
      },
      removeRecord: async (parent, args, context) => {
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: user._id },
            { $pull: { savedStats: { statsId: args._id} } },
            { new: true }
          );
  
          return updatedUser;
        }
  
        throw new AuthenticationError('You need to be logged in!');
      },
    }
};

module.exports = resolvers;
  
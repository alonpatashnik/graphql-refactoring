const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      me: async (parent, args, context) => {
        return User.findOne({_id: context.user._id})
      }
    },
    Mutation: {
      login: async (parent, args) => {
        const user = await User.findOne({ $or: [{ username: args.username }, { email: args.email }] });
        if (!user) {
        return res.status(400).json({ message: "Can't find this user" });
        }

        const correctPw = await user.isCorrectPassword(args.password);

        if (!correctPw) {
        return res.status(400).json({ message: 'Wrong password!' });
        }
        const token = signToken(user);
        return { token, user };
      },

      addUser: async (parent, args) => {
        const user = await User.create(args);
        if (!user) {
        return res.status(400).json({ message: 'Something is wrong!' });
        }
        const token = signToken(user);
        return { token, user };
      },

      saveBook: async (parent, args, context) => {
        try {
            const updatedUser = await User.findOneAndUpdate(
              { _id: context.user._id },
              { $addToSet: { savedBooks: args.body } },
              { new: true, runValidators: true }
            );
            return updatedUser;
          } catch (err) {
            console.log(err);
            return err;
          }
      },

      removeBook: async (parent, args, context) => {
        const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { savedBooks: { bookId: args.params.bookId } } },
            { new: true }
          );
          if (!updatedUser) {
            return res.status(404).json({ message: "Couldn't find user with this id!" });
          }
          return updatedUser;
      }

    },
  };

module.exports = resolvers;
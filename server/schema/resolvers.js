const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      me: async (parent, { _id }) => {
        return User.findOne({_id: _id})
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
        res.json({ token, user });
      },

      addUser: async (parent, args) => {
        const user = await User.create(args);
        if (!user) {
        return res.status(400).json({ message: 'Something is wrong!' });
        }
        const token = signToken(user);
        res.json({ token, user });
      },

      saveBook: async (parent, args) => {
        try {
            const updatedUser = await User.findOneAndUpdate(
              { _id: args.user._id },
              { $addToSet: { savedBooks: args.body } },
              { new: true, runValidators: true }
            );
            return res.json(updatedUser);
          } catch (err) {
            console.log(err);
            return res.status(400).json(err);
          }
      },

      removeBook: async (parent, args) => {
        const updatedUser = await User.findOneAndUpdate(
            { _id: args.user._id },
            { $pull: { savedBooks: { bookId: args.params.bookId } } },
            { new: true }
          );
          if (!updatedUser) {
            return res.status(404).json({ message: "Couldn't find user with this id!" });
          }
          return res.json(updatedUser);
      }

    },
  };

module.exports = resolvers;
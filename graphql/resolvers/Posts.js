const Post = require('../../models/post');
const User = require('../../models/user');

const { transformPost } = require('./merge');

module.exports = {
  posts: async () => {
    try {
      const posts = await Post.find();
      return posts.map(Post => {
        return transformPost(Post);
      });
    } catch (err) {
      throw err;
    }
  },
  createPost: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    const Post = new Post({
      title: args.PostInput.title,
      description: args.PostInput.description,
      price: +args.PostInput.price,
      date: new Date(args.PostInput.date),
      creator: req.userId
    });
    let createdPost;
    try {
      const result = await Post.save();
      createdPost = transformPost(result);
      const creator = await User.findById(req.userId);

      if (!creator) {
        throw new Error('User not found.');
      }
      creator.createdposts.push(Post);
      await creator.save();

      return createdPost;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};

const Post = require('../../models/post');
const User = require('../../models/user');
const { dateToString } = require('../../helpers/date');

const Posts = async PostIds => {
  try {
    const Posts = await Post.find({ _id: { $in: PostIds } });
    return Posts.map(Post => {
      return transformPost(Post);
    });
  } catch (err) {
    throw err;
  }
};

const singlePost = async PostId => {
  try {
    const Post = await Post.findById(PostId);
    return transformPost(Post);
  } catch (err) {
    throw err;
  }
};

const user = async userId => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
      createdPosts: Posts.bind(this, user._doc.createdPosts)
    };
  } catch (err) {
    throw err;
  }
};

const transformPost = Post => {
  return {
    ...Post._doc,
    _id: Post.id,
    date: dateToString(Post._doc.date),
    creator: user.bind(this, Post.creator)
  };
};

exports.transformPost = transformPost;

// exports.user = user;


const authResolver = require('./auth');
const postsResolver = require('./Posts');

const rootResolver = {
  ...authResolver,
  ...postsResolver
};

module.exports = rootResolver;

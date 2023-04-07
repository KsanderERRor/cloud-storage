const OAuth = require('../../data-base/OAuth');

module.exports = {
  createOauthPair: (tokenData) => OAuth.create(tokenData)
};

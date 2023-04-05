const OAuth = require('../../data-base/OAuth');


module.exports = {

  
  createOauthPair: (tokenData) => {
    return OAuth.create(tokenData);
  }
};

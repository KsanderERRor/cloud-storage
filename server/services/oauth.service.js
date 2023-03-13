const bcrypt = require('bcrypt');

module.exports = {
    hashPassword: (password) => bcrypt.hash(password, 15)
};
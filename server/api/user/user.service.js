const User = require('../../dataBase/user')
const bcrypt = require('../../services/oauth.service')


module.exports = {
    findByParams: (SearchParams) => {
        return User.findOne(SearchParams)
    },

    createdUser: async (userObject) => {
        const hashPassword = await bcrypt.hashPassword(userObject.password)
        return User.create({ ...userObject, password: hashPassword })
    }

}
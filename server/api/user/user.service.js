const User = require('../../dataBase/user')
const { hashPassword } = require('../../services/oauth.service')


module.exports = {
    findByParams: (SearchParams) => {
        return User.findOne(SearchParams)
    },

    createdUser: async (userObject) => {
        const hashPassword = await hashPassword(userObject.password)
        return User.create({ ...userObject, password: hashPassword })
    }

}
const User = require('../../dataBase/user')
const bcrypt = require('../../services/oauth.service')


module.exports = {
    findByEmail: async (email) => {
        const user =  await User.findOne({email})

        return  user;
    },

    createdUser: async (userObject) => {
        const hashPassword = await bcrypt.hashPassword(userObject.password)
        return User.create({ ...userObject, password: hashPassword })
    }

}
const userService = require("./user.service")


module.exports = {

    createUser: async (req, res) => {
        try {
            await userService.createdUser()

            res.status(201).json()
        } catch (e) {
           
        }
    }

}
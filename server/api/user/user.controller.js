const userService = require("./user.service")


module.exports = {

    createUser: async (req, res) => {
        try {
             const createdUser = await userService.createdUser(req.body)
             
             console.log(createdUser)
            res.status(201).json(createdUser);
        } catch (e) {
           console.log(e);
        }
    }

}
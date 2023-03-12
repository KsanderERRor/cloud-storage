const userService = require('./user.service')


module.exports = {
    checkUserDyplicates: async (req, res, next) => {
        try {
              const user = await userService.findByParams(req.body.email)

              if(user){
                res.status(400).json({message:`User with  email ${email} already exists`})
              } 

              next()
        } catch (e) {
            throw new Error (e)
        }
    }
}
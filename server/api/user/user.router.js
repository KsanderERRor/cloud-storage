const userRouter = require('express').Router()


const mdlw = require('./user.middleware')
const userController = require('./user.controller')


userRouter.post('/registration', mdlw.userValidator, mdlw.checkUserDyplicates, userController.createUser)

module.exports = userRouter;
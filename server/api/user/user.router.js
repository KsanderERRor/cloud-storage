const userRouter = require("express").Router();

const mdlw = require("./user.middleware");
const commonMdlw = require("../../commonMiddleware/common.middleware")
const userController = require("./user.controller");


userRouter.get("/", userController.getAllUsersPagination)


userRouter.post("/registration", mdlw.userValidator, mdlw.checkUserDyplicates, userController.createUser );


userRouter.use("/:userId", commonMdlw.checkUser, commonMdlw.userIsNotDeleted) // use for
userRouter.delete("/:userId", userController.deleteUser);
userRouter.get("/:userId", userController.getOneUserByID) //2 req in datebase ):
userRouter.put("/:userId", userController.updateOneUserByID)
module.exports = userRouter;

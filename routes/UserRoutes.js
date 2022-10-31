const express = require('express')
const userRouter = express.Router()
const {createUser, allUsers,getUser, editUser, deleteUser} = require('../controllers/UserController')
const { authenticate, authorizePeopleManagement} = require('../middleware/authenticate')


userRouter.post('/' ,authenticate,authorizePeopleManagement,createUser)

userRouter.get('/', authenticate,allUsers)

userRouter.get('/:id', authenticate, getUser)

userRouter.put('/:id', authenticate, editUser)
userRouter.delete('/delete/:id', authenticate, authorizePeopleManagement,deleteUser)



module.exports = userRouter
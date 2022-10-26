const express = require('express')
const userRouter = express.Router()
const {createUser, allUsers,getUser, editUser} = require('../controllers/UserController')
const { authenticate, authorizePeopleManagement} = require('../middleware/authenticate')


userRouter.post('/' ,authenticate,authorizePeopleManagement,createUser)

userRouter.get('/', authenticate,allUsers)

userRouter.get('/:id', authenticate, getUser)

userRouter.put('/:id', authenticate, editUser)



module.exports = userRouter
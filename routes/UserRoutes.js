const express = require('express')
const userRouter = express.Router()
const {createUser, allUsers,getUser, editUser} = require('../controllers/UserController')


userRouter.post('/' ,createUser)

userRouter.get('/',allUsers)

userRouter.get('/:id', getUser)

userRouter.put('/:id', editUser)



module.exports = userRouter
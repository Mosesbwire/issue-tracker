const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')

const authenticate = async (req,res,next)=>{
    const token = req.header('x-auth-token')

    if(!token){
        return res.status(401).json({msg: 'Invalid token, authorization denied'})
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtsecret'))
        req.user = decoded.user
        next()
    } catch (err) {
        console.error(err.message)
        res.status(401).json({msg: 'Invalid token'})
    }
    
}

// allows only managers to create delete modify certain details of a user account
const authorizePeopleManagement = async (req,res,next)=> {
    try {
        const user = await User.findById(req.user.id)
        if(!user){
            return res.status(400).json({msg: 'User not found'})
        }

        if(user.role !== 'Manager'){
            return res.status(401).json({msg: 'Authorization denied.Access to this resource has been denied'})
        }

        next()
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
}

module.exports = {
    authenticate,
    authorizePeopleManagement
}


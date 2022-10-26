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
        res.status(401).json({msg: 'Invalid token'})
    }
    
}

module.exports = {
    authenticate
}


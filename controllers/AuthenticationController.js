const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('config')
const User = require('../models/User')
const {  sendLoginLink } = require('../models/Mailer')

const ROUNDS = 10


const loginViaLink = [
    check('password', 'Password can not be empty').not().isEmpty(),
    check('password', 'Password is too short').isLength({min:6}),

    async(req,res)=>{
        const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({errors: errors.array()})
            }
            //  first time login user is required to change password immediatly when link is sent
        const { password } = req.body 
        try {
           
            const user = await User.findById(req.params.id)
            const decrypt = jwt.verify(req.params.token, user.password)

            const salt = await bcrypt.genSalt(ROUNDS)
            user.password = await bcrypt.hash(password, salt)

            await user.save({timestamps: {createdAt: false, updatedAt: true}})
            const  payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(
                payload,
                config.get('jwtsecret'),
                {expiresIn: 36000},
                (err,token)=>{
                    if(err) throw err
                    res.json(token)
                }
            )
           
        } catch (err) {
            console.error(err.message)
            if(err.message === 'invalid signature'){
                return res.status(400).json({msg: 'Token is expired or has already been used. Request new password reset link from your Admin'})
            }
            res.status(500).send('server error')
        }
       

    }
]

const login = [
    check('email', 'Valid email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),

    async(req,res)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const {email, password} = req.body
        try {
            const user = await User.findOne({email})
            if(!user){
                return res.status(400).json({errors: [{msg: 'Inavlid credentials'}]})
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if(!isMatch){
                return res.status(400).json({errors: [{msg: 'Inavlid credentials'}]})
            }

            const  payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(
                payload,
                config.get('jwtsecret'),
                {expiresIn: 36000},
                (err,token)=>{
                    if(err) throw err
                    res.json({token})
                }
            )
        } catch (err) {
            console.error(err.message)
            res.status(500).send('Server error')
        }
    }
]

const isAuthenticated = async (req,res)=>{
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
        
    }
}

const resetPassword = [
    check('email', 'Email is required').isEmail(),

    async(req,res)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.json({errors: errors.array()})
        }
        const {email} = req.body
        try {
            const user = await User.findOne({email})
            if(!user){
                return res.status(400).json({errors: [{msg: 'User does not exist'}]})
            }

            const payload = {
                user: {
                    id: user.id
                }
            }
            
            jwt.sign(
                payload,
                user.password,
                {expiresIn: 3600},
                (err,token)=>{
                    if(err) throw err
                    sendLoginLink(token,user.id, user.email, user.firstname)
                    res.json('Ok')
                }
            )
        } catch (err) {
            console.error(err.message)
            
            res.status(500).send('server error')
        }
        
    }
]

module.exports = {
    loginViaLink,
    login,
    isAuthenticated,
    resetPassword
}
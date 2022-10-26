const User = require('../models/User')
const {sendFirstTimeLoginLink} = require('../models/Mailer')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {v4 : uuidv4 } = require('uuid')
const { check, validationResult } = require('express-validator')

const ROUNDS = 10

const createUser = [
    check('firstname', 'First name is required').not().isEmpty(),
    check('lastname', 'Last name is required').not().isEmpty(),
    check('role', 'Role is required').not().isEmpty(),
    check('email', 'Enter valid email').isEmail(),

    async (req,res)=>{
        const errors = validationResult(req)

        if(!errors.isEmpty){
            return res.status(400).json({errors: errors.array()})
        }

        const {firstname, lastname, email, role} = req.body

        try {
            let user = await User.findOne({email})
            if(user){
                return  res.status(400).json({error: [{msg: 'User already exists'}]})
            }

            const generatedPassword = uuidv4()
            const salt = await bcrypt.genSalt(ROUNDS)
           
            user = new User({
                firstname,
                lastname,
                email,
                role,
                password: await bcrypt.hash(generatedPassword, salt)
            })
        
            await user.save()

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
                    sendFirstTimeLoginLink(token,user.id, user.email, user.firstname)
                    res.json({token})
                }
            )

        } catch (err) {
            console.error(err.message)
            res.status(500).send('Server error')
        }
    }
      
]

const allUsers = async (req,res)=> {
    try {
        const users = await User.find({}).select('-password')
        res.json(users)
        
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
}

const getUser = async (req,res)=>{
    try {
        const user = await User.findById(req.params.id).select('-password')
        if(!user){
            return res.status(400).json({msg: 'User not found'})
        }
        res.json(user)
    } catch (err) {
        console.error(err.message)
        if(err.kind === 'ObjectId'){
            return res.status(400).json({msg: 'User not found'})
        }
        res.status(500).send('Server error')
    }
}

const editUser = [
    check('firstname', 'First name is required').not().isEmpty(),
    check('lastname', 'Last name is required').not().isEmpty(),
    check('email', 'Enter valid email').isEmail(),

    async (req,res)=> {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        const { firstname, lastname, email} = req.body
        try {
            const user = await User.findById(req.params.id)

            if(!user){
                return res.status(400).json({msg: 'User not found'})
            }

            user.firstname = firstname || user.firstname
            user.lastname = lastname || user.lastname
            user.email = email || user.email

            await user.save()

            res.json(user)
        } catch (err) {
            console.error(err.message)
            if(err.kind === 'ObjectId'){
                return res.status(400).json({msg: 'User not found'})
            }
            res.status(500).send('Server error')
            
        }
    }
]

// add delete user --- delete user and remove user ref from projects and issues that are active

//  add change role functionality





module.exports = {
    createUser,
    allUsers,
    getUser,
    editUser
}


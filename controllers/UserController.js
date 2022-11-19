const User = require('../models/User')
const Project = require('../models/Project')
const Issue = require('../models/Issue')
const mongoose = require('mongoose')
const {sendLoginLink} = require('../models/Mailer')
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
                return  res.status(400).json({errors: [{msg: 'User already exists'}]})
            }

            const generatedPassword = uuidv4()
            const salt = await bcrypt.genSalt(ROUNDS)
           
            user = new User({
                firstname,
                lastname,
                email,
                role,
                createdBy: req.user.id,
                password: await bcrypt.hash(generatedPassword, salt)
            })
        
            await user.save({timestamps: {createdAt: true, updatedAt: false} })

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

            await user.save({timestamps: {createdAt: false, updatedAt: true}})

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

const deleteUser = async(req,res)=>{
    try {
        const user = await User.findById(req.params.id)
        if(!user){
            return res.status(400).json({msg: 'User not found'})
        }
        if(user.createdBy.toString() !== req.user.id){
            return res.status(400).json({msg: 'You are not authorized to perform this function'})
        }

        if(user.assignedIssue){
            const issue = await Issue.findById(user.assignedIssue)
            issue.assignedTo = undefined
            issue.status = 'Unassigned'
            await issue.save({timestamps: false})
        }

        if(user.project){

            const project = await Project.findById(user.project)
            const index = project.members.indexOf(mongoose.Types.ObjectId(req.params.id))
            project.members.splice(index,1)
            project.save({timestamps: false})
        }

        await User.findByIdAndDelete(req.params.id)

        res.json({msg: 'User successfully deleted'})
    } catch (err) {
        console.error(err.message)
        if(err.kind === 'ObjectId'){
            return res.status(400).json({msg: 'User does not exist'})
        }
        res.status(500).send('Server Error')
    }
}

//  add change role functionality





module.exports = {
    createUser,
    allUsers,
    getUser,
    editUser,
    deleteUser
}


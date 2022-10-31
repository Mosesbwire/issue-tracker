const Project = require('../models/Project')
const User = require('../models/User')
const Issue = require('../models/Issue')
const { check, validationResult} = require('express-validator')
const moment = require('moment')
const { findById } = require('../models/Project')

const createProject = [
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('startDate', 'Project start date must be defined').not().isEmpty(),
    check('targetEndDate', 'Project target end date must be defined').not().isEmpty(),

    async(req,res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const today = moment().format('LL')

        const { title, description, startDate, targetEndDate } = req.body
        if(moment(today).isAfter(startDate) || moment(today).isAfter(targetEndDate)){
            return res.status(400).json({msg: 'Invalid dates. Start or end date cannot be in the past'})
        }
        if(moment(startDate).isAfter(moment(targetEndDate))){
            return res.status(400).json({msg: 'Invalid dates. Start date cannot be ahead of end date'})
        }

        try{
           
            const project = await Project.create({
                title,
                description,
                startDate,
                targetEndDate,
                createdBy: req.user.id
            })

            res.json(project)
        }catch(err){
            console.error(err.message)
            res.status(500).send('Server Error')
        }
    }

]


const addMembers = [
    check('members', 'Members field cannot be empty').not().isEmpty(),

    async(req,res)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const { members } = req.body
        try{

            const project = await Project.findById(req.params.id)
            if(!project){
                return res.status(400).json({msg: 'Project does not exist'})
            }
            
            members.map(async(member) => {

                if(member.role !== 'Manager' && member.project === undefined){
                    project.members.unshift(member)
                    const user = await User.findById(member._id)
                    user.project = project.id
                    await user.save({timestamps: {createdAt: false, updatedAt: true}})
                }
    
            })
            
            await project.save({timestamps: false})

            res.json(project.members)

        }catch(err){
            console.error(err.message)
            if(err.kind === 'ObjectId'){
                return res.status(400).json({msg: 'Project does not exist'})
            }
            res.status(500).send('Server Error')
        }
    }
]

const removeMembers = [
    check('members', 'Members field cannot be empty').not().isEmpty(),
    async(req,res)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        const { members  } = req.body
        try {
            const project = await Project.findById(req.params.id).populate('members', 'assignedIssue project ')
            if(!project){
                return res.status(400).json({msg: 'Project does not exist'})
            }

            members.map(async (member) => {
                let idx;
               
                project.members.map(async(currentMember,index)=>{
                    
                    if(member === currentMember._id.toString()){
                    
                        idx = index
                        const issue = await Issue.findById(currentMember.assignedIssue)
                        
                        if(issue){
                           
                            issue.assignedTo = undefined
                            if(issue.status === 'Open') issue.status = 'Unassigned'
                            await issue.save({timestamps: {createdAt: false, updatedAt: true}})
                        }
                        const user = await User.findById(currentMember._id)
                        if(user.assignedIssue) user.assignedIssue = undefined
                        if(user.project) user.project = undefined
                        await user.save({timestamps: {createdAt: false, updatedAt: true}})

                    }
        
                })
               project.members.splice(idx,1)
            })
           
            await project.save({timestamps: {createdAt: false, updatedAt: true}})
            res.json(project)
        } catch (err) {
            console.error(err.message)
            if(err.kind === 'ObjectId'){
                return res.status(400).json({msg: 'Project does not exist'})
            }
            res.status(500).send('Server Error')
        }
    }
]

const assignProjectLead = [
    check('projectLead', 'Project lead field cannot be empty').not().isEmpty(),
    async (req,res)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const { projectLead } = req.body
        try {
            const project = await Project.findById(req.params.id)
            if(!project){
                return res.status(400).json({msg: 'Project does not exist'})
            }
            if(projectLead.role !== 'Project Lead'){
                return res.status(400).json({msg: 'Selected user is not a designated Project Lead'})
            }

            project.projectLead = projectLead

            await project.save({timestamps: false})
            res.json(project)

        } catch (err) {
            console.error(err.message)
            if(err.kind === 'ObjectId'){
                return res.status(400).json({msg: 'Project does not exist'})
            }
            res.status(500).send('Server Error')
        }
    }
]

const closeProject = async(req,res)=>{
    try {
        const project = await Project.findById(req.params.id)
        if(!project){
            return res.status(400).json({msg: 'Project does not exist'})
        }

        project.actualEndDate = Date.now()

        project.save({timestamps: {createdAt: false, updatedAt: true}})

        res.json(project)
        
    } catch (err) {
        console.error(err.message)
        if(err.kind === 'ObjectId'){
            return res.status(400).json({msg: 'Project does not exist'})
        }
        res.status(500).send('Server Error')
    }
}

const editProject = [
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('startDate', 'Project start date must be defined').not().isEmpty(),
    check('targetEndDate', 'Project target end date must be defined').not().isEmpty(),

    async(req,res)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const { title, description, startDate, targetEndDate } = req.body

        
        try {
            let project = await Project.findById(req.params.id)
            const today = moment().format('LL')
            if(!project){
                return res.status(400).json({msg: 'Project does not exist'})
            }
            if(moment(today).isAfter(startDate) || moment(today).isAfter(targetEndDate)){
                return res.status(400).json({msg: 'Invalid dates. Start or end date cannot be in the past'})
            }
            if(moment(startDate).isAfter(moment(targetEndDate))){
                return res.status(400).json({msg: 'Invalid dates. Start date cannot be ahead of end date'})
            }
    

            project.title = title || project.title
            project.description = description || project.description
            project.startDate = startDate || project.startDate
            project.targetEndDate = targetEndDate || project.targetEndDate

            await project.save({timestamps: {createdAt: false, updatedAt: true}})

            res.json(project)

        } catch (err) {
            console.error(err.message)
            if(err.kind === 'ObjectId'){
                return res.status(400).json({msg: 'Project does not  exist'})
            }
            res.status(500).send('Server Error')
        }
    }

]

const getAllProjects = async(req,res)=> {
    try {
        const projects = await Project.find({})
        res.json(projects)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
}

const getProject = async(req,res)=> {
    try {
        const project = await Project.findById(req.params.id)
        if(!project){
            return res.status(400).json({msg: 'Project does not exist'})
        }

        res.json(project)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
}

const deleteProject = async(req,res)=>{

    try {
        const project = await Project.findById(req.params.id).populate('members', 'assignedIssue project')
        
        if(!project){
            return res.status(400).json({msg: 'Project does not exist'})
        }

        if(project.createdBy.toString() !== req.user.id){
            return res.status(401).json({msg: 'You are not authorized to perform this action.'})
        }

        const members = project.members
        const issues = project.issues

        members.map(async(member)=>{
            member.assignedIssue = undefined
            member.project = undefined
            await member.save({timestamps: {createdAt: false, updatedAt: true}})
        })

        issues.map(async(issue)=>{
            await Issue.findByIdAndDelete(issue)
        })

        await Project.findByIdAndDelete(req.params.id)

        res.json({msg: 'Project successfully deleted'})
        
    } catch (err) {
        console.error(err.message)
        if(err.kind === 'ObjectId'){
            return res.status(400).json({msg: 'Project does not exist'})
        }
        res.status(500).send('Server Error')
    }
}

module.exports = {
    createProject,
    addMembers,
    removeMembers,
    assignProjectLead,
    editProject,
    closeProject,
    getAllProjects,
    getProject,
    deleteProject
}
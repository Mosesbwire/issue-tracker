const { check, validationResult} = require('express-validator')
const mongoose = require('mongoose')
const Issue = require('../models/Issue')
const Project = require('../models/Project')
const User = require('../models/User')

const createIssue = [
    check('title', 'Issue title is required').not().isEmpty(),
    check('description', 'Issue description is required').not().isEmpty(),
    check('summary', 'Issue summary  is required').not().isEmpty(),
    check('identifiedOn', 'Date issue is identified should be filled').not().isEmpty(),    
    check('priority', 'priority field is a required field').not().isEmpty(),
    
   

    async(req,res) =>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const{
            title,
            description,
            summary,
            identifiedOn,
            priority,
            targetResolutionDate,
            assignedTo,
        }= req.body

        const issueFields = {}
        issueFields.identifiedBy = req.user.id
        if(title) issueFields.title = title
        if(summary) issueFields.summary = summary
        if(identifiedOn) issueFields.identifiedOn = identifiedOn
        if(priority) issueFields.priority = priority
        if(targetResolutionDate) issueFields.targetResolutionDate = targetResolutionDate
        issueFields.project = req.params.id
        if(description) issueFields.description = description
        
        try{
            const project = await Project.findById(req.params.id)
            const user = await User.findById(req.user.id)
            if(!project){
                return res.status(400).json({msg: 'Project does not exist has been deleted'})
            }
            if(assignedTo && user.role !== 'Software Engineer'){
                issueFields.assignedTo = assignedTo
                issueFields.status = 'Open'
            }
            
            const issue = new Issue(issueFields)

            await issue.save()
            project.issues.unshift(issue)
            project.save({timestamps: {createdAt: false, updatedAt: true}})
            
            if(issue.assignedTo){
                const user = await User.findById(issue.assignedTo)
                user.assignedIssue = issue
                await user.save({timestamps: {createdAt: false, updatedAt: true}})
            }
            res.json(issue)

        }catch(err){
            console.error(err.message)
            res.status(500).send('Server Error')
        }
    }

]

const assignIssue = [
    check('assignedTo', 'Select user to be assigned the issue').not().isEmpty(),
    async(req,res)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const {assignedTo} = req.body
        try{
            let issue = await Issue.findById(req.params.id)
            let issueAssignee = await User.findById(assignedTo)

            if(!issue){
                return res.status(400).json({msg: 'Issue does not exist'})
            }

            if(!issueAssignee){
                return res.status(400).json({msg: 'The user assigned this issue does not exist'})
            }

            if(!issueAssignee.project){
                return res.status(400).json({msg: 'This user has not been added to the project. Kindly add user to project the assign user the issue'})
            }

            if(issueAssignee.role === 'Manager'){
                return res.status(400).json({msg: 'Manager cannot be assigned issues'})
            }

            if(issueAssignee.project && issueAssignee.project.toString() !== issue.project.toString() ){
                return res.status(400).json({msg: 'This user does not belong to this project. Assign issue to a project member'})
            }
           
            if(issue.assignedTo){
                const currentAssignee = await User.findById(issue.assignedTo)
                currentAssignee.assignedIssue = undefined
                await currentAssignee.save({timestamps: false})
            }



            issue.assignedTo = assignedTo
            issue.status = 'Open'
            issueAssignee.assignedIssue = issue

            await issue.save({timestamps: {createdAt: false, updatedAt: true}})
            await issueAssignee.save({timestamps: {createdAt: false, updatedAt: true}})

            res.json(issue)

        }catch(err){
            console.error(err.message)
            if(err.kind === 'OjectId'){
                return res.status(400).json({msg: 'Issue does not exist'})
            }
            res.status(500).send('Server Error')
        }

    }
]

const closeIssue = async(req,res)=>{
    try {
        const issue = await Issue.findById(req.params.id)
        if(!issue){
            return res.status(400).json({msg: 'Issue does not exist'})
        }
        if(issue.assignedTo.toString() !== req.user.id){
            return res.status(401).json({msg: 'You are not authorized to perform this action'})
        }

        issue.actualResolutionDate = Date.now()
        issue.status = 'Closed'
        await issue.save({timestamps: {createdAt: false, updatedAt: true}})
        res.json(issue)
        
    } catch (err) {
        console.error(err.message)
        if(err.kind === 'ObjectId'){
            return res.status(400).json({msg: 'Issue does not exist'})
        }
        res.status(500).send('Server Error')
    }
    
}

const editIssue = [
    check('title', 'Issue title is required').not().isEmpty(),
    check('description', 'Issue description is required').not().isEmpty(),
    check('summary', 'Issue summary  is required').not().isEmpty(),
    check('identifiedOn', 'Date issue is identified should be filled').not().isEmpty(),    
    check('priority', 'priority field is a required field').not().isEmpty(),
    check('targetResolutionDate', 'Estimated date of issue resolution should be indicated').not().isEmpty(),

    async(req,res)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const {
            title,
            description,
            summary,
            identifiedOn,
            priority,
            targetResolutionDate
        }= req.body

        try {
            const issue = await Issue.findById(req.params.id)
            if(!issue){
                return res.status(400).json({msg: 'Issue does not exist'})
            }
            const project = await Project.findById(issue.project)
            const projectLead = project.projectLead


            if(issue.status === 'Open' && (issue.assignedTo.toString() !== req.user.id || req.user.id !== projectLead.toString())){
                
                return res.status(401).json({msg: 'You are not authorized to perform this action.'})
            }

            if(issue.status === 'Open' && (issue.assignedTo.toString() === req.user.id || req.user.id === projectLead.toString())){
                issue.title = title || issue.title
                issue.description = description || issue.description
                issue.summary = summary || issue.summary
                issue.identifiedOn = identifiedOn || issue.identifiedOn
                issue.priority = priority || issue.priority
                issue.targetResolutionDate = targetResolutionDate || issue.targetResolutionDate

                await issue.save({timestamps: {createdAt: false, updatedAt: true}})

                return res.json(issue)
            }

            if(issue.status === 'Unassigned'){
                issue.title = title || issue.title
                issue.description = description || issue.description
                issue.summary = summary || issue.summary
                issue.identifiedOn = identifiedOn || issue.identifiedOn
                issue.priority = priority || issue.priority
                issue.targetResolutionDate = targetResolutionDate || issue.targetResolutionDate

                await issue.save({timestamps: {createdAt: false, updatedAt: true}})

                return res.json(issue)
            }

            
            
        } catch (err) {
            console.error(err.message)
            if(err.kind === 'ObjectId'){
                return res.status(400).json({msg: 'Issue does not exist'})
            }
            res.status(500).send('Server Error')
        }
    }

]

const getIssue = async (req,res)=>{
    try {
        const issue = await Issue.findById(req.params.id)
        if(!issue){
            return res.status(400).json({msg: 'Issue does not exist'})
        }

        res.json(issue)
    } catch (err) {
        console.error(err.message)
        if(err.kind === 'ObjectId'){
            return res.status(400).json({msg: 'Issue does not exist'})
        }
        res.status(500).send('Server Error')
        
    }
}

const getAllIssues = async(req,res)=>{
    try {
        const issues = await Issue.find({}).populate('project').populate('assignedTo')
        res.json(issues)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
}

const deleteIssue = async(req,res)=> {
    try {
        const issue = await Issue.findById(req.params.id)
        const project = await Project.findById(issue.project)
        if(!issue){
            return res.status(400).json({msg: 'Issue does not exist'})
        }

        if(project.createdBy.toString() !== req.user.id ){
            return res.status(400).json({msg: 'You are not authorized to perform this action'})
        }

        if(project.projectLead && project.projectLead.toString() !== req.user.id){
            return res.status(400).json({msg: 'You are not authorized to perform this action'})
        }

        if(issue.status === 'Closed'){
            return res.status(400).json({msg: 'This issue has been marked closed. Cannot be deleted.'})
        }

        if(issue.assignedTo){
            const user = await User.findById(issue.assignedTo)
            user.assignedIssue = undefined
            await user.save({timestamps: false})
        }

        const index = project.issues.indexOf(mongoose.Types.ObjectId(req.params.id))
        project.issues.splice(index,1)

        await project.save({timestamps: false})

        await Issue.findByIdAndDelete(req.params.id)

        res.json({msg: 'Issue successfully deleted'})
        
    } catch (err) {
        console.error(err.message)
        if(err.kind === 'ObjectId'){
            return res.status(400).json({msg: 'Issue does not exist'})
        }
        res.status(500).send('Server Error')
    }
}
module.exports = {
    createIssue,
    assignIssue,
    editIssue,
    closeIssue,
    getIssue,
    getAllIssues,
    deleteIssue
}


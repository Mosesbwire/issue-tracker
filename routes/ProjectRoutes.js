const express = require('express')
const { authenticate,authorizePeopleManagement} = require('../middleware/authenticate')
const {
    createProject,
    addMembers,
    removeMembers,
    assignProjectLead,
    editProject,
    closeProject,
    getAllProjects,
    getProject,
    deleteProject
} = require('../controllers/ProjectController')


const ProjectRouter = express.Router()

ProjectRouter.post('/', authenticate, authorizePeopleManagement, createProject)
ProjectRouter.put('/addMembers/:id', authenticate, authorizePeopleManagement, addMembers)
ProjectRouter.put('/removeMembers/:id', authenticate, authorizePeopleManagement, removeMembers)
ProjectRouter.put('/assignlead/:id', authenticate, authorizePeopleManagement, assignProjectLead)
ProjectRouter.put('/edit/:id', authenticate, authorizePeopleManagement, editProject)
ProjectRouter.put('/close/:id', authenticate, authorizePeopleManagement, closeProject)
ProjectRouter.get('/', authenticate, getAllProjects)
ProjectRouter.get('/:id', authenticate, getProject)
ProjectRouter.delete('/delete/:id', authenticate, authorizePeopleManagement,deleteProject)


module.exports = ProjectRouter
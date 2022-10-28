const express = require('express')
const IssueRouter = express.Router()
const { authenticate, authorizePeopleManagement } = require('../middleware/authenticate')
const { createIssue, editIssue, assignIssue, closeIssue, getIssue, getAllIssues } =require('../controllers/IssueController')

IssueRouter.post('/:id', authenticate, createIssue)
IssueRouter.put('/edit/:id', authenticate, editIssue)
IssueRouter.put('/assignissue/:id', authenticate, authorizePeopleManagement,assignIssue)
IssueRouter.put('/closeissue/:id', authenticate, closeIssue)
IssueRouter.get('/', authenticate, getAllIssues)
IssueRouter.get('/:id', authenticate, getIssue)



module.exports = IssueRouter
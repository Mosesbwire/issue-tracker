const express = require('express')
const { IssueReportData } = require('../services/IssueReportsService')

const IssueReportRouter = express.Router()

IssueReportRouter.get('/', IssueReportData)

module.exports = IssueReportRouter
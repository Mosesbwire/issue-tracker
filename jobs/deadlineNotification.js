const Project = require('../models/Project')
const Mailer = require('../models/Mailer')
const agenda = require('./index')
const moment = require('moment')

const today = moment().format('LL')

agenda.define('project deadline', async (job)=>{

    await Project.find({ $where: function(){
        if(moment(today).isAfter(this.targetEndDate)) return this.projectLead
    }})
    
})
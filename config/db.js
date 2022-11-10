const mongoose = require('mongoose')
const config = require('config')


const projects = require('../generateData/project')

const Project = require('../models/Project')
const Issue = require('../models/Issue')


const db = config.get('mongoUri')

const connectDB = async () => {
    try {
        await mongoose.connect(db, {useNewUrlParser: true})
        // projects.forEach(async project => {
        //     const newProject = await Project.create(project.project)
        //     for (let index = 0; index < 20; index++) {
        //         const { title, description, summary, identifiedOn, assignedOn, targetResolutionDate } = project.issue
                
        //         const issue = new Issue({
        //             title,
        //             description,
        //             summary,
        //             identifiedOn,
        //             assignedOn,
        //             targetResolutionDate,
        //             project: newProject.id
        //         })
        //         await issue.save()
        //     }

        // })
        
        console.log('mongo db connected')
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

module.exports = connectDB
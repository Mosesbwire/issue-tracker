const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProjectSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    targetEndDate: {
        type: Date,
        required: true
    },
    actualEndDate: {
        type: Date
    },

    projectLead : {
        type: Schema.Types.ObjectId, ref: 'User'
    },

    createdBy : {
        type: Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    modifiedBy : {
        type: Schema.Types.ObjectId, ref: 'User',
        
    },
    modifiedOn: {
        type: Date
    },
    members: [
        {type: Schema.Types.ObjectId, ref: 'User'}
    ],
    issues: [
        {type: Schema.Types.ObjectId, ref: 'Issue'}
    ]
}, {timestamps: true})


module.exports = mongoose.model('Project', ProjectSchema)
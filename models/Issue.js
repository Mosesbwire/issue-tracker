const mongoose = require('mongoose')
const Schema = mongoose.Schema

const IssueSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    resolutionSummary: {
        type: String
    },
    identifiedOn: {
        type: Date,
        required: true 
    },
    project: {
        type: Schema.Types.ObjectId, ref: 'Project',
        required: true
    },
    assignedTo: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    identifiedBy: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    status: {
        type: String,
        enum: ['Open', 'Closed', 'Unassigned'],
        default: 'Unassigned'
    },
    priority: {
        type: String,
        enum: ['High', 'Medium', 'Low'],
        required: true
    },
    targetResolutionDate: {
        type: Date,

    },
    actualResolutionDate: {
        type: Date
    }
}, {timestamps: true})


module.exports = mongoose.model('Issue', IssueSchema)
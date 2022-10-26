const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProjectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    target_end_date: {
        type: Date,
        required: true
    },
    actual_end_date: {
        type: Date
    },

    project_lead : {
        type: Schema.Types.ObjectId, ref: 'User'
    },

    created_by : {
        type: Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    modified_by : {
        type: Schema.Types.ObjectId, ref: 'User',
        
    },
    modified_on: {
        type: Date
    },
    members: [
        {type: Schema.Types.ObjectId, ref: 'User'}
    ],
    issues: [
        {type: Schema.Types.ObjectId, ref: 'Issue'}
    ]
}, {timestamps: true})
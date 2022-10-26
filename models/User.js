const mongoose = require('mongoose')
const Schema = mongoose.Schema


const UserSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    role : {
        type: String,
        required: true,
        enum: ['Manager', 'Project Lead', 'Software Engineer']
    },

    createdBy: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    modifiedBy: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    
    modifiedOn: {
        type: Date
    },
    project: 
        {type: Schema.Types.ObjectId, ref: 'Project'}
    ,
    assignedIssue: 
        {type: Schema.Types.ObjectId, ref: 'Issue'}
    ,
    
    password: {
        type: String,
        required: true
    }

})


UserSchema.virtual('fullname').get( ()=>{
    return this.firstname + ' ' + this.lastname
})

module.exports = mongoose.model('User', UserSchema)


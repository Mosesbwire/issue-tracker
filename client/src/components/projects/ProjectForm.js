import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { createProject } from '../../actions/project'

const ProjectForm = ({createProject, project: {isCreated, project}}) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startDate: '',
        targetEndDate: ''
    })

    const onChange = (e)=> setFormData({...formData, [e.target.name]: e.target.value})
    const {title, description,startDate,targetEndDate } = formData
    const onSubmit = async e => {
        e.preventDefault()
        createProject(formData)
    }
 
    if(isCreated){
        return <Navigate to={`/project/${project._id}`}/>
    }

  return (
    <div>
        <h1 className='primary-heading text'>Create Project.</h1>
        <form className='forms' onSubmit={e => onSubmit(e)}>
            <div className='form-group'>
                <label htmlFor="title">Title</label>
                <input type="text" name='title' value={title} onChange={e=> onChange(e)} required/>
            </div>
            <div className='form-group'>
                <label htmlFor="description">Description</label>
                <input type="text" name='description' value={description} onChange={e=> onChange(e)} required/>
            </div>
            <div className='form-group'>
                <label htmlFor="startDate">Start Date</label>
                <input type="date" name='startDate' value={startDate} onChange={e=> onChange(e)} required/>
            </div>
            <div className='form-group'>
                <label htmlFor="targetEndDate">Target End Date</label>
                <input type="date" name='targetEndDate' value={targetEndDate} onChange={e=> onChange(e)} required/>
            </div>
            <div className='form-group'>
                <button className='btn-primary' type='submit'>Create</button>
            </div>
        </form>
    </div>
)}

ProjectForm.propTypes = {
    createProject: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    project: state.project
})

export default connect(mapStateToProps, {createProject})(ProjectForm)

import React, {useState, useEffect, Fragment} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {Navigate } from 'react-router-dom'
import {createIssue} from '../../actions/issue'
import {getUsers} from '../../actions/user'

const IssueForm = ({createIssue, getUsers,path, isCreated, loggedInUser, users, project}) => {

    useEffect(()=>{
        getUsers()
    }, [getUsers])

    const issuePriority = ['High', 'Medium', 'Low']
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        summary: '',
        identifiedOn: '',
        priority: 'High',
        targetResolutionDate: '',
        assignedTo: '',
        

    })

    const onChange = (e) =>setFormData({...formData, [e.target.name]: e.target.value})

    const {title, description, summary, identifiedOn, priority, targetResolutionDate, assignedTo } = formData

    const onSubmit = async e => {
        e.preventDefault()
        createIssue(formData, project._id)
    }

    if(isCreated){
       
        return <Navigate to={path}/>
    }

  return (
    <div className='container'>
      <h1>Open Issue</h1>
     
      <form className='forms' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
            <label htmlFor='title'>Title</label>
            <input type='text' name='title' value={title} onChange={e => onChange(e)}/>
        </div>
        <div className='form-group'>
            <label htmlFor='description'>Description</label>
            <input type='text' name='description' value={description} onChange={e => onChange(e)}/>
        </div>
        <div className='form-group'>
            <label htmlFor='summary'>Summary</label>
            <input type='text' name='summary' value={summary} onChange={e => onChange(e)}/>
        </div>
        <div className='form-group'>
            <label htmlFor='identifiedOn'>Identified On</label>
            <input type='date' name='identifiedOn' value={identifiedOn} onChange={e => onChange(e)}/>
        </div>
        <div className='form-group'>
            <label htmlFor='priority'>Issue Priority</label>
            <select  value={priority}  name='priority' onChange={e => onChange(e)}>
                {issuePriority.map((level, index) => (<option key={index} value={level}>{level}</option>))}                
            </select>
        </div>
        {loggedInUser.role === 'Manager' && (<Fragment>
            <div className='form-group'>
                <label htmlFor='targetResolutionDate'>Target Resolution Date</label>
                <input type='date' name='targetResolutionDate' value={targetResolutionDate} onChange={e => onChange(e)}/>
            </div>
            <div className='form-group'>
                <label htmlFor='assignedTo'>Assign Issue</label>
                <select  value={assignedTo} name='assignedTo' onChange={e => onChange(e)}>
                    {users.map(user => (<option  key={user._id} value={`${user._id}`}>{`${user.firstname} ${user.lastname}`}</option>))}

                </select>
            </div>
        </Fragment>)}

        <div className='form-group'>
            <button type='submit'>Create</button>
        </div>
      </form>
    </div>
  )
}

IssueForm.propTypes = {
    path: PropTypes.string.isRequired,
    isCreated: PropTypes.bool.isRequired,
    loggedInUser: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired,
    project: PropTypes.object.isRequired,
}

const mapStateToProps = state =>({
    path: state.redirect.path,
    isCreated: state.issue.isCreated,
    loggedInUser: state.auth.user,
    users: state.user.users,
    project: state.project.project
})

export default connect(mapStateToProps, {createIssue, getUsers})(IssueForm)

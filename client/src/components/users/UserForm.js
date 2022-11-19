import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
import {createUser} from '../../actions/user'

const UserForm = ({user: {isCreated}, path, createUser})=> {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        role: ''
    })

    const onChange = (e) => setFormData({...formData, [e.target.name]: e.target.value})
    const {firstname, lastname, email, role } = formData 
    const onSubmit = async e =>{
        e.preventDefault()
        createUser(formData)
    }

    if(isCreated){
        return <Navigate to={path}/>
    }
  return (
    <main className='container'>
      <form className='forms' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
            <label htmlFor='firstname'>First Name</label>
            <input type="text" name='firstname' value={firstname} onChange={e => onChange(e)} required/>
        </div>
        <div className='form-group'>
            <label htmlFor='lastname'>Last Name</label>
            <input type="text" name='lastname' value={lastname} onChange={e => onChange(e)} required/>
        </div>
        <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input type="email" name='email' value={email} onChange={e => onChange(e)} required/>
        </div>
        <div className='role'  value={role} onChange={e => onChange(e)} required>
            <label htmlFor='manager'>Manager</label>
            <input type='radio' name='role' value="Manager"/>
            <label htmlFor='projectLead'>Project Lead</label>
            <input type='radio' name='role' value="Project Lead"/>
            <label htmlFor='software engineer'>Software Engineer</label>
            <input type='radio' name='role' value="Software Engineer"/>
        </div>
        <div className='form-group'>
            <button type='submit' className='btn-primary'>Create User</button>
        </div>
      </form>
    </main>
  )
}

UserForm.propTypes = {
    user: PropTypes.object.isRequired,
    createUser: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired
}

const mapStateToProps = state =>({
    user: state.user,
    path: state.redirect.path
})

export default connect(mapStateToProps, {createUser})(UserForm)

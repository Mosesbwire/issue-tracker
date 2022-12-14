import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { resetPassword} from '../../actions/auth'


const ResetPassword = ({resetPassword}) => {
    const [formData, setFormData] = useState({
        email: ""
    })

    const { email } = formData

    const onChange = e => {setFormData({...formData, [e.target.name]: e.target.value})}
    const onSubmit = async e =>{
        e.preventDefault()
        resetPassword(email)
    }

   
  return (
    <div className="reset-page">
        <div className="container wrapper auth-form">
            <h1 className="primary-heading text">Issue Tracker</h1>
            <p>Enter your registered email address.</p>
            
            <form onSubmit={e=> onSubmit(e)}>
                <div className="form-group">
                    <label for="email">Email</label>
                    <input type="email" name="email" id="" value={email} onChange={e => onChange(e)} required/>
                </div>
                <div className="form-group">
                    <button className="btn-primary" type="submit">Reset Password</button>
                </div>
            </form>
            <Link to='/'>Login</Link>
        </div>
    </div>
  )
}

ResetPassword.propTypes = {
    resetPassword: PropTypes.func.isRequired,
    
}

const mapStateToProps = state =>({
    auth: state.auth
})

export default connect(mapStateToProps,{resetPassword})(ResetPassword)

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const ResetPassword = props => {
  return (
    <div className="reset-page">
        <div className="container wrapper auth-form">
            <h1 className="primary-heading text">Issue Tracker</h1>
            <p>Enter your registered email address.</p>
            
            <form action="">
                <div className="form-group">
                    <label for="email">Email</label>
                    <input type="email" name="email" id=""/>
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

}

export default ResetPassword

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
const Login = props => {
  return (
    <div className="login">
        <div className="container wrapper auth-form">
            <h1 className="primary-heading text">Welcome to Issue Tracker.</h1>
            <form action="" method="post">
                <div className="form-group">
                    <label for="email">Email</label>
                    <input type="email" name="email" id=""/>
                </div>
                <div className="form-group">
                    <label for="password">Password</label>
                    <input type="password" name="password" id=""/>
                </div>
                <div className="form-group">
                    <button className="btn-primary" type="submit" >Login</button>
                </div>
            </form>
            <Link to="/reset-password" className="dark-text">Forgot password?</Link>
        </div>
    </div>
  )
}

Login.propTypes = {

}

export default Login

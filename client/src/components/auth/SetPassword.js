import React from 'react'
import PropTypes from 'prop-types'

const SetPassword = props => {
  return (
    <div className="new-pwd">
        <div className="container wrapper auth-form">
            <p>Enter your new password to login</p>
            <form action="">
                <div className="form-group">
                    <label for="password">Password</label>
                    <input type="password" name="password" id=""/>
                </div>
                <div className="form-group">
                    <label for="confirm">Confirm Password</label>
                    <input type="password" name="confirm" id=""/>
                </div>
                <div className="form-group">
                    <button className="btn-primary">Login</button>
                </div>
            </form>
        </div>
    </div>
  )
}

SetPassword.propTypes = {

}

export default SetPassword

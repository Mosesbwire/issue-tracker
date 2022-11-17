import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { Link, Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../actions/auth'
const Login = ({login, path}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const {email, password } = formData
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
    const onSubmit = async e => {
        e.preventDefault()
        login({email, password})
    }

    if(path === '/dashboard'){
        return <Navigate to={path}/>
    }
  return (
    <div className="login">
        <div className="container wrapper auth-form">
            <h1 className="primary-heading text">Welcome to Issue Tracker.</h1>
            <form onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="" value={email} onChange={e => onChange(e)} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="" minLength="6" value={password} onChange= {e => onChange(e)} required/>
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
    login: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired,
}

const mapStateToProps = state =>({
    path: state.redirect.path
})

export default connect(mapStateToProps, {login})(Login)

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../actions/auth'

const Navbar = ({logout, isAuthenticated, loading}) => {
    return(
    <header className="header">
        <div className="container header-wrapper">
            <div className="logo"><p className="text">Issue Tracker 1.0.0</p></div>
            {
                !loading && isAuthenticated &&(
                <nav className='navigation'>
                    <ul className='nav-items'>
                        <li><Link className='nav-link' to="/projects">Projects</Link></li>
                        <li><Link className='nav-link' to="/issues">Issues</Link></li>
                        <li><Link className='nav-link' to="/reports">Reports</Link></li>
                        <li><Link className='nav-link' to ="/users">Users</Link></li>
                    </ul>
                </nav>)
            }
            {!loading && isAuthenticated && (<button className='btn-primary' onClick={logout}>Logout</button>)}
        </div>
    </header>
    
)}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    loading: PropTypes.bool,
}

const mapStateToProps = state =>({
    isAuthenticated : state.auth.isAuthenticated,
    loading: state.auth.loading
})

export default connect(mapStateToProps, {logout})(Navbar)

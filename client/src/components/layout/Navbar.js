import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'

const Navbar = ({logout, isAuthenticated, loading}) => {
    return(
    <header className="header">
        <div className="container header-wrapper">
            <div className="logo"><p className="text">Issue Tracker 1.0.0</p></div>
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

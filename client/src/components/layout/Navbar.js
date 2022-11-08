import React from 'react'
import PropTypes from 'prop-types'

const Navbar = props => 
    <header className="header">
        <div className="container header-wrapper">
            <div className="logo"><p className="text">Issue Tracker 1.0.0</p></div>
            <button className="btn-primary">Logout</button>
        </div>
    </header>
    


Navbar.propTypes = {

}

export default Navbar

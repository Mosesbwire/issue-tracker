import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'

const AuthorizedRoute = ({auth: {isAuthenticated, loading, user}, children}) => {
  return isAuthenticated && !loading && user.role === 'Manager' ? children : <Navigate to= "/dashboard" />
    
}

AuthorizedRoute.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state =>({
    auth: state.auth
})

export default connect(mapStateToProps)(AuthorizedRoute)

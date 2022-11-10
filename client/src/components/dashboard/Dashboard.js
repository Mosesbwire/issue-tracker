import React, { Fragment } from 'react'
import PropTypes  from 'prop-types'
import { connect } from 'react-redux'
import Aside from './Aside'

const Dashboard = ({auth: {user, loading}}) => {
  
  return loading && user === null ? <p>Loading</p> : <Fragment>
        <main className='grid-container'>

          <Aside user={user}/>
        </main>
    </Fragment>
    
  
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
})


export default connect(mapStateToProps)(Dashboard)

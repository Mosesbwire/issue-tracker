import React, { Fragment } from 'react'
import PropTypes  from 'prop-types'
import { connect } from 'react-redux'
import Aside from './Aside'
import Spinner from '../layout/Spinner'

const Dashboard = ({auth: {user, loading}}) => {
  
  return user === null ? <Spinner/> : <Fragment>
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

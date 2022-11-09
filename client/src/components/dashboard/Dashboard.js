import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Aside from './Aside'

const Dashboard = ({user}) => {
  return (
    <main className='grid-container'>
        
      <Aside user={user}/>
    </main>
  )
}

Dashboard.propTypes = {
    user: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    user: state.auth.user
})

export default connect(mapStateToProps)(Dashboard)

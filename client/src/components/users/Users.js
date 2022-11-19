import React, {useEffect, Fragment} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import UserItem from './UserItem'
import { getUsers } from '../../actions/user'
import Spinner from '../layout/Spinner'

const Users = ({getUsers, loggedInUser, users: {users, loading}}) => {
  useEffect(()=>{
    getUsers()
  }, [getUsers])
  return loading  ? <Spinner/> : <Fragment>
      <main>
        <div className='container'>
          {loggedInUser.role === 'Manager' &&(<Link to='/users/new'><button className='btn-primary'>Create User</button></Link>) }
          
        </div>
        <h1 className='primary-heading user-heading'>Team Members Profiles</h1>
        <div className='users container'>
          {loading && users.length === 0 ? <Spinner/> : <Fragment>
              {users.map(user => (<UserItem key={user._id} user={user}/>))}
            </Fragment>}
          {!loading && users.length === 0 && (<p>Users not available</p>)}

        </div>
      </main>
  </Fragment>
  
}

Users.propTypes = {
  users: PropTypes.object.isRequired,
  loggedInUser: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  users: state.user,
  loggedInUser: state.auth.user
})

export default connect(mapStateToProps, {getUsers})(Users)

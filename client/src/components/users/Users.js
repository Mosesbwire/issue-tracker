import React, {useEffect, Fragment} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import UserItem from './UserItem'
import { getUsers } from '../../actions/user'
import Spinner from '../layout/Spinner'

const Users = ({getUsers, users: {users, loading}}) => {
  useEffect(()=>{
    getUsers()
  }, [getUsers])
  return loading  ? <Spinner/> : <Fragment>
      <main>
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
}

const mapStateToProps = state => ({
  users: state.user
})

export default connect(mapStateToProps, {getUsers})(Users)

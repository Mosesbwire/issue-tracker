import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const UserItem = ({user}) => {
  return (
    <div className="user-card">
        <div className="space-between">
            <p>Name</p>
            <p>{`${user.firstname} ${user.lastname}`}</p>
        </div>
        <div className="space-between">
            <p>Email</p>
            <p>{user.email}</p>
         </div>
        <div className="space-between">
            <p>Role</p>
            <p>{user.role}</p>
        </div>
        <div className="space-between">
             <p>Project</p>
             {user.project === undefined ? <p>N/A</p> : <p>{user.project}</p>}
            
        </div>
        <div className="space-between">
            <p>Joined</p>
            <p><Moment format='YYYY/MM/DD'>{user.createdAt}</Moment></p>
         </div>   
        <div className="user-actions">
            <i className="fa-solid fa-pencil"></i>
            <i className="fa-solid fa-trash"></i>                    
        </div>
    </div>
  )
}

UserItem.propTypes = {
    user: PropTypes.object.isRequired,
}

export default UserItem

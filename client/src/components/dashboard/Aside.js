import React,{Fragment} from 'react'
import PropTypes from 'prop-types'

const Aside = ({user}) => {
    
  return (
    <Fragment>
        <aside className="aside">
            <div className="container aside-wrapper text">
                    <div className="space-between aside-item">
                        <p><i className="fa-solid fa-user aside-ic"></i>User</p>
                        <p>{`${user.firstname} ${user.lastname}`}</p>
                    </div>
                    {user.role !== 'Manager' && (<Fragment>
                        <div className="space-between aside-item">
                            <p><i className="fa-solid fa-diagram-project aside-ic"></i>Project</p>
                            <p>Node Backend</p>
                        </div>
                        <div className="user-task-details">
                            <div className="space-between aside-item">
                                <p><i className="fa-solid fa-thumbtack aside-ic"></i>Task</p>
                                <p>Add jwt authentication</p>
                            </div>
                            <div className="space-between aside-item">
                                <p><i className="fa-solid fa-calendar-xmark aside-ic"></i>Due date</p>
                                <p>10/10/2022</p>
                            </div>
                        </div>
                    </Fragment>)} 
            </div>
        </aside>
    </Fragment>
  )
}

Aside.propTypes = {
    user: PropTypes.object.isRequired,
}



export default Aside

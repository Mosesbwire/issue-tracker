import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ProjectMembers = ({members}) => {
  return (
    <div className="full-description members-list">
        <p>Project Members</p>

        <div className="members-wrapper">
            {members.length === 0 ? <p>This project currently has no members</p> : <Fragment>
                {members.map(member => (
                    <div className="space-between member" key={member._id}>
                        <p>{`${member.firstname} ${member.lastname}`}</p>
                        <p>{member.role}</p>
                    </div>
                ))}
                </Fragment>}
            
            
        </div>
    </div>
  )
}

ProjectMembers.propTypes = {
    members: PropTypes.array.isRequired,
}

export default ProjectMembers

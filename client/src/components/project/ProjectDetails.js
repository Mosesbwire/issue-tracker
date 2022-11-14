import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProjectDetails = ({project}) => {
  return <Fragment>

    <div className="full-description">
        <small>STATUS: {project.actualEndDate ? 'CLOSED': 'OPEN'}</small>
        <div className="project-timeline space-between">
            <div>
                <p>Start Date</p>
                <p><Moment format='YYYY/MM/DD'>{project.startDate}</Moment></p>
            </div>
            <div>
                <p>Target End Date</p>
                <p><Moment format='YYYY/MM/DD'>{project.targetEndDate}</Moment></p>
            </div>
        </div>
        <div className="project-identifier">
            <p>Title</p>
            <p>{project.title}</p>
        </div>
        <div className="project-identifier">
            <p className='project-description'>{project.description}</p>
        </div>
        <div className="owners">
            <div className="space-between">
                <p>Project Manager</p>
                {project.createdBy ?  <p>{project.createdBy.firstname}</p> : <p>Admin</p>  }
            </div>
            <div className="space-between">
                <p>Project Lead</p>
                {project.projectLead ?  <p>{project.projectLead.firstname}</p> : <p>Admin</p>  }
                 
            </div>
            <div className="space-between">
                <p>Members</p>
                <p>{project.members.length}</p>
            </div>
        </div>
    </div>
  </Fragment>
  
}

ProjectDetails.propTypes = {
    project: PropTypes.object.isRequired,
}

export default ProjectDetails

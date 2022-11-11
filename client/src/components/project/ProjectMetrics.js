import React from 'react'
import PropTypes from 'prop-types'

const ProjectMetrics = ({issues}) => {
  return (
    <div>
      <div className="project-details">
        <div className="detail-card">
            <p>Total Issues</p>
            <p>{issues.length}</p>
        </div>
        <div className="detail-card">
            <p>Open Issues</p>
            <p>{issues.map(issue => issue.status === 'Open').length}</p>
        </div>
        <div className="detail-card">
            <p>Unassigned Issues</p>
            <p>{issues.map(issue => issue.status === 'Unassigned').length}</p>  
        </div>
        <div className="detail-card">
        <p>Solved Issues</p>
        <p>{issues.map(issue => issue.status === 'Closed').length}</p>  
        </div>
        </div>
    </div>
  )
}

ProjectMetrics.propTypes = {
   issues: PropTypes.array.isRequired,
}

export default ProjectMetrics

import React,{Fragment} from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'


const IssueItem = ({issue})=> {
  return (
    
    <Fragment>
    
        <Fragment>
          {issue.title.length > 50 ? (<p>{`${issue.title.substring(0,50)}...`}</p>): (<p>{issue.title}</p>)}
        </Fragment>
        <p><Moment format='YYYY/MM/DD'>{issue.identifiedOn ? (<Fragment>{issue.identifiedOn}</Fragment>): <Fragment>N/A</Fragment>}</Moment></p>
        <p><Moment format='YYYY/MM/DD'>{issue.assignedOn ? (<Fragment>{issue.assignedOn}</Fragment>): <Fragment>N/A</Fragment>}</Moment></p>
        <p>{issue.assignedTo ? <Fragment>{`${issue.assignedTo.firstname} ${issue.assignedTo.lastname}`}</Fragment> : <Fragment>N/A</Fragment>}</p>
        <p>{issue.project ? <Fragment>{issue.project.title}</Fragment> : <Fragment>N/A</Fragment>}</p>
        <div className="project-actions">
            <i className="fa-solid fa-trash"></i>
            <i className="fa-solid fa-pencil"></i>
        </div>
    </Fragment>
  )
}

IssueItem.propTypes = {
    issue: PropTypes.object.isRequired,
}

export default IssueItem

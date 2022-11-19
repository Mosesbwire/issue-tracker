import React,{Fragment} from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const IssueItem = ({issue})=> {
  return (
    
    <Fragment>
        <p>{issue.title}</p>
        <p><Moment format='YYYY/MM/DD'>{issue.identifiedOn ? (<Fragment>{issue.identifiedOn}</Fragment>): <Fragment>N/A</Fragment>}</Moment></p>
        <p><Moment format='YYYY/MM/DD'>{issue.assignedOn ? (<Fragment>{issue.assignedOn}</Fragment>): <Fragment>N/A</Fragment>}</Moment></p>
        <p>{issue.assignedTo ? <Fragment>{issue.assignedTo}</Fragment> : <Fragment>N/A</Fragment>}</p>
        <p>{issue.project ? <Fragment>{issue.project}</Fragment> : <Fragment>N/A</Fragment>}</p>
        <div class="project-actions">
            <i class="fa-solid fa-trash"></i>
            <i class="fa-solid fa-pencil"></i>
        </div>
    </Fragment>
  )
}

IssueItem.propTypes = {
    issue: PropTypes.object.isRequired,
}

export default IssueItem

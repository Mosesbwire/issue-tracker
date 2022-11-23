import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import {getIssueById } from '../../actions/issue'
import Spinner from '../layout/Spinner'

const Issue = ({getIssueById, issue: {loading, issue}}) => {

    const { id  } = useParams()

    useEffect(()=>{
       
        getIssueById(id)
    }, [getIssueById])

  return loading || issue === null  ? (<Spinner/>) : (<Fragment>
        <div>
        <div class="actions flex-container container">
            <button class="btn-primary">Edit</button>
            <button class="btn-primary">Assign</button>
            <button class="btn-primary btn-delete">Delete</button>
            <p>status: <span>{issue.status}</span></p>
        </div>
        <div class="issue-owner">
            <div class=" space-between container">
                <div>
                    <p>Assinged To</p>
                    <p>{issue.assignedTo ? `${issue.assignedTo.firstname} ${issue.assignedTo.lastname}` : 'N/A'}</p>
                </div>
                <div>
                    <p>Opened On</p>
                    <p><Moment format='YYYY.MM.DD'>{issue.identifiedOn}</Moment></p>
                </div>
                <div>
                    <p>Assigned On</p>
                    <Fragment>
                        {issue.assignedOn ? <Moment format='YYYY.MM.DD'><p>{issue.assignedOn}</p></Moment>: <p>N/A</p>}
                    </Fragment>
                </div>
                <div>
                    <p>Target Resolution Date</p>
                    <Fragment>
                        {issue.targetResolutionDate ? <Moment format='YYYY.MM.DD'><p>{issue.targetResolutionDate}</p></Moment> : <p>N/A</p> }
                    </Fragment>
                    
                </div>
                <div>
                    <p>Closed On</p>
                    <Fragment>
                        {issue.actualResolutionDate ? <Moment format='YYYY.MM.DD'><p>{issue.actualResolutionDate}</p></Moment> : <p>N/A</p>}
                    </Fragment>
                </div>
            </div>

        </div>
        <div class="issue-detail ">
            <div class="issue-detail-wrapper container">
                <div class="space-between">
                    <p>Issue</p>
                    <p>{issue.title}</p>
                </div>
        
                <div class="space-between">
                    <p>Priority</p>
                    <p>{issue.priority}</p>
                </div>
                <div class="space-between">
                    <p>Timeline</p>
                    <p>overdue</p>
                </div>
            </div>
        </div>
    </div>
    </Fragment>)
  
}

Issue.propTypes = {
    issue: PropTypes.object.isRequired,
    getIssueById: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    issue: state.issue
})

export default connect(mapStateToProps, {getIssueById})(Issue)

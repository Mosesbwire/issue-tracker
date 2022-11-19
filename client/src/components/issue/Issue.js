import React, {Fragment} from 'react'
import PropTypes from 'prop-types'

const Issue = props => {
  return (
    <Fragment>
        <div>
        <div class="actions flex-container container">
            <button class="btn-primary">Edit</button>
            <button class="btn-primary">Assign</button>
            <button class="btn-primary btn-delete">Delete</button>
            <p>status: <span>Open</span></p>
        </div>
        <div class="issue-owner">
            <div class=" space-between container">
                <div>
                    <p>Assinged To</p>
                    <p>User Joe</p>
                </div>
                <div>
                    <p>Opened On</p>
                    <p>22.09.12</p>
                </div>
                <div>
                    <p>Assigned On</p>
                    <p>22.09.12</p>
                </div>
                <div>
                    <p>Target Resolution Date</p>
                    <p>22.09.12</p>
                </div>
                <div>
                    <p>Closed On</p>
                    <p>22.09.12</p>
                </div>
            </div>

        </div>
        <div class="issue-detail ">
            <div class="issue-detail-wrapper container">
                <div class="space-between">
                    <p>Issue</p>
                    <p>Issue one</p>
                </div>
                <div class="space-between">
                    <p>Project</p>
                    <p>Project number one</p>
                </div>
                <div class="space-between">
                    <p>Project Manager</p>
                    <p>P.m manager</p>
                </div>
                <div class="space-between">
                    <p>Project Lead</p>
                    <p>Lead Leaads</p>
                </div>
                <div class="space-between">
                    <p>Priority</p>
                    <p>High</p>
                </div>
                <div class="space-between">
                    <p>Timeline</p>
                    <p>overdue</p>
                </div>
            </div>
        </div>
    </div>
    </Fragment>
  )
}

Issue.propTypes = {

}

export default Issue

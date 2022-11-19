import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import IssueItem from './IssueItem'
import {getIssues} from '../../actions/issue'
import Spinner from '../layout/Spinner'

const Issues = ({getIssues,issue : {loading, issues}}) => {
    useEffect(()=>{
        
        getIssues()
    }, [getIssues])
  return loading ? <Spinner/> : <Fragment>
    <main>
      <div className='container projects'>
        <button className="btn-primary project-btn">Unassigned Issues (10)</button>
        <div className='projects-wrapper'>
            <div className="project-heading projects-grid">
                <p>Title</p>
                <p>Opened On</p>
                <p>Assinged On</p>
                <p>Assinged To</p>
                <p>Project</p>
                <p>Actions <span className="filter-btn"><i className="fa-solid fa-filter"></i></span></p>
            </div>
            <div className='project-container'>
                {!loading && issues.length > 0 ? (<Fragment>
                    {issues.map(issue => (<div key={issue._id} className='project projects-grid'><IssueItem  issue={issue}/></div>))}
                </Fragment>) : (<p>No issues available</p>)}
            </div>
        </div>

      </div>
    </main>
  </Fragment>

}

Issues.propTypes = {
    issue: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    issue: state.issue
})

export default connect(mapStateToProps, {getIssues})(Issues)

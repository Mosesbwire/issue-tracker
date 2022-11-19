import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import IssueItem from './IssueItem'
import {getIssues} from '../../actions/issue'

const Issues = ({issues}) => {
    useEffect(()=>{
        getIssues()
    }, [getIssues])
  return (
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
                {issues.map(issue => (
                    <div key={issue._id} className='project projects-grid'>
                        <IssueItem/>
                    </div> 
                ))}
            </div>
        </div>

      </div>
    </main>
  )
}

Issues.propTypes = {
    issues: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
    issues: state.issue.issues
})

export default connect(mapStateToProps, {getIssues})(Issues)

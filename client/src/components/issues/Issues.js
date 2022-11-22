import React, {Fragment, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
import IssueItem from './IssueItem'
import {getIssues} from '../../actions/issue'
import Spinner from '../layout/Spinner'

const Issues = ({getIssues,issue : {loading, issues}}) => {
    useEffect(()=>{
        
        getIssues()
    }, [getIssues])

    

    const [path , setPath ] = useState('')
    const [openFilter, setFilter] = useState(false)
    const issueStatus = ['All','Open', 'Closed', 'Unassigned']
    const [filterQuery, setFilterQuery] = useState('All')
    const [issueItems, setIssues] = useState(issues)

    useEffect(()=>{
      setIssues(()=>{
        if(filterQuery === 'All'){
          return issues
        }
        return issues.filter(issue => issue.status === filterQuery)
      })
    }, [filterQuery, issues])

    
    const closeFilter = (e) => {
      if(e.target.classList.contains('overlay') ){
          setFilter(false)
      }
    }

    const filterValues = (e)=> {
      setFilterQuery(e.target.value)
      setFilter(false)
    }

    

    
    const navigateToIssuePage = (e) => {
      if(!e.target.dataset.id){
        let id = e.target.parentElement.dataset.id
        setPath(id)
      }else if (e.target.dataset.id){
        setPath(e.target.dataset.id)
      }
    }

    
    if(path) {
      return <Navigate to={`/issue/${path}`}/>
    }
  return loading ? <Spinner/> : <Fragment>
    <main>
      <Fragment>
        { openFilter ? <div className='overlay' onClick={e => closeFilter(e)}>
            <div className='filter-container overlay-item'>
              <p>Filter By</p>
              <fieldset>
                {issueStatus.map((status,index) => (<div key={index}>
                    <div className='space-between'>
                      <label htmlFor='open'>{status}</label>
                      <input type='checkbox' value={status} name={status} onChange={e => filterValues(e)}/>
                    </div>
                </div>))}
              </fieldset>
              <button className='btn-primary'>Apply</button>
            </div>
          </div> : null}
        
      </Fragment>

      <div className='container projects'>
        <button className="btn-primary project-btn">Unassigned Issues <Fragment>{issues.filter(issue => issue.status === 'Unassigned').length}</Fragment> <i className='fa-solid fa-angle-right'></i></button>
        <div className='projects-wrapper'>
            <div className="project-heading projects-grid">
                <p>Title</p>
                <p>Opened On</p>
                <p>Assinged On</p>
                <p>Assinged To</p>
                <p>Project</p>
                <p>Actions <span className="filter-btn"><i className="fa-solid fa-filter" onClick={e => setFilter(true)}></i></span></p>

            </div>
            <div className='project-container'>
                {!loading && issues.length > 0 ? (<Fragment>
                    {issueItems.map(issue => (<div key={issue._id} data-id={issue._id} className={`project projects-grid ${issue.status}`} onClick={e => navigateToIssuePage(e)}><IssueItem  issue={issue}/></div>))}
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

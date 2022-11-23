import React, {Fragment, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
import IssueItem from './IssueItem'
import {getIssues} from '../../actions/issue'
import { getProjects } from '../../actions/project'
import Spinner from '../layout/Spinner'

const Issues = ({getIssues,getProjects,issue : {loading, issues}, project}) => {
    const [path , setPath ] = useState('')
    const [openFilter, setFilter] = useState(false)
    const issueStatus = ['Open', 'Closed', 'Unassigned']
    const [items, setItems] = useState(issues)
    const [filterParams, setFilterParams ] = useState([])
    const [selectedProject, setProject] = useState('')

    useEffect(()=>{
      
      getIssues()
    }, [getIssues])
    
    useEffect(()=>{
      
      getProjects()
    }, [getProjects])


    const filterIssues = ()=> {
      
      setFilter(false)
      let storeIssues = []
      if(selectedProject.length === 0 && filterParams.length === 0){
         return setItems(issues)
      }

      if(selectedProject.length > 0 && filterParams.length === 0){
        return setItems(()=>{
          return issues.filter(issue => issue.project._id === selectedProject)
        })
      }

      if(selectedProject.length > 0 && filterParams.length > 0){
          let arr = issues.filter(issue => issue.project._id === selectedProject)
          filterParams.forEach(param => {
            arr.forEach(item => {
              if(item.status === param){
                storeIssues.push(item)
              }
            })
          })

          return setItems(storeIssues)
      }

      if(selectedProject.length === 0 && filterParams.length > 0) {
        
        filterParams.forEach(param => {
          issues.forEach(issue => {
            if(issue.status === param){
              storeIssues.push(issue)
            }
          })
        })

        return setItems(storeIssues)
      }

    }
    
    const getParams = e => setFilterParams([...filterParams, e.target.value])
    
    const closeFilter = (e) => {
      if(e.target.classList.contains('overlay') || e.target.classList.contains('close-btn') ){
          setFilter(false)
          setFilterParams([])
          setProject('')
      }
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
                      <input type='checkbox' value={status} name={status} onChange={e => getParams(e)}/>
                    </div>
                </div>))}
                <Fragment>
                      <label>Project</label>
                      {(!project.loading || project.projects.length > 0) && (
                        
                        <select value={selectedProject} onChange={e => setProject(e.target.value)}>
                          {project.projects.map(prj => (
                            <option key={prj._id} value={prj._id}>{prj.title}</option>
                          ))}
                        </select>
                      )}
                    </Fragment>
              </fieldset>
              <button className='btn-primary close-btn' onClick={e => filterIssues()}>Apply</button>
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
                    {items.map(issue => (<div key={issue._id} data-id={issue._id} className={`project projects-grid ${issue.status}`} onClick={e => navigateToIssuePage(e)}><IssueItem  issue={issue}/></div>))}
                </Fragment>) : (<p>No issues available</p>)}
            </div>
        </div>

      </div>
    </main>
  </Fragment>

}

Issues.propTypes = {
    issue: PropTypes.object.isRequired,
    getIssues: PropTypes.func.isRequired,
    getProjects: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    issue: state.issue,
    project: state.project
})

export default connect(mapStateToProps, {getIssues, getProjects})(Issues)

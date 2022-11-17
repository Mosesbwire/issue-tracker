import React, {useEffect, Fragment} from 'react'
import PropTypes from 'prop-types'
import { useParams, Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { getProject } from '../../actions/project'
import { getUsers } from '../../actions/user'

import ProjectActions from './ProjectActions'
import ProjectMetrics from './ProjectMetrics'
import ProjectDetails from './ProjectDetails'
import ProjectMembers from './ProjectMembers'
import Spinner from '../layout/Spinner'

const Project = ({getProject, getUsers,path,project: {project, loading, members, issues}, users}) => {
    const { id } = useParams()
    useEffect(()=>{
        getProject(id)
    }, [getProject, id])

    useEffect(()=>{
      getUsers()
    }, [getUsers])

    if(path === '/projects'){
      return <Navigate to={path}/>
    }
  return project === null ? <Spinner/> : <Fragment>
    <main className='container'>
    
      <ProjectActions/>
      <ProjectMetrics issues={issues}/>
      <div className='lower-section'>
        <ProjectDetails project={project}/>
        <ProjectMembers members={members} users={users}/>
      </div>
    </main>
  </Fragment>
  
}

Project.propTypes = {
    getProject: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired,
    path: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
    project: state.project,
    users: state.user,
    path: state.redirect.path
})

export default connect(mapStateToProps, {getProject, getUsers})(Project)

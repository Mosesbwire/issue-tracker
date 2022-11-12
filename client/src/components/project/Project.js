import React, {useEffect, Fragment} from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { getProject } from '../../actions/project'
import ProjectActions from './ProjectActions'
import ProjectMetrics from './ProjectMetrics'
import ProjectDetails from './ProjectDetails'
import ProjectMembers from './ProjectMembers'
import Spinner from '../layout/Spinner'

const Project = ({getProject, project: {project, loading, members, issues}}) => {
    const { id } = useParams()
    useEffect(()=>{
        getProject(id)
    }, [getProject, id])
  return project === null ? <Spinner/> : <Fragment>
    <main className='container'>
    
      <ProjectActions/>
      <ProjectMetrics issues={issues}/>
      <div className='lower-section'>
        <ProjectDetails project={project}/>
        <ProjectMembers members={members}/>
      </div>
    </main>
  </Fragment>
  
}

Project.propTypes = {
    getProject: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    project: state.project
})

export default connect(mapStateToProps, {getProject})(Project)

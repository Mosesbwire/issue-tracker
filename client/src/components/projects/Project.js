import React, {useEffect, Fragment} from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import ProjectItem from './ProjectItem'
import { getProjects } from '../../actions/project'



const Project = ({getProjects, project:{loading, projects},user}) => {
    useEffect(()=>{
        getProjects()
    }, [getProjects])
  return loading && user === null ? <p>Loading...</p> : <Fragment>
        <main>
            <div className="projects container">
            {user.role === 'Manager' && ( <button className="btn-primary project-btn">New Project</button>)}
           
            <div className="projects-wrapper">
                    <div className="project-heading projects-grid">
                        <p>Title</p>
                        <p>Start date</p>
                        <p>Target end date</p>
                        <p>Project Manager</p>
                        <p>Project Lead</p>
                        <p>Actions</p>
                    </div>
                    <div className="project-container">
                        {projects.length === 0 ? <p>You currently have no projects</p> : <Fragment>
                            {projects.map(project => (
                                <ProjectItem key={project._id} project={project}/>
                            ))}
                            </Fragment>}
                    </div>
            </div>
            </div>
        </main>
  </Fragment>
    

}

Project.propTypes = {
    project: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    getProjects: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    project: state.project,
    user: state.auth.user
})

export default connect(mapStateToProps, {getProjects})(Project)

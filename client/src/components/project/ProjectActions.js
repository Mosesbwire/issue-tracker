import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { closeProject, deleteProject } from '../../actions/project'

const ProjectActions = ({closeProject,deleteProject, user}) => {
  const { id } = useParams()
  
  return (
    <div className="flex-container">
        <Link to='/issue/new'>
          <button className="btn-primary project-btn">Open Issue</button>
        </Link>
        {user.role ==='Manager' && (<Fragment>

          <button className="btn-primary">Edit Project</button>
          <button className="btn-primary btn-delete" onClick={e => deleteProject(id)}>Delete <i className="fa-solid fa-trash"></i></button>
          <p onClick={e =>closeProject(id)}>Close Project</p>
        </Fragment>)}
    </div>
  )
}

ProjectActions.propTypes = {
  deleteProject : PropTypes.func.isRequired,
  closeProject: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,

}

const mapStateToProps = state => ({
  user: state.auth.user
})



export default connect(mapStateToProps, {deleteProject, closeProject})(ProjectActions)

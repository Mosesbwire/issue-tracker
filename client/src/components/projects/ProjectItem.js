import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { deleteProject } from '../../actions/project'

const ProjectItems = ({deleteProject, auth: {loading , user}, project: {_id,title, startDate, targetEndDate, createdBy, projectLead}}) => {
  return !loading && user !== null && (<Fragment>
        <Link to={`/project/${_id}`}>
            <div className="project projects-grid">
                <p>{title}</p>
                <p><Moment format= 'YYYY/MM/DD'>{startDate}</Moment></p>
                <p><Moment format='YYYY/MM/DD'>{targetEndDate}</Moment></p>
                {createdBy === undefined ? <p>Admin</p> : (<p>{createdBy.firstname}</p>)}
                {projectLead === undefined ? <p>Admin</p> : (<p>{projectLead.firstname}</p>)}
                {createdBy !== undefined && createdBy._id === user._id && (
                    <div className="project-actions">
                        <i className="fa-solid fa-trash"></i>
                        <Link to={`/project/edit/${_id}`}>
                            <i className="fa-solid fa-pencil" ></i>
                        </Link>
                    </div>
                )}  
            </div>
        </Link>
    </Fragment>)
  
}

ProjectItems.propTypes = {
    deleteProject: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {deleteProject})(ProjectItems)

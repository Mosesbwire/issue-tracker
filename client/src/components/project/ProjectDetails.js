import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProjectDetails = ({project}) => {
  return (
    <div className="full-description">
        <div className="project-timeline space-between">
            <div>
                <p>Start Date</p>
                <p><Moment format='YYYY/MM/DD'>{project.startDate}</Moment></p>
            </div>
            <div>
                <p>Target End Date</p>
                <p><Moment format='YYYY/MM/DD'>{project.targetEndDate}</Moment></p>
            </div>
        </div>
        <div className="project-identifier">
            <p>Title</p>
            <p>{project.title}</p>
        </div>
        <div className="project-identifier">
            <p>{project.description}</p>
            <p className="project-description">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos eos voluptas rerum culpa ducimus, neque fuga doloremque praesentium ipsa, porro amet nobis sapiente earum quia, cum facere consequatur asperiores aspernatur. Quod velit atque, voluptas dolor facilis consequatur adipisci quo deserunt aliquam nisi dignissimos illum reprehenderit, iure vitae sit esse quos tempore! Adipisci blanditiis maiores debitis inventore ipsa pariatur libero rerum laborum ab itaque, quia aperiam aliquam sunt laudantium corporis eaque.</p>
        </div>
        <div className="owners">
            <div className="space-between">
                <p>Project Manager</p>
                {project.createdBy ?  <p>{project.createdBy.firstname}</p> : <p>Admin</p>  }
            </div>
            <div className="space-between">
                <p>Project Lead</p>
                {project.projectLead ?  <p>{project.projectLead.firstname}</p> : <p>Admin</p>  }
                 
            </div>
            <div className="space-between">
                <p>Members</p>
                <p>{project.members.length}</p>
            </div>
        </div>
    </div>
  )
}

ProjectDetails.propTypes = {
    project: PropTypes.object.isRequired,
}

export default ProjectDetails

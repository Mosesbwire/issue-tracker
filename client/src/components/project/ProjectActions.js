import React from 'react'
import { Link } from 'react-router-dom'

const ProjectActions = () => {
  return (
    <div className="flex-container">
        <button className="btn-primary project-btn">Open Issue</button>
        <button className="btn-primary">Edit Project</button>
        <button className="btn-primary btn-delete">Delete <i className="fa-solid fa-trash"></i></button>
    </div>
  )
}

export default ProjectActions

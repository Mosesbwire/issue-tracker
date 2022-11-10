import { GET_PROJECT, GET_PROJECTS, PROJECT_ERROR, CREATE_PROJECT, UPDATE_PROJECT, DELETE_PROJECT } from './types';
import { setAlert } from './alert'
import axios from 'axios';

export const getProjects = () => async dispatch => {
    try {
        const res = await axios.get('/api/project')
        
        dispatch ({
            type: GET_PROJECTS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROJECT_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const getProject = (id)=> async dispatch => {
    try {
        const res = await axios.get(`/api/project/${id}`)

        dispatch({
            type: GET_PROJECT,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROJECT_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const createProject = (formData)=> async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.post('/api/project', formData, config)

        dispatch({
            type: CREATE_PROJECT,
            payload: res.data
        })

        dispatch(setAlert('Project was successfully created.', 'success'))
    } catch (err) {
        const errors = err.response.data.errors
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: PROJECT_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const addProjectMembers = (formData, projectId)=> async dispatch => {
    const config = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }

    try {
        const res = await axios.put(`/api/project/addMembers/${projectId}`, formData, config)
        dispatch({
            type: UPDATE_PROJECT,
            payload: res.data
        })

        dispatch(setAlert('Members successfully added to project.', 'success'))
    } catch (err) {

        const errors = err.response.data.errors
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }

        dispatch({
            type: PROJECT_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}
export const removeProjectMembers = (formData, projectId)=> async dispatch => {
    const config = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }

    try {
        const res = await axios.put(`/api/project/removeMembers/${projectId}`, formData, config)
        dispatch({
            type: UPDATE_PROJECT,
            payload: res.data
        })

        dispatch(setAlert('Members removed from project', 'success'))
    } catch (err) {

        const errors = err.response.data.errors
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }

        dispatch({
            type: PROJECT_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const assignProjectLead = (formData, projectId) => async dispatch=> {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.put(`/api/project/assignlead/${projectId}`, formData, config)

        dispatch({
            type: UPDATE_PROJECT,
            payload: res.data
        })

        dispatch(setAlert('Project Lead added', 'success'))

    } catch (err) {
        const errors = err.response.data.errors
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }

        dispatch({
            type: PROJECT_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const editProject = (formData, projectId) => async dispatch=> {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.put(`/api/project/edit/${projectId}`, formData, config)
        dispatch({
            type: UPDATE_PROJECT,
            payload: res.data
        })

        dispatch(setAlert('Project successfully updated', 'success'))

    } catch (err) {
        const errors = err.response.data.errors
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }

        dispatch({
            type: PROJECT_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const closeProject = (projectId) => async dispatch => {
    try {
        const res = await axios.put(`/api/project/close/${projectId}`)
        dispatch({
            type: UPDATE_PROJECT,
            payload: res.data
        })

        dispatch(setAlert('Project successfully closed', 'success'))
    } catch (err) {
        dispatch({
            type: PROJECT_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const deleteProject = (projectId) => async dispatch => {
    if(window.confirm('Are you sure? This process cannot be undone.')){
        try {
            const res = await axios.delete(`/api/project/delete/${projectId}`)
            dispatch({
                type: DELETE_PROJECT,
                payload: res.data
            })

            dispatch(setAlert('Project removed.', 'success'))
        } catch (err) {
            dispatch({
                type: PROJECT_ERROR,
                payload: {msg: err.response.statusText, status: err.response.status}
            })
        }
    }
}
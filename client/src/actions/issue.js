import {CREATE_ISSUE, ISSUE_ERROR, GET_ISSUES} from './types'
import axios from 'axios'
import { setAlert } from './alert'
import { redirect } from './redirect'

export const createIssue = (formData, projectId) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        
        const res = await axios.post(`/api/issue/${projectId}`, formData, config)
        dispatch({
            type: CREATE_ISSUE,
            payload: res.data
        })

        dispatch(redirect(`/issue/${res.data._id}`))

        dispatch(setAlert('Issue opened', 'success'))
        
    } catch (err) {
        const errors = err.response.data.errors
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }

        dispatch({
            type: ISSUE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const getIssues = ()=> async dispatch => {
    try {
        const res = await axios.get('/api/issue')
        
        dispatch({
            type: GET_ISSUES,
            payload: res.data
        })
        
    } catch (err) {
        dispatch({
            type: ISSUE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}
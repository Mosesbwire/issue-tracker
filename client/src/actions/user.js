import {GET_USER, GET_USERS, UPDATE_USER, CREATE_USER, DELETE_USER, CLEAR_USER,USER_ERROR} from './types'
import {setAlert} from './alert'
import axios from 'axios'

export const createUser = (formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.post('api/users',formData, config)

        dispatch({
            type: CREATE_USER,
            payload: res.data
        })

        dispatch(setAlert('User successfully created.' , 'success'))
    } catch (err) {
        const errors = err.response.data.errors
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: USER_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const getUsers = ()=> async dispatch => {
    try {
        const res = await axios.get('api/users')
        dispatch({
            type: GET_USERS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: USER_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const getUser = (userId)=> async dispatch => {
    try {
        const res = await axios.get(`api/users/${userId}`)
        dispatch({
            type: GET_USER,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: USER_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const editUser = (formData, userId) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.put(`api/users/${userId}`, formData, config)
        dispatch({
            type: UPDATE_USER,
            payload: res.data
        })
        
    } catch (err) {
        const errors = err.response.data.errors
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }

        dispatch({
            type: USER_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const deleteUser = (userId) => async dispatch => {
    try {
        const res = await axios.delete(`api/users/delete/${userId}`)

        dispatch({
            type: DELETE_USER,
            payload: userId
        })
        
    } catch (err) {
        dispatch({
            type: USER_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}
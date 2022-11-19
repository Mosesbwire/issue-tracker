import axios from 'axios'
import setAuthToken from '../utils/setAuthToken';
import { setAlert } from './alert'
import { redirect } from './redirect'
import { LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, AUTH_ERROR, USER_LOADED, RESET_PASSWORD_FAIL, RESET_PASSWORD_SUCCESS } from "./types";

export const loadUser = ()=> async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token)
    }

    try {
        const res = await axios.get('/api/auth')
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

export const login = ({email, password})=> async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({email,password})

    try {
        const res = await axios.post('/api/auth', body, config)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })

        dispatch(loadUser())
        dispatch(redirect('/dashboard'))
        
    } catch (err) {
        const errors = err.response.data.errors

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }

        dispatch({
            type: LOGIN_FAIL
        })
        
    }

}

export const logout = ()=> dispatch=> {
    dispatch({
        type: LOGOUT
    })
}

export const resetPassword = (email)=> async dispatch=> {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({email})

    try {
        const res = await axios.post('/api/auth/reset', body, config)
        
        dispatch(setAlert(`Check your inbox for reset link`, 'success'))
    } catch (err) {
        const errors = err.response.data.errors
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }

        dispatch({
            type: RESET_PASSWORD_FAIL
        })
    }
}

export const setNewPassword = (password)=> async dispatch=> {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({password})

    try {
        const res = await axios.post()
    } catch (err) {
        
    }
}

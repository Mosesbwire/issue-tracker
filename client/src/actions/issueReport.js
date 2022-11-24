import {GET_ISSUE_REPORT, GET_ISSUE_REPORT_ERROR } from './types'
import axios from 'axios'

export const barChartData = ()=> async dispatch => {
    try {

        const res = await axios.get('/api/issuereport')

        dispatch({
            type: GET_ISSUE_REPORT,
            payload: res.data
        })
        
    } catch (err) {
        dispatch({
            type: GET_ISSUE_REPORT_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}
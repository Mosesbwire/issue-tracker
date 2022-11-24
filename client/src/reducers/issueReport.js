import {GET_ISSUE_REPORT, GET_ISSUE_REPORT_ERROR } from '../actions/types'

const initialState = {
    report : null,
    loading: true,
    errors: {}
}

export default function (state = initialState, action){
    const { type, payload } = action

    switch (type) {
        case GET_ISSUE_REPORT:
            return {
                ...state,
                loading: false,
                report: payload
            }
        case GET_ISSUE_REPORT_ERROR:
            return {
                ...state,
                loading: false,
                errors: payload
            }
        default: 
            return state

    }
}
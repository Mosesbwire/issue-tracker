import {CREATE_ISSUE, ISSUE_ERROR, GET_ISSUES, GET_ISSUE} from '../actions/types'

const initialState = {
    issue: null,
    issues: [],
    loading: true,
    isCreated: false,
    errors: {}

}

export default function(state = initialState, action){
    const {type, payload } = action

    switch (type) {
        case CREATE_ISSUE:
            
            return {
                ...state,
                issue: payload,
                issues: [payload, ...state.issues],
                loading: false,
                isCreated: true
            }
        case GET_ISSUES:
            return {
                ...state,
                issues: payload,
                loading: false
            }
        case GET_ISSUE:
            return {
                ...state,
                loading: false,
                issue: payload
            }

        case ISSUE_ERROR:
            return {
                issue: null,
                issues: [],
                loading: false,
                errors: payload
            }
    
        default:
            return state;
    }
}


import {
    GET_PROJECT,
    GET_PROJECTS,
    CREATE_PROJECT,
    UPDATE_PROJECT,
    DELETE_PROJECT,
    PROJECT_ERROR,
    CLEAR_PROJECT
} from '../actions/types'

const initialState = {
    project: null,
    projects: [],
    loading: true,
    members: [],
    issues: [],
    error: {},
    isCreated: false
}


export default function(state = initialState, action){
    const {type, payload } = action
    
    switch (type) {
        case GET_PROJECT:
        case UPDATE_PROJECT:
            return {
                ...state,
                loading: false,
                project: payload,
                members: payload.members,
                issues: payload.issues
            }
        case GET_PROJECTS:
           
            return {
                ...state,
                projects: payload,
                loading: false
            }
        case PROJECT_ERROR:
            return {
                ...state,
                loading: false,
                error: payload
            }
        case CREATE_PROJECT:
            return {
                ...state,
                project: payload,
                projects: [payload,...state.projects],
                loading: false,
                isCreated: true
            }
        case CLEAR_PROJECT:
            return {
                ...state,
                project: null
            }
        case DELETE_PROJECT:
            return {
                ...state,
                projects: state.projects.filter(project => project._id !== payload ),
                loading: false
            }
    
        default:
            return state;
    }
}
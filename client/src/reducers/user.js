import {
    GET_USER,
    GET_USERS,
    CREATE_USER,
    DELETE_USER,
    UPDATE_USER,
    USER_ERROR,
    CLEAR_USER
} from '../actions/types'

const initialState = {
    user: null,
    users: [],
    loading: true,
    isCreated: false,
    error: {}
}

export default function (state = initialState, action){
    const {type, payload } = action

    switch (type) {
        case GET_USERS:
            
            return {
                ...state,
                users: payload,
                loading: false
            }
        case GET_USER:
        case UPDATE_USER:
            return {
                ...state,
                user: payload,
                loading: false
            }
        case CREATE_USER: 
            return {
                ...state,
                user: payload,
                users: [payload, ...state.projects],
                loading: false,
                isCreated: true
            }
        case DELETE_USER: 
            return {
                ...state,
                user: null,
                users: state.users.filter(user => user._id !== payload),
                loading: false
            }
        case USER_ERROR:
            return {
                ...state,
                loading: false,
                error: payload
            }
        case CLEAR_USER: 
            return {
                ...state,
                user: null
            }
        default:
            return state;
    }
}
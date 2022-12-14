import { REDIRECT } from "../actions/types";

const initialState = {
    path: ''
}

export default function(state = initialState, action){  

    switch (action.type) {
        case REDIRECT:
            
            return {
                ...state,
                path: action.payload
            }
        default:
            return state;
    }

}
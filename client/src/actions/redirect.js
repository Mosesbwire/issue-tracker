import { REDIRECT} from "./types";

export const redirect = link => dispatch => {
    dispatch({
        type: REDIRECT,
        payload: link
    })
}

import { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'
import project from './project'
import user from './user'

export default combineReducers({alert, auth, project, user})
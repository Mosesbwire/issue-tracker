import { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'
import project from './project'
import user from './user'
import redirect from './redirect'
import issue from './issue'
import issueReport from './issueReport'

export default combineReducers({alert, auth, project, user, redirect, issue, issueReport})
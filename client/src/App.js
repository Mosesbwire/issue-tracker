import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import './App.css';
import  {store, persistor} from './store'

import { loadUser } from './actions/auth'
import setAuthToken from './utils/setAuthToken'
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Login from './components/auth/Login';
import PrivateRoute from './components/routing/PrivateRoute';
import AuthorizedRoute from './components/routing/AuthorizedRoute';
import ResetPassword from './components/auth/ResetPassword';
import SetPassword from './components/auth/SetPassword';
import Dashboard from './components/dashboard/Dashboard';
import Projects from './components/projects/Projects';
import Project from './components/project/Project'
import ProjectForm from './components/projects/ProjectForm'
import Users from './components/users/Users';
import UserForm from './components/users/UserForm';
import IssueForm from './components/issues/IssueForm';
import Issue from './components/issue/Issue'
import Issues from './components/issues/Issues';

if(localStorage.token){
  setAuthToken(localStorage.token)
}

const App = ()=> {
  useEffect(()=>{
    store.dispatch(loadUser())
  }, [])
  return (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <Fragment>
          <Navbar/>
          <Alert/>
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/reset-password' element={<ResetPassword/>}/>
            <Route path= '/set-password' element={<SetPassword/>}/>
            <Route path= '/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
            <Route path= '/projects' element={<PrivateRoute><Projects/></PrivateRoute>}/>
            <Route path= '/project/new' element={<AuthorizedRoute><ProjectForm/></AuthorizedRoute>}/>
            <Route path= '/project/:id' element={<PrivateRoute><Project/></PrivateRoute>}/>
            <Route path= '/users' element={<PrivateRoute><Users/></PrivateRoute>}/>
            <Route path= '/users/new' element={<AuthorizedRoute><UserForm/></AuthorizedRoute>}/>
            <Route path= '/issue/new' element={<PrivateRoute><IssueForm/></PrivateRoute>}/>
            <Route path= '/issue/:id' element={<PrivateRoute><Issue/></PrivateRoute>}/>
            <Route path= '/issues' element={<PrivateRoute><Issues/></PrivateRoute>}/>
          </Routes>
        </Fragment>
      </Router>
    </PersistGate>
  </Provider>

)}


export default App;

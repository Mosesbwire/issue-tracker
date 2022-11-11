import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux';
import './App.css';
import store from './store'
import { loadUser } from './actions/auth'
import setAuthToken from './utils/setAuthToken'
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Login from './components/auth/Login';
import ResetPassword from './components/auth/ResetPassword';
import SetPassword from './components/auth/SetPassword';
import Dashboard from './components/dashboard/Dashboard';
import Projects from './components/projects/Projects';
import Project from './components/project/Project'
import ProjectForm from './components/projects/ProjectForm'

if(localStorage.token){
  setAuthToken(localStorage.token)
}

const App = ()=> {
  useEffect(()=>{
    store.dispatch(loadUser())
  }, [])
  return (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar/>
        <Alert/>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/reset-password' element={<ResetPassword/>}/>
          <Route path= '/set-password' element={<SetPassword/>}/>
          <Route path= '/dashboard' element={<Dashboard/>}/>
          <Route path= '/projects' element={<Projects/>}/>
          <Route path= '/project/new' element={<ProjectForm/>}/>
          <Route path= '/project/:id' element={<Project/>}/>

        </Routes>
      </Fragment>
    </Router>
  </Provider>

)}


export default App;

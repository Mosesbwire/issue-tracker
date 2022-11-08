import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import ResetPassword from './components/auth/ResetPassword';
import SetPassword from './components/auth/SetPassword';

const App = ()=> 
  <Router>
    <Fragment>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/reset-password' element={<ResetPassword/>}/>
        <Route path= '/set-password' element={<SetPassword/>}/>
      </Routes>
    </Fragment>
  </Router>


export default App;

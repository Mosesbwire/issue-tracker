import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux';
import './App.css';
import store from './store'
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Login from './components/auth/Login';
import ResetPassword from './components/auth/ResetPassword';
import SetPassword from './components/auth/SetPassword';



const App = ()=> 
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar/>
        <Alert/>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/reset-password' element={<ResetPassword/>}/>
          <Route path= '/set-password' element={<SetPassword/>}/>
        </Routes>
      </Fragment>
    </Router>
  </Provider>


export default App;

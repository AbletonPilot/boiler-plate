import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
import Auth from './hoc/auth';


function App() {
  
  return (
    <Router>
      <div>
        <Routes>
        <Route exact path="/" element = {Auth(LandingPage, null)}/>
        <Route exact path="/login" element = {Auth(LoginPage, null)}/>
        <Route exact path="/register" element = {Auth(RegisterPage, null)}/>
        </Routes>
      </div>
    </Router>
  );
}


export default App;

import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
 } from "react-router-dom";
 import Home from './components/Home';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import Login from './components/Login';
import Logout from './components/Logout';
import React, { useContext, useState } from 'react';

export const AuthContext = React.createContext(null);
function App() {
  const [authContext, setAuthContext] = useState(localStorage.getItem("token"));
  return (
    <AuthContext.Provider value={[authContext, setAuthContext]}>
      <Router>
        <div className="App">
            <Navbar />
            <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path='/Perfil' element={<Profile/>} />
          <Route path='/Login' element={<Login/>} />
          <Route path='/Logout' element={<Logout/>} />
        </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
 }

export default App;

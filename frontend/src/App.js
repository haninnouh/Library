import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Authors from './Authors';
import AuthDetails from "./AuthDetails";
import Signup from './Signup'
import Signin from './Signin'
import Navigation from "./Navigation";
function App() {
  return (
    <div className="App">
      <Navigation/>
      <Routes>
      <Route
          exact path="/"
          element={<Authors  />}
        />
        <Route
          path="/AuthDetails/:id" 
          element={<AuthDetails  />}
        />
        <Route
          path="/Signup" 
          element={<Signup />}
        />
        <Route
          path="/Signin" 
          element={<Signin />}
        />
      </Routes>
    </div>
  );
}

export default App;

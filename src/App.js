import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home.js";

import SignUp from "./components/SignUp.js";
import Login from "./components/Login.js";
import Completed from "./components/Completed.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/completed" element={<Completed />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

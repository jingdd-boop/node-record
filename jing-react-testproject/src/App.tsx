import React from 'react';
import './App.css';
import {Route, Routes } from 'react-router-dom' //引入react-router
import About from './About';
import Home from './Home';
import TestPage from './TestPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TestPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/home" element={<Home />}  />
      </Routes>
    </div>
  );
}

export default App;

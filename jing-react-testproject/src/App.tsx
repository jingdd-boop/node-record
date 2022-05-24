import React from 'react';
import './App.css';
import {Route, Routes } from 'react-router-dom' //引入react-router
import About from './page/About';
import Home from './page/Home';
import ShopPage from './page/ShopPage'
import TestPage from './page/TestPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TestPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/home" element={<Home />}  />
        <Route path="/shopPage" element={<ShopPage />}  />
      </Routes>
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
        </header>
      </div>
      <Routes>
      <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes /* Route */ } from 'react-router-dom';
import { HomePage } from 'pages/HomePage/HomePage';

function App() {
  return (
    <Router>
      <div>
        <HomePage />
        <Routes></Routes>
      </div>
    </Router>
  );
}

export default App;

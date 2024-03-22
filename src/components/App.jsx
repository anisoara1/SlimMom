import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from 'pages/HomePage/HomePage';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { RegisterPage } from 'pages/RegisterPage/RegisterPage';
import { CalculatorPage } from 'pages/CalculatorPage/CalculatorPage';
import { DiaryPage } from 'pages/DiaryPage/DiaryPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/SlimMom" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/calc" element={<CalculatorPage />} />
        <Route path="/diary" element={<DiaryPage />} />
      </Routes>
    </div>
  );
}

export default App;

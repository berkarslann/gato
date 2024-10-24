import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/dashboard/dashboard';
import HomePage from './pages/home/home';


const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<DashboardPage />} />

    </Routes>
  );
}

export default App;

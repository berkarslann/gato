import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProjectPage from './pages/project/project';
import HomePage from './pages/home/home';
import DashboardPage from './pages/dashboard/dashboard';


const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:projectId" element={<ProjectPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />


    </Routes>
  );
}

export default App;

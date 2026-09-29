import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import ProtectedRoute from './components/ProtectedRoute';
import AppLayout from './components/layout/AppLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import RoadmapPage from './pages/RoadmapPage';
import Progress from './pages/Progress';
import LearningModulePage from './pages/LearningModulePage';
import ExercisePage from './pages/ExercisePage';
import SettingsPage from './pages/SettingsPage';
import ReviewPage from './pages/ReviewPage';

function AppRoutes() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout searchQuery={searchQuery} onSearchChange={setSearchQuery} />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/learning/:moduleId" element={<LearningModulePage />} />
          <Route path="/learning/day-:dayId/exercise/:exerciseId" element={<ExercisePage />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Route>
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
          <AppRoutes />
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

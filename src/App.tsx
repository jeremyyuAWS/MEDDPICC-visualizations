import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AuthGuard from './components/auth/AuthGuard';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AdminPage from './pages/AdminPage';
import ProfilePage from './pages/ProfilePage';
import HistoryPage from './pages/HistoryPage';
import AnalysisPage from './pages/AnalysisPage';
import HubSpotCallbackPage from './pages/HubSpotCallbackPage';
import HubSpotSettingsPage from './pages/HubSpotSettingsPage';
import VisualizationPage from './pages/VisualizationPage';
import DemoModeListener from './components/dashboard/DemoModeListener';

function App() {
  return (
    <AuthProvider>
      <Router>
        <DemoModeListener />
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/hubspot-callback" element={<HubSpotCallbackPage />} />
          
          {/* Protected routes */}
          <Route path="/" element={
            <AuthGuard>
              <DashboardPage />
            </AuthGuard>
          } />
          <Route path="/admin" element={
            <AuthGuard>
              <AdminPage />
            </AuthGuard>
          } />
          <Route path="/profile" element={
            <AuthGuard>
              <ProfilePage />
            </AuthGuard>
          } />
          <Route path="/history" element={
            <AuthGuard>
              <HistoryPage />
            </AuthGuard>
          } />
          <Route path="/analysis/:id" element={
            <AuthGuard>
              <AnalysisPage />
            </AuthGuard>
          } />
          <Route path="/hubspot-settings" element={
            <AuthGuard>
              <HubSpotSettingsPage />
            </AuthGuard>
          } />
          <Route path="/visualization" element={
            <AuthGuard>
              <VisualizationPage />
            </AuthGuard>
          } />
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
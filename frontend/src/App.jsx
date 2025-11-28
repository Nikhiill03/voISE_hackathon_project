import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import Pages
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import SignUpPage from './SignUppage';
import HospitalDashboard from './HospitalDashboard';
import PatientDashboard from './PatientDashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login/:userType" element={<LoginPage />} />
        <Route path="/signup/:userType" element={<SignUpPage />} />

        {/* Dashboards */}
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/hospital-dashboard" element={<HospitalDashboard />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
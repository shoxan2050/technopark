import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { AdminPage } from './pages/AdminPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';

/* ─── Root redirect: if already logged in, skip landing → dashboard ─── */
const RootRoute: React.FC = () => {
  const { currentUser, loading } = useAuth();
  if (loading) return null; // ProtectedRoute handles its own loading screen
  if (currentUser) return <Navigate replace to="/dashboard" />;
  return <LandingPage />;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Public landing — auto-redirects logged-in users to /dashboard */}
      <Route path="/" element={<RootRoute />} />

      {/* Resident Dashboard — requires auth */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      {/* Admin Panel — requires auth + admin role */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminPage />
          </ProtectedRoute>
        }
      />

      {/* Catch-all: send to root */}
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <AppRoutes />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

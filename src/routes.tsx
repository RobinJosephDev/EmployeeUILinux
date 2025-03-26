import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import ProtectedRoute from './components/common/ProtectedRoute';
import UserProvider from './UserProvider';

const LoginPage = lazy(() => import('./pages/Auth/LoginPage'));
const LeadsPage = lazy(() => import('./pages/CRM/LeadsPage'));
const LeadFollowupPage = lazy(() => import('./pages/CRM/LeadFollowupPage'));

const AppRoutes: React.FC = () => (
  <UserProvider>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <LeadsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lead"
          element={
            <ProtectedRoute>
              <LeadsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/follow-up"
          element={
            <ProtectedRoute>
              <LeadFollowupPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  </UserProvider>
);

export default AppRoutes;

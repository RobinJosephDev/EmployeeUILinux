import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import PrivateRoute from './components/common/PrivateRoute';
import UserProvider from './UserProvider';

const LoginPage = lazy(() => import('./pages/Auth/LoginPage'));
const Logout = lazy(() => import('./pages/Auth/Logout'));
const LeadsPage = lazy(() => import('./pages/CRM/LeadsPage'));
const LeadFollowupPage = lazy(() => import('./pages/CRM/LeadFollowupPage'));

const AppRoutes: React.FC = () => (
  <UserProvider>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Auth */}

        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<Logout />} />

        {/* Lead */}

        <Route
          path="/lead"
          element={
            <PrivateRoute>
              <LeadsPage />
            </PrivateRoute>
          }
        />

        {/* Follow-up */}

        <Route
          path="/follow-up"
          element={
            <PrivateRoute>
              <LeadFollowupPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Suspense>
  </UserProvider>
);

export default AppRoutes;

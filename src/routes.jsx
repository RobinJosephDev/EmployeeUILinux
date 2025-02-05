import { Route, Routes } from "react-router-dom";

import LoginPage from "./pages/Auth/LoginPage";

import LeadsPage from "./pages/CRM/LeadsPage";

import LeadFollowupPage from "./pages/CRM/LeadFollowupPage";
import AddLeadFollowupForm from "./components/CRM/AddFollowup/AddLeadFollowupForm";
import EditLeadFollowupForm from "./components/CRM/EditFollowup/EditLeadFollowupForm";

import PrivateRoute from "./components/common/PrivateRoute";
import UserProvider from "./UserProvider";

const AppRoutes = () => (
  <UserProvider>
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <LeadsPage />
          </PrivateRoute>
        }
      />

      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/follow-up"
        element={
          <PrivateRoute>
            <LeadFollowupPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/follow-up/add-follow-up"
        element={
          <PrivateRoute>
            <AddLeadFollowupForm />
          </PrivateRoute>
        }
      />
      <Route
        path="/follow-up/:id"
        element={
          <PrivateRoute>
            <EditLeadFollowupForm />
          </PrivateRoute>
        }
      />

      <Route
        path="/emp_lead"
        element={
          <PrivateRoute>
            <LeadsPage />
          </PrivateRoute>
        }
      />
    </Routes>
  </UserProvider>
);

export default AppRoutes;

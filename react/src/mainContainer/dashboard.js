import React, { lazy, Suspense } from "react";
import Container from '@mui/material/Container';
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../shared/utils/protectedRoute";
import { CircularProgress } from "@mui/material";

const DashboardComponent = lazy(() => import("../components/dashboardComponent"));
const FormComponent = lazy(() => import("../components/formComponent"));
const CreateDynamicForms = lazy(() => import("../components/createDynamicForms"));
// const ProfileComponent = lazy(() => import("../components/profileComponent"));
// const LoginComponent = lazy(() => import("../components/user_creation/login"));
// const RegisterComponent = lazy(() => import("../components/user_creation/register"));

function Dashboard() {
  return (
    <>
      <Container className="main-content" style={{ padding: '70px 0' }}>
        <Suspense fallback={<><CircularProgress className="centered" /></>}>
          <Routes>
            <Route path="/dashboard" element={<DashboardComponent />} />
            <Route path="/forms" element={<FormComponent />} />
            <Route path="/forms/createDynamicForms" element={<CreateDynamicForms />} />
            {/* <Route path="/profile/:id" element={<ProtectedRoute><ProfileComponent /></ProtectedRoute>} /> */}
            {/* <Route path="/login" element={<LoginComponent />} /> */}
            {/* <Route path="/register" element={<RegisterComponent />} /> */}
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </Suspense>
      </Container>
    </>
  );
}

export default Dashboard;
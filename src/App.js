import React, { useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Assets from "./pages/Assets";
import Maintenance from "./pages/Maintenance";
import Lease from "./pages/Lease";
import Telematics from "./pages/Telematics";
import Operator from "./pages/Operator";
import Settings from "./pages/Settings";
import Login from "./Authentication/Login";
import Signup from "./Authentication/Signup";
import { LoaderContextProvider } from "./Context/LoaderContext";
import { NavbarContextProvider } from "./Context/NavbarContext";
import { PermissionContext } from "./Context/PermissionsContext";
import { ChangePassword } from "./pages/ChangePassword";
import { Successful } from "./pages/Successful";
import { UpdateEmployee } from "./components/Modals/UpdateEmployee";
import SuperadminRoutes from "./pages/Superadmin/SuperadminRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient()


function App() {
  const [pageNum, setPageNum] = useState(1);
  const [perms, setPerms] = useContext(PermissionContext);

  const [activeTab, setActiveTab] = useState(1);
  useEffect(() => {
    setPageNum(1);
    setActiveTab(1);
  }, []);

  useEffect(() => {
    let getPermissionsFromSession = JSON.parse(
      sessionStorage.getItem("permissions")
    );
    setPerms(getPermissionsFromSession);
  }, []);

  return (
   <QueryClientProvider client={queryClient}>
     <LoaderContextProvider>
      <NavbarContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/assets/*" element={<Assets />} />
            <Route path="/maintenance/*" element={<Maintenance />} />
            <Route path="/lease/*" element={<Lease />} />
            <Route path="/telematics/*" element={<Telematics />} />
            <Route path="/operators/*" element={<Operator />} />
            <Route path="/settings/*" element={<Settings />} />
            <Route path="/changePassword" element={<ChangePassword />} />
            <Route path="/Successful" element={<Successful />} />
            <Route path="/superadmin/*" element={<SuperadminRoutes />} />
          </Routes>
        </Router>
      </NavbarContextProvider>
    </LoaderContextProvider>
   </QueryClientProvider>
  );
}

export default App;

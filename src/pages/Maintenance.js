import React, { useContext, useEffect, useState } from "react";
import NewMaintenance from "../components/Modals/NewMaintenance/NewMaintenance";
import { useNavigate } from "react-router-dom";
import UpdateMaintenance from "../components/Modals/UpdateManitenance";
import MaintenanceDetails from "../components/Modals/MaintenanceDetails";
import MaintenanceTable from "../components/tables/MaintenanceTable/MaintenanceTable";
import { setBaseUrl } from "../config";
import axios from "axios";
import { NavbarContext } from "../Context/NavbarContext";
import Layout from "../components/Layout";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { PermissionContext } from "../Context/PermissionsContext";

function Maintenance() {
  const [perms, setPerms] = useContext(PermissionContext)
  const navigate = useNavigate();
  const [navState, setNavState] = useContext(NavbarContext);

  useEffect(() => {
    if (sessionStorage.getItem("asset_tracker_logged_in") !== "true") {
      navigate("/login");
    }
    setNavState(3);
  }, []);
  useEffect(() => {
    
    let getPermissionsFromSession = JSON.parse(sessionStorage.getItem("permissions"));
    setPerms(getPermissionsFromSession);
  },[])
  return (
    <Layout>
      <div class="tabList" id="tab-maintenance">
        <div id="main-maintenance" class="block">
          <Routes>
            <Route
              path="/"
              element={<MaintenanceTable />}
            />
            <Route path="/new-maintenance" element={<NewMaintenance />} />
            <Route
              path="/update-maintenance/:id"
              element={<UpdateMaintenance />}
            />
            <Route
              path="/maintenaneDetails/:id"
              element={<MaintenanceDetails  />}
            />
          </Routes>
        </div>
      </div>
    </Layout>
  );
}

export default Maintenance;

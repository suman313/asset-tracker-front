import React, { useContext, useEffect, useState } from "react";
import NewLease from "../components/Modals/NewLease/NewLease";
import LeaseDetails from "../components/Modals/LeaseDetails/LeaseDetails";
import UpdateLease from "../components/Modals/UpdateLease";
import { useNavigate } from "react-router-dom";
import LeaseTable from "../components/tables/LeaseTable/LeaseTable";
import { NavbarContext } from "../Context/NavbarContext";
import Layout from "../components/Layout";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { PermissionContext } from "../Context/PermissionsContext";
import { assets, create } from "../utils/useAuthorities";

function Lease() {
  const [perms, setPerms] = useContext(PermissionContext);
  const navigate = useNavigate();
  const [navState, setNavState] = useContext(NavbarContext);
  const [showCurrentTab, setShowCurrentTab] = useState(1);
  const [idForSpecificLease, setIdForSpecificLease] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("asset_tracker_logged_in") !== "true") {
      navigate("/login");
    }
    // assets();
    setNavState(4);
  }, []);

  useEffect(() => {
    let getPermissionsFromSession = JSON.parse(
      sessionStorage.getItem("permissions")
    );
    setPerms(getPermissionsFromSession);
  }, []);
  return (
    <Layout>
      <div class="tabList" id="tab-lease">
        <div id="main-lease" class="block">
          <Routes>
            <Route
              path="/"
              element={
                <LeaseTable
                  tabNo={showCurrentTab}
                  setTabNo={setShowCurrentTab}
                  leaseId={idForSpecificLease}
                  setLeaseId={setIdForSpecificLease}
                />
              }
            />
            <Route
              path="/newLease"
              element={
                <NewLease
                  tabNo={showCurrentTab}
                  setTabNo={setShowCurrentTab}
                  leaseId={idForSpecificLease}
                  setLeaseId={setIdForSpecificLease}
                />
              }
            />
            <Route
              path="/leaseDetails/:id"
              element={
                <LeaseDetails
                  tabNo={showCurrentTab}
                  setTabNo={setShowCurrentTab}
                  leaseId={idForSpecificLease}
                  setLeaseId={setIdForSpecificLease}
                />
              }
            />
            <Route
              path="/leaseUpdate/:id"
              element={
                <UpdateLease
                  tabNo={showCurrentTab}
                  setTabNo={setShowCurrentTab}
                  leaseId={idForSpecificLease}
                  setLeaseId={setIdForSpecificLease}
                />
              }
            />
          </Routes>

          {/* lease table begins */}

          {/* lease tab ends */}
        </div>
      </div>
    </Layout>
  );
}

export default Lease;

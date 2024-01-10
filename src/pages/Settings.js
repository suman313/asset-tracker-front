import React, { useContext, useEffect } from "react";
import SettingsTable from "../components/tables/SettingsTable/SettingsTable";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NewEmployee from "../components/Modals/NewEmployee/NewEmployee";
import { NavbarContext } from "../Context/NavbarContext";
import { UpdateEmployee } from "../components/Modals/UpdateEmployee";

function Settings() {
  const navigate = useNavigate();
  const [navState, setNavState] = useContext(NavbarContext);

  useEffect(() => {
    if (sessionStorage.getItem("asset_tracker_logged_in") !== "true") {
      navigate("/login");
    }
    setNavState(7);
  }, []);

  return (
    <Layout>
      <Routes>
        <Route path="/" exact element={<SettingsTable />} />
        <Route path="/addEmployee" exact element={<NewEmployee />} />
        <Route path="/update-employee/:email" element={<UpdateEmployee />} />
      </Routes>
    </Layout>
  );
}

export default Settings;

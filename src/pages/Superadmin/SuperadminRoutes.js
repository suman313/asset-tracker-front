import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import Signup from "./Signup";
import SuperadminLogin from "../../Authentication/SuperadminLogin";

function SuperadminRoutes() {
  const [activeTab, setActiveTab] = useState(1);
  return <Routes>
    <Route path="/login" element={<SuperadminLogin/>} />
    <Route path="/sigup" element={<Signup/>} />
    <Route path="/" element={<Dashboard activeTab={[activeTab, setActiveTab]}/>} />
  </Routes>
}

export default SuperadminRoutes; 

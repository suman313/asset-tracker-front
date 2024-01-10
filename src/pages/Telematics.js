import React, { useContext, useEffect } from "react";
import DeviceEvents from "../components/Modals/Telematics/DeviceEvents";
import TagInOut from "../components/Modals/Telematics/TagInOut";
import GPSTracker from "../components/Modals/Telematics/GPSTracker";
import GeoTagging from "../components/Modals/Telematics/GeoTagging";
import UsageVsActual from "../components/Modals/Telematics/UsageVsActual";
import NewSite from "../components/Modals/Telematics/NewSite";
import NewLocation from "../components/Modals/Telematics/NewLocation";
import Layout from "../components/Layout";
import TelematicsLayout from "../components/Modals/Telematics/TelematicsLayout";
import { Route, Routes } from "react-router-dom";
import UnlinkedDevices from "../components/Modals/Telematics/UnlinkedDevices";
import { NavbarContext } from "../Context/NavbarContext";
function Telematics() {
  const [navState, setNavState] = useContext(NavbarContext);
  useEffect(() => {
    setNavState(5)
  },[])
  return (
    <Layout>
      <TelematicsLayout>
        <Routes>
          <Route path="/" element={<DeviceEvents />} />
          <Route path="/unlinked-devices" element={<UnlinkedDevices/>} />
          <Route path="/tag-in-out" element={<TagInOut />} />
          <Route path="/usage-vs-actual" element={<UsageVsActual />} />
          <Route path="/gps-tracker" element={<GPSTracker />} />
          <Route path="/geo-tagging" element={<GeoTagging />} />
        </Routes>
      </TelematicsLayout>
    </Layout>
  );
}

export default Telematics;

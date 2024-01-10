import React, { useContext, useEffect, useState } from "react";
import AssetTable from "../components/tables/AssetTable/AssetTable";
import AssetDetails from "../components/Modals/AssetDetails/AssetDetails";
import AssetHistory from "../components/Modals/AssetHistory";
import AssetTelematics from "../components/Modals/AssetTelematics";
import UpdateAssets from "../components/Modals/UpdateAssets";
import NewAssetTab from "../components/Modals/NewAsset/NewAsset";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import { setBaseUrl } from "../config";
import { NavbarContext } from "../Context/NavbarContext";
import Layout from "../components/Layout";
import { PermissionContext } from "../Context/PermissionsContext";

function Assets() {
  const [perms, setPerms] = useContext(PermissionContext);
  const navigate = useNavigate();
  const [navState, setNavState] = useContext(NavbarContext);

  // set the state of the current asset tab
  const [showCurrentTab, setShowCurrentTab] = useState(1);

  // const [IdForAssetDetails, setIdForAssetDetails] = useState("");
  //set the state of filter

  //navigate to the dashboard page on reload
  // window.onload = () => {
  //   navigate("/");
  // };

  useEffect(() => {
    if (sessionStorage.getItem("asset_tracker_logged_in") !== "true") {
      navigate("/login");
    }
    setNavState(2);
  }, []);
  useEffect(() => {
    let getPermissionsFromSession = JSON.parse(
      sessionStorage.getItem("permissions")
    );
    setPerms(getPermissionsFromSession);
  }, []);
  return (
    <Layout>
      <div class="tabList" id="tab-assets">
        <div id="main-assets" class="block ">
          <Routes>
            <Route
              path="/:query?"
              element={
                <AssetTable
                  showCurrentTab={showCurrentTab}
                  setShowCurrentTab={setShowCurrentTab}
                />
              }
            />
            <Route path="/newAsset" element={<NewAssetTab />} />
            <Route path="/AssetDetails/:id/:tab?" element={<AssetDetails />} />
            <Route path="/updateAsset/:id" element={<UpdateAssets />} />
          </Routes>
          {/* show search bar, filter, new asset btn etc. only when showCurrentTab==1 */}
          {/* {showCurrentTab === 1 && (
          
        )} */}
          {/* <!--Upper tabs ends-->
  
        <!--Table Begins--> */}
          {/* show asset table only when showCurrentTab==1 */}
          {/* {showCurrentTab === 1 && (
          
        )} */}
        </div>

        {/* new asset tab . It will open when we click new asset button */}
        {/* {showCurrentTab === 5 && (
        <NewAssetTab
          showCurrentTab={showCurrentTab}
          setShowCurrentTab={setShowCurrentTab}
          IdForAssetDetails={IdForAssetDetails}
        />
      )} */}
        {/* asset details tab. it will open when we click on a row on the asset table */}
        {/* {showCurrentTab === 2 && (
        <AssetDetails
          setShowCurrentTab={setShowCurrentTab}
          IdForAssetDetails={IdForAssetDetails}
        />
      )} */}
        {/* <!--Asset History--> */}
        {/* <AssetHistory /> */}
        {/* <!--Asset History Ends--> */}

        {/* asset update tab. It will open when we click on asset update button under asset details tab */}
        {/* {showCurrentTab === 3 && (
        <UpdateAssets
          showCurrentTab={showCurrentTab}
          setShowCurrentTab={setShowCurrentTab}
          IdForAssetDetails={IdForAssetDetails}
        />
      )} */}
        {/* asset telematics tab. It will open when we click on asset telematics tab in asset details tab */}
        {/* {showCurrentTab === 4 && (
        <AssetTelematics setShowCurrentTab={setShowCurrentTab} />
      )} */}
      </div>
    </Layout>
  );
}

export default Assets;

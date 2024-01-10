import React, { useEffect, useState } from "react";
import NewOperator from "../components/Modals/NewOperator";
import UpdateOperator from "../components/Modals/UpdateOperator";
import { Route, Routes, useNavigate } from "react-router-dom";
import OperatorTable from "../components/tables/OperatorTable/OperatorTable";
import Layout from "../components/Layout";
import { useContext } from "react";
import { NavbarContext } from "../Context/NavbarContext";
import { PermissionContext } from "../Context/PermissionsContext";
import ExcelReportBtn from "../components/Buttons/ExcelReportBtn";
import MISReportBtn from "../components/Buttons/MISReportBtn";
import OperatorDetails from "../components/OperatorDetails/OperatorDetails";

function Operator() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [perms] = useContext(PermissionContext);
  const [navState, setNavState] = useContext(NavbarContext);
  const navigate = useNavigate();
  const [showCurrentOperatorTab, setCurrentOperatorTab] = useState(1);
  const [operatorId, setOperatorId] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("asset_tracker_logged_in") !== "true") {
      navigate("/login");
    }
    if (
      perms.indexOf("OPERATOR.ALL") !== -1 ||
      perms.indexOf("OPERATOR.CRU") !== -1 ||
      perms.indexOf("ADMIN.ALL") !== -1
    ) {
      setIsDisabled(false);
    }
    setNavState(6);
  });

  return (
    <Layout>
      <div class="tabList " id="tab-operator">
        <Routes>
          <Route path="/" element={<OperatorTable />} />
          <Route path="/details/:id" element={<OperatorDetails />} />
          <Route
            path="/newOperator"
            element={
              <NewOperator
                openTab={showCurrentOperatorTab}
                setOpenTab={setCurrentOperatorTab}
              />
            }
          />
          <Route path="/updateOperator/:id" element={<UpdateOperator />} />
        </Routes>
      </div>
    </Layout>
  );
}

export default Operator;

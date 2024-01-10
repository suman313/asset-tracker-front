import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { setBaseUrl } from "../../../config";
import CurrentItems from "../../tables/MaintenanceTable/CurrentItems";
import { LoaderContext } from "../../../Context/LoaderContext";

function MaintenanceTab({asset_id,lease_id}) {
  const setLoader = useContext(LoaderContext)
  const [allMaintenance, setAllMaintenance] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const getAllMaintenance = async () => {
    try {
    let idObj = asset_id ? {"asset-id": asset_id} : {"lease-id": lease_id};
      const { data } = await axios.get(`${setBaseUrl}/maintenance/get_all`, {
        headers: {
          "Content-Type": "application/json",
          "x-access-tokens": sessionStorage.getItem("token"),
          //   offset: itemOffset,
          //   limit: itemsPerPage,
          ...idObj
        },
      });
      console.log(data);
      setAllMaintenance(data);
    } catch (error) {
      console.log(error);
    } 
  };
  useEffect(() => {
    getAllMaintenance();
  },[])
  return <><CurrentItems allMaintenance={allMaintenance} setLoader={setLoader} /></>
}

export default MaintenanceTab;

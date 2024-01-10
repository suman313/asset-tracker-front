import React, { useContext, useEffect, useState } from 'react'
import { LoaderContext } from '../../../Context/LoaderContext'
import { setBaseUrl } from '../../../config';
import axios from 'axios';
import {CurrentItems} from "../../tables/LeaseTable/CurrentItems"

function LeaseTab({asset_id}) {
    const setLoader = useContext(LoaderContext)
    const [leaseDetails, setLeaseDetails] = useState([])
    const getAllLease = async () => {
        try {
          const { data } = await axios.get(`${setBaseUrl}/lease/get_all`, {
            headers: {
              "Content-Type": "application/json",
              "x-access-tokens": sessionStorage.getItem("token"),
              //   offset: itemOffset,
              //   limit: itemsPerPage,
              "asset-id": asset_id
            },
          });
          console.log(data);
          setLeaseDetails(data);
        } catch (error) {
          console.log(error);
        } 
      };
      useEffect(() => {
        getAllLease();
      },[])


  return (
    <CurrentItems leaseDetails={leaseDetails} setLoader={setLoader}/>
  )
}

export default LeaseTab
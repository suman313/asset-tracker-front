import React, { useContext, useEffect, useState } from 'react'
import { LoaderContext } from '../../../Context/LoaderContext'
import { setBaseUrl } from '../../../config';
import axios from 'axios';
import {CurrentItems} from "../../tables/AssetTable/CurrentItems"

function AssetDetailsTab({asset_id}) {
    const setLoader = useContext(LoaderContext)
    const [assetDetails, setAssetDetails] = useState([])
    const getAllLease = async () => {
        try {
          const { data } = await axios.get(`${setBaseUrl}/asset/get_data_by_id`, {
            headers: {
              "Content-Type": "application/json",
              "x-access-tokens": sessionStorage.getItem("token"),
              //   offset: itemOffset,
              //   limit: itemsPerPage,
              id: asset_id
            },
          });
          console.log(data);
          setAssetDetails([data]);
        } catch (error) {
          console.log(error);
        } 
      };
      useEffect(() => {
        getAllLease();
      },[])


  return (
    <CurrentItems assetDetails={assetDetails} setLoader={setLoader}/>
  )
}

export default AssetDetailsTab
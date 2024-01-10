import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { setBaseUrl } from "../../../config";
import Loader from "../../Loader";
import CurrentItems from "./CurrentItems";
import { Pagination } from "../Pagination";
import { useNavigate } from "react-router-dom";
import Search from "./Search";
import { LoaderContext } from "../../../Context/LoaderContext";

function MaintenanceTable() {
  // set the item quantity to load page numbers
  const [deleted, setDeleted] = useState(false);
  const [pageCount, setPageCount] = useState(0);

  const [loader, setLoader] = useContext(LoaderContext)
  const [allMaintenance, setAllMaintenance] = useState([]);
  
  const [searchData, setSearchData] = useState(null);
  
  const [searchType, setSearchType] = useState("No filter");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [getSearchList, setGetSearchList] = useState(false);
  const [items, setItems] = useState(0);
  // set items per page
  const itemsPerPage = 10;
  const [itemOffset, setItemOffset] = useState(0);

  const getAllMaintenance = async () => {
    try {
      setLoader(true);
      const headersobj = {
        "Content-Type": "application/json",
        "x-access-tokens": sessionStorage.getItem("token"),
        offset: itemOffset,
        limit: itemsPerPage,
      };
      if ((searchType !== "") | undefined && (searchData !== "") | null) {
        // console.log(searchData);
        // console.log(searchType);
        if (searchType == "schedule_date") {
          headersobj["scheduled-date-from"] = startDate;
          headersobj["scheduled-date-to"] = endDate;
        } else headersobj[`${searchType}`] = searchData;
      }
      const { data } = await axios.get(`${setBaseUrl}/maintenance/get_all`, {
        headers: headersobj,
      });
      console.log(data);
      setAllMaintenance(data);
    } catch (error) {
      alert(error.response.data.error);
    } finally {
      setLoader(false);
    }
  };

  useEffect( () => {
     getAllMaintenance();
  }, [deleted, itemOffset, searchData]);

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
        <Search startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} getAllMaintenance={getAllMaintenance} setItems={setItems} searchType={searchType}  setSearchType={setSearchType} setSearchData={setSearchData}/>
          <CurrentItems
            deleted={deleted}
            setDeleted={setDeleted}
            loader={loader}
            // setLoader={setLoader}
            allMaintenance={allMaintenance}
          />
        </>
      )}
      <Pagination
        itemsPerPage={itemsPerPage}
        itemsLength={items}
        itemOffset={itemOffset}
        setItemOffset={setItemOffset}
        setPageCount={setPageCount}
      />
    </>
  );
}

export default MaintenanceTable;

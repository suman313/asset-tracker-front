import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../../Loader";
import { CurrentItems } from "./CurrentItems";
import { setBaseUrl } from "../../../config";
import { Pagination } from "../Pagination";
import { useNavigate } from "react-router-dom";
import NewAssetBtn from "../../Buttons/NewAssetBtn";
import MISReportBtn from "../../Buttons/MISReportBtn";
import ExcelReportBtn from "../../Buttons/ExcelReportBtn";

function LeaseTable({ tabNo, setTabNo, leaseId, setLeaseId }) {
  const navigate = useNavigate();
  // set the item quantity to load page numbers
  const [items, setItems] = useState(0);
  // set items per page
  const itemsPerPage = 50;
  const [leaseDetails, setLeaseDetails] = useState([]);
  const [loader, setLoader] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const [itemOffset, setItemOffset] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  //set the state of filter
  const [filter, setFilter] = useState("nofilter");
  //setting state for search suggestions and page count for pagination
  const [searchSuggetions, setSearchSuggetions] = useState({});
  const [searchType, setSearchType] = useState("No filter");
  const [searchData, setSearchData] = useState(null);
  const [searchTypeArray, setSearchTypeArray] = useState([]);
  const [showSearchDiv, setShowSearchDiv] = useState([]);
  const getSearchData = async () => {
    try {
      const { data } = await axios.get(`${setBaseUrl}/lease/search`, {
        headers: {
          "Content-Type": "application/json",
          "x-access-tokens": sessionStorage.getItem("token"),
        },
      });
      // console.log(data);
      setSearchSuggetions(data);
      setItems(data.lease_no.length);
    } catch (error) {
      // console.log(error);
    }
  };
  const getAllLease = async (searchId = "") => {
    // console.log(searchId);
    // console.log(itemOffset);
    try {
      setLoader(true);
      const headersobj = {
        "Content-Type": "application/json",
        "x-access-tokens": sessionStorage.getItem("token"),
        offset: itemOffset,
        limit: itemsPerPage,
      };
      // console.log(searchType);
      if ((searchType !== "") | undefined && (searchId !== "") | null) {
        if (searchType == "schedule_date") {
          headersobj["start-date"] = startDate;
          headersobj["end-date"] = endDate;
        } else headersobj[`${searchType}`] = searchId;
      }
      // console.log("after");
      const { data } = await axios.get(`${setBaseUrl}/lease/get_all`, {
        headers: headersobj,
      });
      console.log(data);
      setLeaseDetails(data);
    } catch (error) {
      // console.log(error);
      alert(error.response.data.error);
    } finally {
      setShowSearchDiv([]);
      setLoader(false);
    }
  };
  const handleSearchCategory = (e) => {
    setFilter(e.target.value);
    let filterInside = e.target.value;
    switch (filterInside) {
      case "all":
        getAllLease();
        break;
      case "scheduled_date":
        // console.log("Scheduled date");
        setSearchType("schedule_date");
        // setSearchTypeArray([...searchSuggetions?.scheduled_date]);
        break;
      case "asset-id":
        setSearchType("asset-id");
        setSearchTypeArray([...searchSuggetions.asset_no]);
        break;
      // case "lease":
        console.log("lease");
      //   setSearchType("lease-id");
      //   setSearchTypeArray([...searchSuggetions.lease_no]);
      //   break;
      default:
        break;
    }
  };
  function search(query) {
    // console.log("once");
    if (query == "") {
      setShowSearchDiv([]);
      return;
    }
    // console.log(searchTypeArray);
    const filteredData = searchTypeArray.filter((item) => {
      if (item.no.toLowerCase().includes(query.toLowerCase())) return item;
    });
    if (filteredData.length > 0) {
      setShowSearchDiv(filteredData);
    } else {
      setShowSearchDiv(["no results"]);
    }

    // console.log(filteredData);
  }
  const handleEndDate = (e) => {
    let end_date = e.target.value;
    if (end_date < startDate) {
      alert("End date should be older than start date");
      return;
    }
    setEndDate(end_date);
  };
  //on search input onChange event
  const handleSearch = (e) => {
    search(e.target.value);
    console.log(searchTypeArray);
  };
  //clicking on show search Div
  const handleSearchClick = (id) => {
    // console.log(id);
    // setGetSearchList((prev) => !prev);
    getAllLease(id);
  };
  useEffect(() => {
    getSearchData();
    getAllLease();
    // console.log(leaseDetails);
  }, [tabNo, deleted, itemOffset]);

  return (
    <>
      <div className="flex">
        <p className="inline py-5 pl-5 text-xl font-medium text-slate-700 dark:text-slate-200">
          Lease
        </p>
        <div className=" sm:flex items-center ml-auto mt-0">
          <span className="mr-2 text-gray-500 text-xs dark:text-gray-500">
            Filter By:
          </span>
          <select
            type="text"
            className="p-2 input text-sm border-b-gray-400 text-gray-500 dark:text-gray-200 dark:bg-slate-800 rounded-lg cursor-pointer mr-2 border-2"
            onChange={handleSearchCategory}
          >
            <option>No Filter</option>
            <option value="asset-id">Asset Number</option>
            <option value="scheduled_date">Schedule Date</option>
            <option value="all">All</option>
            {/* <option value="date">Date</option>
                <option value="status">Status</option> */}
          </select>
          {/* if the selected filter is not schedule_date */}
          {searchType !== "schedule_date" && (
            <div className="relative flex flex-col gap-1">
              <div className="relative flex ">
                <input
                  type="search"
                  className="relative m-0 block w-[1%] min-w-0 flex-auto border border-solid border-b-gray-400 rounded-lg bg-transparent bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out focus:border-primary-600 focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={handleSearch}
                  aria-describedby="button-addon2"
                  //This implementation is not possible cz in disguise of asset no we are using asset id (we have to send asset id to the server)
                  // onKeyUp={(event) => {
                  //   if (event.key === "Enter") {
                  //     handleSearchClick(event.target.value);
                  //   }
                  // }}
                />
                <span
                  className=" relative right-10 input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
                  id="basic-addon2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
              </div>
              {/* //if the showSearchDiv which is populating through handleSearch->search function */}
              {showSearchDiv.length > 0 && (
                <div className="absolute z-[9999] bg-white p-2 border-2 border-[#b3a7a7] rounded-[9px] w-full mt-10 overflow-y-scroll">
                  {showSearchDiv.map((item) => (
                    <p
                      onClick={() => handleSearchClick(item?.id)}
                      className="cursor-pointer hover:bg-slate-400 rounded-md p-2"
                    >
                      {item?.no !== undefined ? `${item.no}` : "No Results"}
                    </p>
                  ))}
                </div>
              )}
            </div>
          )}
          {searchType === "schedule_date" && (
            <>
              <input
                type="date"
                id="datesmaintenance"
                name="dates"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="rounded-lg bg-slate-100 border-slate-400 text-sm text-slate-700"
              />
              <span className="mx-4"> to </span>
              <input
                type="date"
                id="datesmaintenance"
                name="dates"
                value={endDate}
                onChange={handleEndDate}
                className="rounded-lg bg-slate-100 border-slate-400 text-sm text-slate-700"
              />
              <button
                onClick={handleSearchClick}
                className="bg-[#1920d5] p-2 mx-4 rounded-lg text-white"
              >
                Search
              </button>
            </>
          )}
          <NewAssetBtn tabName="lease" />
          <MISReportBtn />
          <ExcelReportBtn section="lease" />
        </div>
      </div>
      {loader ? (
        <Loader />
      ) : (
        <CurrentItems
          setTabNo={setTabNo}
          leaseDetails={leaseDetails}
          leaseId={leaseId}
          setLeaseId={setLeaseId}
          loader={loader}
          setLoader={setLoader}
          deleted={deleted}
          setDeleted={setDeleted}
        />
      )}
      <Pagination
        itemsPerPage={itemsPerPage}
        itemsLength={items}
        itemOffset={itemOffset}
        setItemOffset={setItemOffset}
      />
    </>
  );
}

export default LeaseTable;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { setBaseUrl } from "../../../config";
import { useNavigate } from "react-router-dom";
import NewAssetBtn from "../../Buttons/NewAssetBtn";
import MISReportBtn from "../../Buttons/MISReportBtn";
import ExcelReportBtn from "../../Buttons/ExcelReportBtn";

function Search({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  getAllMaintenance,
  setItems,
  searchType,
  setSearchType,
  setSearchData,
}) {
  const navigate = useNavigate();
  //set the state of filter
  const [filter, setFilter] = useState(false);
  //setting state for search suggestions and page count for pagination
  const [searchSuggetions, setSearchSuggetions] = useState({});
  const [searchTypeArray, setSearchTypeArray] = useState([]);
  const [showSearchDiv, setShowSearchDiv] = useState([]);

  const getSearchData = async () => {
    try {
      const { data } = await axios.get(`${setBaseUrl}/maintenance/search`, {
        headers: {
          "Content-Type": "application/json",
          "x-access-tokens": sessionStorage.getItem("token"),
        },
      });
      console.log(data);
      setSearchSuggetions(data);
      setItems(data.counter.maintenance);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchCategory = (e) => {
    setFilter(e.target.value);
    let filterInside = e.target.value;
    switch (filterInside) {
      case "no_filter": 
        setFilter((prev) => !prev)
        break;
      case "scheduled_date":
        setSearchType("schedule_date");
        // setSearchTypeArray([...searchSuggetions?.scheduled_date]);
        break;
      case "asset_name":
        setSearchType("asset-id");
        setSearchTypeArray([...searchSuggetions.asset_no]);
        break;
      case "lease":
        console.log("lease");
        setSearchType("lease-id");
        setSearchTypeArray([...searchSuggetions.lease_no]);
      default:
        break;
    }
  };
  function search(query) {
    if (query == "") {
      setShowSearchDiv([]);
      return;
    }
    const filteredData = searchTypeArray.map((item) => {
      if (item.no.toLowerCase().includes(query.toLowerCase())) return item;
    });
    if (filteredData.length > 0) {
      setShowSearchDiv(filteredData);
    } else {
      setShowSearchDiv(["no results"]);
    }

    console.log(filteredData);
  }
  const handleEndDate = (e) => {
    let end_date = e.target.value;
    if (end_date < startDate) {
      alert("End date should be older than start date");
      return;
    }
    setEndDate(end_date);
  };
  const handleSearch = (e) => {
    search(e.target.value);
    console.log(searchTypeArray);
  };

  const handleSearchClick = async (id) => {
    console.log(id);
    setSearchData(id);
    // setGetSearchList((prev) => !prev);
    await getAllMaintenance();
  };

  useEffect(() => {
    getSearchData();
  }, [filter]);
  return (
    <>
      {" "}
      {/* upper tab */}
      <div class="flex">
        <p class="inline py-5 pl-5 text-xl font-medium text-slate-700 dark:text-slate-200">
          Maintenance
        </p>
        <div class=" sm:flex items-center ml-auto mt-0">
          <span class="mr-2 text-gray-500 text-xs dark:text-gray-500">
            Filter By:
          </span>
          <select
            type="text"
            class="input text-sm border-b-gray-400 text-gray-500 dark:text-gray-200 dark:bg-slate-800 rounded-lg cursor-pointer mr-2 p-3"
            onClick={handleSearchCategory}
          >
            <option value="no_filter">No Filter</option>
            <option value="scheduled_date">Scheduled Date</option>
            <option value="asset_name">Asset Name</option>
            <option value="lease">Lease No</option>
          </select>
          {searchType !== "schedule_date" && (
            <div className="flex flex-col gap-1">
              <div class="relative flex ">
                <input
                  type="text"
                  class="relative m-0 block w-[1%] min-w-0 flex-auto border border-solid border-b-gray-400 rounded-lg bg-transparent bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out focus:border-primary-600 focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="button-addon2"
                  onChange={handleSearch}
                />
                <span
                  class=" relative right-10 input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
                  id="basic-addon2"
                  // onClick={handleSearchClicik}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="h-5 w-5"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
              </div>
              {showSearchDiv.length > 0 && (
                <div className="bg-white p-2 border-2 border-[#b3a7a7] rounded-[9px]">
                  {showSearchDiv.map((item) => (
                    <p
                      onClick={() => handleSearchClick(item?.id)}
                      className="cursor-pointer"
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
                class="rounded-lg bg-slate-100 border-slate-400 text-sm text-slate-700"
              />
              <span className="mx-4"> to </span>
              <input
                type="date"
                id="datesmaintenance"
                name="dates"
                value={endDate}
                onChange={handleEndDate}
                class="rounded-lg bg-slate-100 border-slate-400 text-sm text-slate-700"
              />
              <button
                onClick={handleSearchClick}
                className="bg-[#1920d5] p-2 rounded-lg text-white"
              >
                Search
              </button>
            </>
          )}
          {/* <script>
                  $('#datesmaintenance').daterangepicker({
                      "showDropdowns": true,
                      ranges: {
                          'Today': [moment(), moment()],
                          'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                          'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                          'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                          'This Month': [moment().startOf('month'), moment().endOf('month')],
                          'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                      },
                      "alwaysShowCalendars": true,
                  },);
                </script> */}
         <NewAssetBtn tabName="maintenance" />
         <MISReportBtn />
         <ExcelReportBtn section="maintenance" />
        </div>
      </div>
      {/* upper tab ends */}
    </>
  );
}

export default Search;

import React, { useEffect, useState } from "react";
import MISReportBtn from "../../Buttons/MISReportBtn";
import ExcelReportBtn from "../../Buttons/ExcelReportBtn";
import { useNavigate } from "react-router-dom";
import NewAssetBtn from "../../Buttons/NewAssetBtn";
import { setBaseUrl } from "../../../config";
import axios from "axios";

function UpperTab({ setItems, getAllOperators, setFetchSearchData }) {
  const [filter, setFilter] = useState("all");
  //setting state for search suggestions and page count for pagination
  const [searchSuggetions, setSearchSuggetions] = useState({});
  const [searchValue, setSearchValue] = useState("all");
  const [searchTypeArray, setSearchTypeArray] = useState([]);
  const [showSearchDiv, setShowSearchDiv] = useState([]);
  const [searchType, setSearchType] = useState("");
  const handleSearchCategory = (value) => {
    console.log(value);
    switch (value) {
      case "all":
        // setShowAllData((prev) => !prev);
        setShowSearchDiv([]);
        setSearchTypeArray([]);
        setSearchValue("")
        getAllOperators();
        break;
      case "adhaarNo":
        setSearchType("aadhar-no");
        let adNos = Object.keys(searchSuggetions.aadhar);
        setSearchTypeArray(adNos);
        break;
      case "pf":
        setSearchType("pf-account");
        let pfAcNo = Object.keys(searchSuggetions.pf_account_no);
        setSearchTypeArray(pfAcNo);
        break;
      case "name":
        setSearchType("name");
        let opName = Object.keys(searchSuggetions.name);
        setSearchTypeArray(opName);
      default:
        break;
    }
  };
  const getSearchData = async () => {
    try {
      const { data } = await axios.get(`${setBaseUrl}/operator/search`, {
        headers: {
          "Content-Type": "application/json",
          "x-access-tokens": sessionStorage.getItem("token"),
        },
      });
      console.log(data);
      setSearchSuggetions(data);
      setItems(data.asset_data.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSearchData();
  }, []);

  function search(query) {
    query = query.trim();
    if (query == "") {
      setShowSearchDiv([]);
      return;
    }
    const filteredData = searchTypeArray.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    if (filteredData.length > 0) {
      setShowSearchDiv(filteredData);
    } else {
      setShowSearchDiv(["no results"]);
    }

    console.log(filteredData);
  }
  const handleSearch = (e) => {
    search(e.target.value);
    setSearchValue(e.target.value);
  };
  const handleSearchClicik = (item) => {
    console.log(searchType, item);
    getAllOperators(searchType, item);
    setShowSearchDiv([]);
  };
  return (
    <div class="flex">
      <p class="inline py-5 pl-5 text-xl font-medium text-slate-700 dark:text-slate-200">
        Operators
      </p>
      <div className=" sm:flex items-center ml-auto mt-0">
        <span class="mr-2 text-gray-500 text-xs dark:text-gray-500">
          Filter By:
        </span>
        <select
          type="text"
          className="input text-sm border-b-gray-400 text-gray-500 dark:text-gray-200 dark:bg-slate-800 rounded-lg cursor-pointer mr-2 p-2 border-2"
          onChange={(e) => handleSearchCategory(e.target.value)} defaultValue={searchValue}
        >
          <option value="all">No Filter</option>
          <option value="adhaarNo">Adhaar No.</option>
          <option value="pf">PF A/c. No.</option>
          <option value="name">Name</option>
        </select>
        <div className="relative flex flex-col gap-1">
          <div class="relative flex ">
            <input
              type="text"
              className="relative m-0 block w-[1%] min-w-0 flex-auto border border-solid border-b-gray-400 rounded-lg bg-transparent bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out focus:border-primary-600 focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200"
              placeholder="Search"
              value={searchValue}
              aria-label="Search"
              aria-describedby="button-addon2"
              onChange={handleSearch}
              onKeyUp={(event) => {
                if (event.key === "Enter") {
                  handleSearchClicik(event.target.value);
                }
              }}
            />
            <span
              className=" relative right-10 input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200 cursor-pointer"
              id="basic-addon2"
              onClick={() => handleSearchClicik(searchValue)}
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
            <div className="absolute bg-white p-2 border-2 border-[#b3a7a7] rounded-[9px] w-full h-[200px] z-[9999] mt-10 overflow-y-scroll">
              {showSearchDiv.map((item) => (
                <p
                  onClick={() => handleSearchClicik(item)}
                  className="cursor-pointer hover:bg-slate-400 rounded-md p-2"
                >
                  {item}
                </p>
              ))}
            </div>
          )}
        </div>
        <NewAssetBtn tabName="operator" />
        <MISReportBtn />
        <ExcelReportBtn section="Operator" />
      </div>
    </div>
  );
}

export default UpperTab;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { setBaseUrl } from "../../../config";
import { TableLoader } from "../../TableLoader";
import ReactPaginate from "react-paginate";
import { CurrentItems } from "./CurrentItems";
import { Pagination } from "../Pagination";
import NewAssetBtn from "../../Buttons/NewAssetBtn";
import HistoryBtn from "../../Buttons/HistoryBtn";
import ExcelReportBtn from "../../Buttons/ExcelReportBtn";
import MISReportBtn from "../../Buttons/MISReportBtn";
import { PermissionContext } from "../../../Context/PermissionsContext";
import { useContext } from "react";
import Loader from "../../Loader";
import { useSearchData } from "../../../hooks/useSearchData";
import { useParams } from "react-router-dom";
import {
  asset_by_type,
  asset_in_maintenance,
  get_all_assets,
  inactive_assets,
} from "../../../apis/AssetsApis/getAllAssets";

function AssetTable({ showCurrentTab, setShowCurrentTab }) {
  const [perms, setPerms] = useContext(PermissionContext);
  // set items per page
  const itemsPerPage = 50;
  const [loader, setLoader] = useState(false);
  const [deleted, setDeleted] = useState(false);

  // We start with an empty list of items.
  const [assetDetails, setAssetDetails] = useState([]);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const [filter, setFilter] = useState("all");
  const [showAllData, setShowAllData] = useState(true);
  const [searchType, setSearchType] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [searchTypeArray, setSearchTypeArray] = useState([]);
  const [showSearchDiv, setShowSearchDiv] = useState([]);
  const [getSearchList, setGetSearchList] = useState(false);
  // set the item quantity to load page numbers
  const [items, setItems] = useState(1);
  const { query } = useParams();
  const handleSearchCategory = () => {
    switch (filter) {
      case "all":
        setShowAllData((prev) => !prev);
        break;
      case "category":
        setSearchType("category");
        setSearchTypeArray([...searchData.category]);
        break;
      case "assetnumber":
        setSearchType("assetnumber");
        let assetNumbers = searchData.asset_data.map((item) => item.asset_no);
        setSearchTypeArray(assetNumbers);
        break;
      case "yom":
        setSearchType("yom");
        setSearchTypeArray([...searchData.YOM]);
      default:
        break;
    }
  };

  const {
    isPending: searchLoading,
    isError: isSearchError,
    data: searchData,
    error: searchError,
  } = useSearchData();

  const getAllAssets = async (searchData) => {
    try {
      let assetData = "";
      setLoader(true);
      if ((searchType !== "") | undefined && (searchData !== "") | null) {
        console.log(searchData);
        const { data } = await asset_by_type(
          itemOffset,
          itemsPerPage,
          searchType,
          searchData
        );
        console.log(data);
        assetData = data;
      } else if (query == "inactive") {
        const { data } = await inactive_assets(itemOffset, itemsPerPage);
        assetData = data;
      } else if (query == "inMaintenance") {
        const { data } = await asset_in_maintenance(itemOffset, itemsPerPage);
        assetData = data;
      } else {
        const { data } = await get_all_assets(itemOffset, itemsPerPage);
        assetData = data;
      }
      if (assetData.message !== "valid token is missing")
        setAssetDetails(assetData);
      setLoader(false);
      setShowSearchDiv([]);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }

    return;
    try {
      setLoader(true);
      const headersobj = {
        "Content-Type": "application/json",
        "x-access-tokens": sessionStorage.getItem("token"),
        offset: itemOffset,
        limit: itemsPerPage,
      };
      if ((searchType !== "") | undefined && (searchData !== "") | null) {
        console.log(searchData);
        headersobj[`${searchType}`] = searchData;
      }

      const { data } = await axios.get(`${setBaseUrl}/asset/get_all`, {
        headers: { ...headersobj, "unassigned-asset": "true" },
      });
      if (data.message !== "valid token is missing") setAssetDetails(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
      setShowSearchDiv([]);
    }
  };
  function search(query) {
    if (query == "") {
      setShowSearchDiv([]);
      return;
    }
    const filteredData = searchTypeArray.filter((item) => {
      console.log(item.length);
      return item.toLowerCase().includes(query.toLowerCase());
    });
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
    // setGetSearchList(prev => !prev)
    console.log(item);
    // setSearchData(item)

    getAllAssets(item);
  };

  useEffect(() => {
    handleSearchCategory();
  }, [filter]);
  useEffect(() => {
    if (searchData) {
      setItems(searchData.asset_data.length);
    }
  }, [searchData]);

  useEffect(() => {
    getAllAssets();
  }, [setShowCurrentTab, deleted, itemOffset, getSearchList]);
  useEffect(() => {
    getAllAssets();
  }, [showAllData]);

  return (
    <>
      <div class="flex ">
        <p class="inline py-5 pl-5 text-xl font-medium text-slate-700 dark:text-slate-200">
          Assets
        </p>
        <div className=" sm:flex items-center ml-auto mt-0">
          <span class="mr-2 text-gray-500 text-xs dark:text-gray-500">
            Filter By:
          </span>
          <select
            type="text"
            className="input text-sm border-b-gray-400 text-gray-500 dark:text-gray-200 dark:bg-slate-800 rounded-lg cursor-pointer mr-2 p-2 border-2"
            onClick={(e) => setFilter(e.target.value)}
          >
            <option value="all">No Filter</option>
            <option value="assetnumber">Asset Number</option>
            <option value="category">Category</option>
            <option value="yom">YOM</option>
          </select>
          <div className="relative flex flex-col gap-1">
            <div class="relative flex ">
              <input
                type="text"
                className="relative m-0 block w-[1%] min-w-0 flex-auto border border-solid border-b-gray-400 rounded-lg bg-transparent bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out focus:border-primary-600 focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200"
                placeholder={searchValue == "" ? "Search" : searchValue}
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
          <NewAssetBtn tabName="asset" />
          <HistoryBtn />
          <MISReportBtn />
          <ExcelReportBtn section="assets" />
        </div>
      </div>
      {loader ? (
        <Loader />
      ) : (
        <CurrentItems
          setShowCurrentTab={setShowCurrentTab}
          deleted={deleted}
          setDeleted={setDeleted}
          loader={loader}
          setLoader={setLoader}
          assetDetails={assetDetails}
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

export default AssetTable;

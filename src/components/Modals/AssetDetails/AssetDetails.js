import React, { useContext, useEffect, useState } from "react";
import { setBaseUrl } from "../../../config";
import axios from "axios";
import MaintenanceTable from "../../tables/MaintenanceTable/MaintenanceTable";
import MaintenanceTab from "./MaintenanceTab";
import { useNavigate, useParams } from "react-router-dom";
import pdfIcon from "../../../assets/images/pdfIcon.png";
import { LoaderContext } from "../../../Context/LoaderContext";
import Loader from "../../Loader";
import LeaseTab from "./LeaseTab";
import NewAssetBtn from "../../Buttons/NewAssetBtn";
import { PermissionContext } from "../../../Context/PermissionsContext";
import Document from "../../viewer/Document";
import Image from "../../viewer/Image";
import Documents from "../../InnerTabs/Documents";
import DeviceEvents from "../Telematics/DeviceEvents";

function AssetDetails({ setShowCurrentTab }) {
  const [perms] = useContext(PermissionContext);
  const [loader, setLoader] = useContext(LoaderContext);
  const [assetDetails, setAssetBasicDetails] = useState({});
  const [commercialDetails, setcommercialDetails] = useState({});
  const [innerTab, setInnerTab] = useState(1);
  const [imageUrl, setImageUrl] = useState([]);
  const [documentUrl, setDocumentUrl] = useState([]);
  const [deviceId, setDeviceId] = useState(null);
  const [commercialDetailsExist, setcommercialDetailsExist] = useState(false);
  const [epocToHumanDate, setEpocToHumanDate] = useState("");
  const [reload, setReload] = useState(false);
  const { id,tab } = useParams();
  const navigate = useNavigate();
  const getAssetDetails = async () => {
    try {
      setLoader(true);
      const { data } = await axios.get(`${setBaseUrl}/asset/get_data_by_id`, {
        headers: {
          "Content-Type": "application/json",
          "x-access-tokens": sessionStorage.getItem("token"),
          id: id,
        },
      });
      console.log(data);
      setDeviceId(data.device_id);
      setEpocToHumanDate((prev) => {
        let humanDateFormat = new Date(0);
        humanDateFormat.setUTCSeconds(data.created_at);
        return humanDateFormat;
      });
      if (data.commercial_detail !== undefined) {
        let lenOfCommDetail = Object.keys(data.commercial_detail).length;
        // if commercial details exist in data then we set commercial details state and set commercialDetailsExist to true
        if (lenOfCommDetail > 0) {
          setcommercialDetails(data.commercial_detail);
          setcommercialDetailsExist(true);
        }
      }
      console.log(data?.photo_data[0]?.image_uri);
      setAssetBasicDetails(data);
      setImageUrl(data?.photo_data);
      setDocumentUrl(data?.attachment_data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  // console.log(assetDetails);

  const handleCurrentTab = (tab) => {
    sessionStorage.setItem("currentTab",tab);
    setInnerTab(tab)
  }

  useEffect(() => {
    console.log(typeof(tab))
    if(tab=="true") {
      setInnerTab(6)
    }
    else{
      let getCurrentTabName = sessionStorage.getItem("currentTab")
      if(getCurrentTabName == 1) {
        setInnerTab(1);
      }
      else if(getCurrentTabName == 2){
        setInnerTab(2);
      }
      else if(getCurrentTabName == 3){
        setInnerTab(3);
      }
      else if(getCurrentTabName == 4){
        setInnerTab(4);
      }
      else if(getCurrentTabName == 5){
        setInnerTab(5);
      }
      else{
        setInnerTab(6);
      }
    }
    getAssetDetails();
  }, [innerTab, reload]);
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div id="asset-details">
          <div class="flex ">
            <button onClick={() => navigate(-1)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="w-6 h-6 mr-6 cursor-pointer feather feather-arrow-left"
              >
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </button>
            <p class="inline py-5 pl-5 text-xl font-medium text-slate-700 dark:text-slate-200">
              Asset Details
            </p>
            <div class="sm:flex items-center ml-auto mt-0  text-sm">
              {(perms.indexOf("ADMIN.ALL") !== -1 ||
                perms.indexOf("ASSETS.ALL") !== -1 ||
                perms.indexOf("ASSETS.CRU") !== -1) && (
                <span
                  onClick={() => navigate("/assets/updateAsset/" + id)}
                  class=" ml-auto flex items-center text-lime-500 cursor-pointer mr-6"
                >
                  <svg
                    class="stroke-lime-500 mr-3 w-4 h-4  feather feather-edit"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    height="20px"
                    viewBox="0 0 23 23"
                    fill="none"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                  Update Asset
                </span>
              )}
             
              <span
                class="ml-auto flex items-center text-blue-800 cursor-pointer"
                onClick={() => setReload((prev) => !prev)}
              >
                <svg
                  class="stroke-blue-800 w-4 h-4 mr-3 feather feather-refresh-ccw"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  height="20px"
                  viewBox="0 0 23 23"
                  fill="none"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="1 4 1 10 7 10"></polyline>
                  <polyline points="23 20 23 14 17 14"></polyline>
                  <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
                </svg>
                Reload Data
              </span>
            </div>
          </div>
          <div class="intro-y box px-5 pt-5 mt-5 bg-white dark:bg-slate-700 rounded-lg ">
            <div class="flex flex-col lg:flex-row border-b border-gray-200 dark:border-dark-5 pb-5 -mx-5">
              <div class="flex flex-1 px-5 items-center justify-center lg:justify-start">
                <div class="ml-5">
                  <div class="w-24 sm:w-40 truncate sm:whitespace-normal font-medium text-lg sm:text-2xl">
                    {assetDetails?.asset_no}
                  </div>
                  <div class="text-gray-600">{assetDetails?.model}</div>
                </div>
              </div>
              <div class="flex text-sm mt-6 lg:mt-0 items-center lg:items-start flex-1 flex-col justify-center text-gray-600 dark:text-gray-300 px-5 border-l border-r border-gray-200 dark:border-dark-5 border-t lg:border-t-0 pt-5 lg:pt-0">
                <div class="truncate sm:whitespace-normal flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="w-4 h-4 mr-2 feather feather-tag"
                  >
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                    <line x1="7" y1="7" x2="7.01" y2="7"></line>
                  </svg>
                  Serial No:
                  <span class="font-medium ml-2 dark:text-gray-500">
                    {assetDetails.serial_no}
                  </span>
                </div>
                <div class="truncate sm:whitespace-normal flex items-center mt-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="w-4 h-4 mr-2 feather feather-award"
                  >
                    <circle cx="12" cy="8" r="7"></circle>
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                  </svg>
                  ASSET:
                  <span class="font-medium ml-2 dark:text-gray-500">
                    {assetDetails?.asset_no}
                  </span>
                </div>
              </div>
              <div class="flex text-sm mt-6 lg:mt-0 items-center lg:items-start flex-1 flex-col justify-center text-gray-600 dark:text-gray-300 px-5 border-l border-r border-gray-200 dark:border-dark-5 border-t lg:border-t-0 pt-5 lg:pt-0">
                {/* Backend not providing site */}
                {/* <div class="truncate sm:whitespace-normal flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="w-4 h-4 mr-2 feather feather-map-pin"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  SITE:
                  <span class="font-medium ml-2 dark:text-gray-500">
                    Poonamalle
                  </span>
                </div> */}
                {/* Backend not providing location */}
                <div class="truncate sm:whitespace-normal flex items-center mt-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="w-4 h-4 mr-2 feather feather-map"
                  >
                    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
                    <line x1="8" y1="2" x2="8" y2="18"></line>
                    <line x1="16" y1="6" x2="16" y2="22"></line>
                  </svg>
                  LOCATION:
                  <span class="font-medium ml-2 dark:text-gray-500">
                    {assetDetails.site_location}
                  </span>
                </div>
                <div class="truncate sm:whitespace-normal flex items-center mt-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="w-4 h-4 mr-2 feather feather-list"
                  >
                    <line x1="8" y1="6" x2="21" y2="6"></line>
                    <line x1="8" y1="12" x2="21" y2="12"></line>
                    <line x1="8" y1="18" x2="21" y2="18"></line>
                    <line x1="3" y1="6" x2="3.01" y2="6"></line>
                    <line x1="3" y1="12" x2="3.01" y2="12"></line>
                    <line x1="3" y1="18" x2="3.01" y2="18"></line>
                  </svg>
                  CATEGORY:
                  <span class="font-medium ml-2 dark:text-gray-500">
                    {assetDetails.category}
                  </span>
                </div>
              </div>
              <div class="mt-6 lg:mt-0 flex-1 px-5 border-t lg:border-0 border-gray-200 dark:border-dark-5 pt-5 lg:pt-0 text-sm">
                <div class="font-medium text-center lg:text-left lg:mt-5"></div>
              </div>
            </div>

            {/* Tabs -> Dashboard, Photos, Documets, Lease, maintenance, telematics */}

            <div class="nav-tabs flex flex-col sm:flex-row justify-center lg:justify-start text-sm">
              <span
                onClick={() => handleCurrentTab(1)}
                className={`asset-details-tab py-4 sm:mr-8 cursor-pointer ${
                  innerTab === 1 ? "assetDetailsActive" : ""
                }`}
              >
                Dashboard
              </span>
              <span
                onClick={() => handleCurrentTab(2)}
                className={`asset-details-tab py-4 sm:mr-8 cursor-pointer ${
                  innerTab === 2 ? "assetDetailsActive" : ""
                }`}
              >
                Photos
              </span>

              <span
                onClick={() => handleCurrentTab(3)}
                className={`asset-details-tab py-4 sm:mr-8 cursor-pointer ${
                  innerTab === 3 ? "assetDetailsActive" : ""
                }`}
              >
                Maintenance
              </span>
              <span
                onClick={() => handleCurrentTab(5)}
                className={`asset-details-tab py-4 sm:mr-8 cursor-pointer ${
                  innerTab === 5 ? "assetDetailsActive" : ""
                }`}
              >
                Lease
              </span>
              <span
                onClick={() => handleCurrentTab(4)}
                className={`asset-details-tab py-4 sm:mr-8 cursor-pointer ${
                  innerTab === 4 ? "assetDetailsActive" : ""
                }`}
              >
                Documents
              </span>
              <span
                onClick={() => handleCurrentTab(6)}
                className={`asset-details-tab py-4 sm:mr-8 cursor-pointer ${
                  innerTab === 6 ? "assetDetailsActive" : ""
                }`}
              >
                Telematics
              </span>
            </div>
          </div>
          {innerTab === 1 && (
            <div id="assetD-dashboard" class="assetD-tabs block mt-4">
              <div class="grid grid-cols-12 gap-6">
                <div class="intro-y box col-span-12 lg:col-span-4 zoom-in bg-white dark:bg-slate-700 rounded-lg">
                  <div class="flex items-center p-5 border-b border-gray-200 dark:border-dark-5">
                    <h2 class="font-medium text-base mr-auto">Custom Feilds</h2>
                  </div>
                  <div class="p-5 text-sm">
                    <div class="flex flex-col sm:flex-row">
                      <div class="mr-auto">
                        <div class="font-medium text-gray-500">Serial No</div>
                      </div>
                      <div class="flex">
                        <div class="text-center">
                          <div class="bg-lime-500 text-white text-xs rounded px-2 mt-1">
                            {assetDetails?.serial_no}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div class="flex flex-col sm:flex-row mt-4">
                      <div class="mr-auto">
                        <div class="font-medium text-gray-500">Customer</div>
                      </div>
                      <div class="flex">
                        <div class="text-center">
                          <div class="font-medium">TEREX</div>
                        </div>
                      </div>
                    </div> */}
                    <div class="flex flex-col sm:flex-row mt-4">
                      <div class="mr-auto">
                        <div class="font-medium text-gray-500">Location</div>
                      </div>
                      <div class="flex">
                        <div class="text-center">
                          <div class="font-medium">
                            {" "}
                            {assetDetails.site_location}{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div class="flex flex-col sm:flex-row mt-4">
                      <div class="mr-auto">
                        <div class="font-medium text-gray-500">
                          
                          OP Accomodation Scope
                        </div>
                      </div>
                      <div class="flex">
                        <div class="text-center">
                          <div class="bg-orange-500 text-white text-xs rounded px-2 mt-1">
                            ---
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="flex flex-col sm:flex-row mt-4">
                      <div class="mr-auto">
                        <div class="font-medium text-gray-500">
                          Sales Person
                        </div>
                      </div>
                      <div class="flex">
                        <div class="text-center">
                          <div class="font-medium">- - -</div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
                <div class="intro-y box col-span-12 lg:col-span-4 zoom-in bg-white dark:bg-slate-700 rounded-lg">
                  <div class="flex items-center p-5 border-b border-gray-200 dark:border-dark-5">
                    <h2 class="font-medium text-base mr-auto py-3"></h2>
                  </div>
                  <div class="p-5 text-sm">
                    {/* <div class="flex flex-col sm:flex-row">
                      <div class="mr-auto">
                        <div class="font-medium text-gray-500">Site</div>
                      </div>
                      <div class="flex">
                        <div class="text-center">
                          <div class="font-medium">---</div>
                        </div>
                      </div>
                    </div>
                    <div class="flex flex-col sm:flex-row mt-4">
                      <div class="mr-auto">
                        <div class="font-medium text-gray-500">
                          Operator Name
                        </div>
                      </div>
                      <div class="flex">
                        <div class="text-center">
                          <div class="font-medium"> --- </div>
                        </div>
                      </div>
                    </div> */}
                    {/* <div class="flex flex-col sm:flex-row mt-4">
                      <div class="mr-auto">
                        <div class="font-medium text-gray-500">
                          OP Rent Amount
                        </div>
                      </div>
                      <div class="flex">
                        <div class="text-center">
                          <div class="bg-red-600 text-white text-xs rounded px-2 mt-1">
                            - - -
                          </div>
                        </div>
                      </div>
                    </div> */}
                    <div class="flex flex-col sm:flex-row mt-4">
                      <div class="mr-auto">
                        <div class="font-medium text-gray-500">YOM</div>
                      </div>
                      <div class="flex">
                        <div class="text-center">
                          <div class="bg-orange-500 text-white text-sm rounded px-2 mt-1">
                            {assetDetails.yom}
                          </div>
                        </div>
                      </div>
                    </div>
                    {commercialDetails?.period_of_insurance &&
                      commercialDetails?.period_of_insurance !== "" && (
                        <div class="flex flex-col sm:flex-row mt-4">
                          <div class="mr-auto">
                            <div class="font-medium text-gray-500">
                              Period of Insurance
                            </div>
                          </div>
                          <div class="flex">
                            <div class="text-center">
                              <div class="font-medium">
                                {commercialDetails?.period_of_insurance ||
                                  "---"}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                  </div>
                </div>
                <div class="intro-y box col-span-12 lg:col-span-4 zoom-in bg-white dark:bg-slate-700 rounded-lg">
                  <div class="flex items-center p-5 border-b border-gray-200 dark:border-dark-5">
                    <h2 class="font-medium text-base mr-auto py-3"></h2>
                  </div>
                  <div class="p-5 text-sm">
                    <div class="flex flex-col sm:flex-row">
                      <div class="mr-auto">
                        <div class="font-medium text-gray-500">
                          Purchased From
                        </div>
                      </div>
                      <div class="flex">
                        <div class="text-center text-red-600">
                          <div class="font-medium">
                            {assetDetails?.purchased_from}
                          </div>
                        </div>
                      </div>
                    </div>

                    {assetDetails?.config_data?.used_or_new &&
                      assetDetails?.config_data?.used_or_new !== "" && (
                        <div class="flex flex-col sm:flex-row mt-4">
                          <div class="mr-auto">
                            <div class="font-medium text-gray-500">
                              Used/New
                            </div>
                          </div>
                          <div class="flex">
                            <div class="text-center">
                              <div class="font-medium">
                                {assetDetails?.config_data?.used_or_new}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    {assetDetails?.config_data?.ansi_or_new &&
                      assetDetails?.config_data?.ansi_or_new !== "" && (
                        <div class="flex flex-col sm:flex-row mt-4">
                          <div class="mr-auto">
                            <div class="font-medium text-gray-500">ANSI/CE</div>
                          </div>
                          <div class="flex">
                            <div class="text-center">
                              <div class="font-medium">
                                {assetDetails?.config_data?.ansi_or_new}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    {assetDetails?.commercial_detail?.renewal_date &&
                      assetDetails?.commercial_detail?.renewal_date !== "" && (
                        <div class="flex flex-col sm:flex-row mt-4">
                          <div class="mr-auto">
                            <div class="font-medium text-gray-500">
                              Renewal Date
                            </div>
                          </div>
                          <div class="flex">
                            <div class="text-center">
                              <div class="font-medium">
                                {assetDetails?.commercial_detail?.renewal_date}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                  </div>
                </div>
                <div class="intro-y box col-span-12 lg:col-span-4 zoom-in bg-white dark:bg-slate-700 rounded-lg">
                  <div class="p-5 text-sm">
                    <div class="flex flex-col sm:flex-row">
                      <div class="mr-auto">
                        <div class="font-medium text-gray-500">
                          Diesel/Battery
                        </div>
                      </div>
                      <div class="flex">
                        <div class="text-center">
                          <div class="font-medium">
                            {assetDetails?.config_data?.battery_type || "---"}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="flex flex-col sm:flex-row mt-4">
                      <div class="mr-auto">
                        <div class="font-medium text-gray-500">
                          Engine Sr.No
                        </div>
                      </div>
                      <div class="flex">
                        <div class="text-center">
                          <div class="font-medium">
                            {assetDetails?.config_data?.engine_serial_no ||
                              "---"}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="flex flex-col sm:flex-row mt-4">
                      <div class="mr-auto">
                        <div class="font-medium text-gray-500">2WD/4WD</div>
                      </div>
                      <div class="flex">
                        <div class="text-center">
                          <div class="font-medium">
                            {assetDetails?.config_data?.two_or_four_wd || "---"}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="flex flex-col sm:flex-row mt-4">
                      <div class="mr-auto">
                        <div class="font-medium text-gray-500">Accessories</div>
                      </div>
                      <div class="flex">
                        <div class="text-center">
                          <div class="font-medium">
                            {assetDetails?.config_data?.accessories || "---"}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="flex flex-col sm:flex-row mt-4">
                      <div class="mr-auto">
                        <div class="font-medium text-gray-500">Tires</div>
                      </div>
                      <div class="flex">
                        <div class="text-center">
                          <div class="font-medium">
                            {assetDetails?.config_data?.tyres || "---"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="intro-y box col-span-12 lg:col-span-4 zoom-in bg-white dark:bg-slate-700 rounded-lg">
                  <div class="p-5 text-sm">
                    <div class="flex flex-col sm:flex-row">
                      <div class="mr-auto">
                        <div class="font-medium text-gray-500">
                          Machine Ownership Ship Type
                        </div>
                      </div>
                      <div class="flex">
                        <div class="text-center">
                          <div class="font-medium">
                            {" "}
                            {
                              assetDetails?.config_data?.machine_ownership_type
                            }{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div class="flex flex-col sm:flex-row mt-4">
                      <div class="mr-auto">
                        <div class="font-medium text-gray-500">
                          PO No.and copy placed on OEM
                        </div>
                      </div>
                      <div class="flex">
                        <div class="text-center">
                          <div class="text-gray-500"> {assetDetails?.config_data?.}</div>
                        </div>
                      </div>
                    </div> */}
                    {commercialDetails.custom_duty_value && (
                      <div class="flex flex-col sm:flex-row mt-4">
                        <div class="mr-auto">
                          <div class="font-medium text-gray-500">PO Date</div>
                        </div>
                        <div class="flex">
                          <div class="text-center">
                            <div class="font-medium">
                              {commercialDetails?.custom_duty_value}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {commercialDetails.invoice_no && (
                      <div class="flex flex-col sm:flex-row mt-4">
                        <div class="mr-auto">
                          <div class="font-medium text-gray-500">
                            Invoice No
                          </div>
                        </div>
                        <div class="flex">
                          <div class="text-center">
                            <div class="font-medium">
                              {commercialDetails?.invoice_no}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {commercialDetails.invoice_no && (
                      <div class="flex flex-col sm:flex-row mt-4">
                        <div class="mr-auto">
                          <div class="font-medium text-gray-500">
                            Invoice Date
                          </div>
                        </div>
                        <div class="flex">
                          <div class="text-center">
                            <div class="font-medium">
                              {commercialDetails?.invoice_date || "---"}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div class="intro-y box col-span-12 lg:col-span-4 zoom-in bg-white dark:bg-slate-700 rounded-lg">
                  <div class="p-5 text-sm">
                    {commercialDetails.payment_terms && (
                      <div class="flex flex-col sm:flex-row">
                        <div class="mr-auto">
                          <div class="font-medium text-gray-500">
                            Payment Terms
                          </div>
                        </div>
                        <div class="flex">
                          <div class="text-center">
                            <div class="font-medium">
                              {commercialDetails?.payment_terms}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {commercialDetails.amount_rem_to_oem && (
                      <div class="flex flex-col sm:flex-row mt-4">
                        <div class="mr-auto">
                          <div class="font-medium text-gray-500">
                            Payment Remitted to the OEM
                          </div>
                        </div>
                        <div class="flex">
                          <div class="text-center">
                            <div class="font-medium">
                              {commercialDetails?.amount_rem_to_oem}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {commercialDetails?.date_of_rem_to_oem && (
                      <div class="flex flex-col sm:flex-row mt-4">
                        <div class="mr-auto">
                          <div class="font-medium text-gray-500">
                            Date of Payment Remitted to the OEM
                          </div>
                        </div>
                        <div class="flex">
                          <div class="text-center">
                            <div class="font-medium">
                              {commercialDetails?.date_of_rem_to_oem}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {commercialDetails?.exchange_rate_rem && (
                      <div class="flex flex-col sm:flex-row mt-4">
                        <div class="mr-auto">
                          <div class="font-medium text-gray-500">
                            Exchange Rate of Remittence
                          </div>
                        </div>
                        <div class="flex">
                          <div class="text-center">
                            <div class="font-medium">
                              {commercialDetails?.exchange_rate_rem}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {commercialDetails?.custom_duty_payment && (
                      <div class="flex flex-col sm:flex-row mt-4">
                        <div class="mr-auto">
                          <div class="font-medium text-gray-500">
                            Date of Custom Duty Payment
                          </div>
                        </div>
                        <div class="flex">
                          <div class="text-center">
                            <div class="font-medium">
                              {commercialDetails?.custom_duty_payment}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div class="intro-y box col-span-12 lg:col-span-4 zoom-in bg-white dark:bg-slate-700 rounded-lg">
                  <div class="p-5 text-sm">
                    {commercialDetails.exworks_price && (
                      <div class="flex flex-col sm:flex-row">
                        <div class="mr-auto">
                          <div class="font-medium text-gray-500">
                            Ex Works Price
                          </div>
                        </div>
                        <div class="flex">
                          <div class="text-center">
                            <div class="font-medium">
                              {commercialDetails?.exworks_price}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {commercialDetails.cif_charges && (
                      <div class="flex flex-col sm:flex-row mt-4">
                        <div class="mr-auto">
                          <div class="font-medium text-gray-500">
                            CIF Charges
                          </div>
                        </div>
                        <div class="flex">
                          <div class="text-center">
                            <div class="font-medium">
                              {commercialDetails?.cif_charges}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {commercialDetails.total_cost && (
                      <div class="flex flex-col sm:flex-row mt-4">
                        <div class="mr-auto">
                          <div class="font-medium text-gray-500">
                            Total Cost
                          </div>
                        </div>
                        <div class="flex">
                          <div class="text-center">
                            <div class="font-medium">
                              {commercialDetails?.total_cost}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {commercialDetails.boe_no && (
                      <div class="flex flex-col sm:flex-row mt-4">
                        <div class="mr-auto">
                          <div class="font-medium text-gray-500">BOE No</div>
                        </div>
                        <div class="flex">
                          <div class="text-center"></div>
                          <div class="font-medium">
                            {commercialDetails?.boe_no}
                          </div>
                        </div>
                      </div>
                    )}
                    {commercialDetails?.custom_duty_value && (
                      <div class="flex flex-col sm:flex-row mt-4">
                        <div class="mr-auto">
                          <div class="font-medium text-gray-500">
                            Custom Duty Value
                          </div>
                        </div>
                        <div class="flex">
                          <div class="text-center">
                            <div class="font-medium">
                              {commercialDetails?.custom_duty_value}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div class="intro-y box col-span-12 lg:col-span-4 zoom-in bg-white dark:bg-slate-700 rounded-lg">
                  <div class="p-5 text-sm">
                    {commercialDetails.gst_amount && (
                      <div class="flex flex-col sm:flex-row">
                        <div class="mr-auto">
                          <div class="font-medium text-gray-500">
                            GST Amount
                          </div>
                        </div>
                        <div class="flex">
                          <div class="text-center">
                            <div class="font-medium">
                              {commercialDetails?.gst_amount}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {commercialDetails.exchange_rate_rem && (
                      <div class="flex flex-col sm:flex-row mt-4">
                        <div class="mr-auto">
                          <div class="font-medium text-gray-500">
                            Ex Rate as per BOE
                          </div>
                        </div>
                        <div class="flex">
                          <div class="text-center">
                            <div class="font-medium">
                              {commercialDetails?.exchange_rate_rem}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {commercialDetails.clearing_charges && (
                      <div class="flex flex-col sm:flex-row mt-4">
                        <div class="mr-auto">
                          <div class="font-medium text-gray-500">
                            Clearing Charges
                          </div>
                        </div>
                        <div class="flex">
                          <div class="text-center">
                            <div class="font-medium">
                              {commercialDetails?.clearing_charges}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {commercialDetails.cha_charges && (
                      <div class="flex flex-col sm:flex-row mt-4">
                        <div class="mr-auto">
                          <div class="font-medium text-gray-500">
                            CHA Charges
                          </div>
                        </div>
                        <div class="flex">
                          <div class="text-center">
                            <div class="font-medium">
                              {commercialDetails?.cha_charges}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {commercialDetails.transportation_charges && (
                      <div class="flex flex-col sm:flex-row mt-4">
                        <div class="mr-auto">
                          <div class="font-medium text-gray-500">
                            Transportation charges upto yard
                          </div>
                        </div>
                        <div class="flex">
                          <div class="text-center">
                            <div class="font-medium">
                              {commercialDetails?.transportation_charges}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div class="intro-y box col-span-12 lg:col-span-4 zoom-in bg-white dark:bg-slate-700 rounded-lg">
                  <div class="p-5 text-sm">
                    {commercialDetails.port_of_dispatch && (
                      <div class="flex flex-col sm:flex-row">
                        <div class="mr-auto">
                          <div class="font-medium text-gray-500">
                            Country / Port of dispatch
                          </div>
                        </div>
                        <div class="flex">
                          <div class="text-center">
                            <div class="font-medium">
                              {commercialDetails?.port_of_dispatch}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {commercialDetails.port_of_clearance && (
                      <div class="flex flex-col sm:flex-row mt-4">
                        <div class="mr-auto">
                          <div class="font-medium text-gray-500">
                            Port of clearance
                          </div>
                        </div>
                        <div class="flex">
                          <div class="text-center">
                            <div class="font-medium">
                              {commercialDetails?.port_of_clearance}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div class="intro-y box col-span-12 lg:col-span-6 dark:bg-dark-6 p-5 zoom-in bg-white dark:bg-slate-700 rounded-lg">
                  <div class="flex items-center mt-1 sm:mt-0 text-sm">
                    <div class="flex mr-auto">Created On:</div>
                    <div class="bg-blue-800 text-white text-xs rounded px-2 py-1 mt-1">
                      {epocToHumanDate !== "" ? epocToHumanDate.toString() : ""}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {innerTab === 2 && (
            <div id="assetD-photos" class="assetD-tabs  mt-4">
              <div class="grid grid-cols-12 gap-6">
                <div class="intro-y box col-span-12 bg-white dark:bg-slate-700 rounded-lg">
                  <div class="flex items-center px-5 py-5 sm:py-3 border-b border-gray-200 dark:border-dark-5">
                    <h2 class="font-medium text-base mr-auto">Asset Photos</h2>
                  </div>
                  {imageUrl.length > 0 ? (
                    <div class="grid grid-cols-3 gap-2 p-5">
                      {imageUrl.map((image) => (
                        <Image image_uri={image.image_uri} />
                      ))}
                    </div>
                  ) : (
                    <div className="p-5">No Photos Found</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {innerTab === 3 && (
            <div id="assetD-maintenance" class="assetD-tabs mt-4">
              <div className="text-right">
                <NewAssetBtn tabName="maintenance" />
              </div>
              <MaintenanceTab asset_id={id} />
            </div>
          )}

          {innerTab === 5 && (
            <div id="assetD-maintenance" class="assetD-tabs mt-4">
              <div className="text-right">
                <NewAssetBtn tabName="lease" />
              </div>
              <LeaseTab asset_id={id} />
            </div>
          )}

          {innerTab === 4 && (
            <Documents documentUrl={documentUrl} section="assets" />
          )}
          {innerTab === 6 && (
            <DeviceEvents devId={deviceId}/>
          )}
        </div>
      )}
    </>
  );
}

export default AssetDetails;

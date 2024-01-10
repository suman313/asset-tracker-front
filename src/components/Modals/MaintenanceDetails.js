import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { setBaseUrl } from "../../config";
import Loader from "../Loader";
import { LoaderContext } from "../../Context/LoaderContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PermissionContext } from "../../Context/PermissionsContext";
import downloader from "../../assets/images/icons8-download-48.png";
import galleryIcon from "../../assets/images/galleryIcon.png";
import pdfIcon from "../../assets/images/pdfIcon.png";
import Image from "../viewer/Image";
import Document from "../viewer/Document";
import Documents from "../InnerTabs/Documents";

function MaintenanceDetails() {
  const [perms] = useContext(PermissionContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [allMent, setAllMent] = useState({});
  const [parts, setParts] = useState([]);
  const [innerTab, setInnerTab] = useState(1);
  const [dataReload, setDataReload] = useState(true);
  const setLoader = useContext(LoaderContext)[1];
  const loader = useContext(LoaderContext)[0];
  const [documentUrl, setDocumentUrl] = useState([])

  const getSpecificMen = async () => {
    try {
      setLoader(true);
      const { data } = await axios.get(`${setBaseUrl}/maintenance/get_by_id`, {
        headers: {
          "Content-Type": "application/json",
          "x-access-tokens": sessionStorage.getItem("token"),
          id: id,
        },
      });
      console.log(data);
      setAllMent(data);
      setParts(data.parts);
      setDocumentUrl(data.attachments);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getSpecificMen();
    // console.log(setLoader);
  }, [dataReload]);

  if (loader) {
    return <Loader />;
  } else {
    return (
      <div id="operator-details">
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
            Maintenance Details
          </p>
          <div class="sm:flex items-center ml-auto mt-0 text-sm">
            {(perms.indexOf("MAINT.ALL") !== -1 ||
              perms.indexOf("MAINT.CRU") !== -1 ||
              perms.indexOf("ADMIN.ALL") !== -1) && (
              <span
                onClick={() =>
                  navigate(`/maintenance/update-maintenance/${id}`)
                }
                class=" ml-auto flex items-center text-lime-500 cursor-pointer mr-6"
              >
                <svg
                  class="stroke-lime-500 mr-1"
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
                </svg>{" "}
                Update Maintenance
              </span>
            )}
            <span
              onClick={() => setDataReload(!dataReload)}
              class="ml-auto flex items-center text-blue-800 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
              &nbsp;Reload Data
            </span>
          </div>
        </div>
        <div class="intro-y box px-5 pt-5 mt-5 bg-white dark:bg-slate-700 rounded-lg ">
          <div class="flex flex-col lg:flex-row border-b border-gray-200 dark:border-dark-5 pb-5 -mx-5">
            <div class="flex justify-between w-full px-5 items-center  lg:justify-between">
              <div class="ml-5">
                <div class="w-full sm:w-40 truncate sm:whitespace-normal font-medium text-lg sm:text-2xl"></div>
                <div class="font-medium text-[#62c97c]">Status: <span className="text-gray-500">{allMent.status}</span></div>
              </div>
              <div class="ml-5">
                <div class="w-24 sm:w-40 truncate sm:whitespace-normal font-medium text-lg sm:text-2xl"></div>
                <div class="text-gray-600">Types: {allMent.types}</div>
              </div>
            </div>
          </div>
          <div class="nav-tabs flex flex-col sm:flex-row justify-center lg:justify-start text-sm">
            <span
              onClick={() => setInnerTab(1)}
              class={`lease-details-tab py-4 sm:mr-8 cursor-pointer ${
                innerTab === 1 ? "assetDetailsActive" : ""
              }`}
            >
              Dashboard
            </span>
            <span
              onClick={() => setInnerTab(2)}
              class={`lease-details-tab py-4 sm:mr-8 cursor-pointer ${
                innerTab === 2 ? "assetDetailsActive" : ""
              }`}
            >
              Photos
            </span>
            <span
              onClick={() => setInnerTab(3)}
              class={`lease-details-tab py-4 sm:mr-8 cursor-pointer ${
                innerTab === 3 ? "assetDetailsActive" : ""
              }`}
            >
              Documents
            </span>
          </div>
        </div>

        {innerTab === 1 && (
          <div id="opD-dashboard" class="leaseD-tabs block mt-4">
            <div class="grid grid-cols-12 gap-6">
              <div class="intro-y box col-span-12 lg:col-span-4 zoom-in bg-white dark:bg-slate-700 rounded-lg">
                <div class="flex items-center p-5 border-b border-gray-200 dark:border-dark-5">
                  <h2 class="font-medium text-base mr-auto">Custom Feilds</h2>
                </div>
                <div class="p-5 text-sm">
                  <div class="flex flex-col sm:flex-row">
                    <div class="mr-auto">
                      <div class="font-medium text-gray-500">Asset Name</div>
                    </div>
                    <div class="flex">
                      <div class="text-center">
                        <div class="bg-lime-500 text-white text-xs rounded px-2 mt-1">
                          {allMent?.asset_no}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col sm:flex-row mt-4">
                    <div class="mr-auto">
                      <div class="font-medium text-gray-500">Description</div>
                    </div>
                    <div class="flex">
                      <div class="text-center">
                        <div class="font-medium">{allMent?.description}</div>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col sm:flex-row mt-4">
                    <div class="mr-auto">
                      <div class="font-medium text-gray-500">
                        Scheduled Date
                      </div>
                    </div>
                    <div class="flex">
                      <div class="text-center">
                        <div class="font-medium">{allMent?.scheduled_date}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row mt-4">
                    <div className="mr-auto">
                      <div className="font-medium text-[#0e7721] mx-2"> Status </div>
                    </div>
                    <div className="flex">
                      <div className="text-center">
                        <div className="bg-orange-500 text-white text-xs rounded px-2 mt-1">
                          {allMent?.status}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {parts.map((part) => (
                <div class="intro-y box col-span-12 lg:col-span-4 zoom-in bg-white dark:bg-slate-700 rounded-lg">
                  <div class="flex items-center p-5 border-b border-gray-200 dark:border-dark-5">
                    <h2 class="font-medium text-base mr-auto">
                      {part.installation ? "Parts Installed" : "Parts Removed"}
                    </h2>
                  </div>
                  <div class="p-5 text-sm">
                    <div class="flex flex-col sm:flex-row">
                      <div class="mr-auto"></div>
                      <div class="flex"></div>
                    </div>
                    <div class="flex flex-col sm:flex-row mt-4">
                      <div class="mr-auto">
                        <div class="font-medium text-gray-500">
                          Part Number:
                        </div>
                      </div>
                      <div class="flex">
                        <div class="text-center">
                          <div class="font-medium">{part.part_no}</div>
                        </div>
                      </div>
                    </div>
                    {part.installation && (
                      <div class="flex flex-col sm:flex-row mt-4">
                        <div class="mr-auto">
                          <div class="font-medium text-gray-500">Price</div>
                        </div>
                        <div class="flex">
                          <div class="text-center">
                            <div class="font-medium">{part.price}</div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div class="flex flex-col sm:flex-row mt-4">
                      <div class="mr-auto">
                        <div class="font-medium text-gray-500"> Quantity </div>
                      </div>
                      <div class="flex">
                        <div class="text-center">
                          <div class="bg-orange-500 text-white text-xs rounded px-2 mt-1">
                            {part.quantity}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {innerTab === 2 && (
          <div id="opD-assets" class="leaseD-tabs mt-4 animSlideUp relative">
            <div class="grid grid-cols-12 gap-6">
              <div class="intro-y box col-span-12 bg-white dark:bg-slate-700 rounded-lg">
                <div class="flex items-center px-5 py-5 sm:py-3   dark:border-dark-5">
                  <h2 class="font-medium text-base mr-auto">Photos</h2>
                </div>
                <div class="flex p-5">
                  {allMent.photos.length > 0 ? (
                    allMent.photos.map((image) => (
                     <Image image_uri={image.image_uri} />
                    ))
                  ) : (
                    <div>No photos found</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        {innerTab === 3 && (
          
          <Documents documentUrl={documentUrl} section="maintenance" />
        )}
      </div>
    );
  }
}

export default MaintenanceDetails;

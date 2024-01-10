import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { setBaseUrl } from "../../../config";
import { LoaderContext } from "../../../Context/LoaderContext";
import Loader from "../../Loader";
import AssetDetailsTab from "./AssetDetailsTab";
import MaintenanceTab from "../AssetDetails/MaintenanceTab";
import { useNavigate, useParams } from "react-router-dom";
import downloader from "../../../assets/images/icons8-download-48.png";
import NewAssetBtn from "../../Buttons/NewAssetBtn";
import { PermissionContext } from "../../../Context/PermissionsContext";
import pdfIcon from "../../../assets/images/pdfIcon.png";
import galleryIcon from "../../../assets/images/galleryIcon.png";
import Document from "../../viewer/Document";
import PdfViewer from "../../viewer/PdfViewer";
import Image from "../../viewer/Image";
import Documents from "../../InnerTabs/Documents";

function LeaseDetails() {
  const [perms] = useContext(PermissionContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [leaseSpecificDetails, setLeaseSpecificDetails] = useState({});
  const [leaseInAsset, setLeaseInAsset] = useState("");
  const [innerTab, setInnerTab] = useState(1);
  const [imageUrl, setImageUrl] = useState([]);
  const [documentUrl, setDocumentUrl] = useState([]);
  const [invoice, setInvoice] = useState([]);
  const [loader, setLoader] = useContext(LoaderContext);
  const get_lease_details = async () => {
    try {
      setLoader(true);
      const { data } = await axios.get(`${setBaseUrl}/lease/get_data_by_id`, {
        headers: {
          "Content-Type": "application/json",
          "x-access-tokens": sessionStorage.getItem("token"),
          id: id,
        },
      });
      console.log(data);
      setLeaseInAsset(data.asset_id);
      setLeaseSpecificDetails(data);

      setImageUrl(data?.photos);

      setDocumentUrl(data?.attachments);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const get_invoice = async () => {
    try {
      const { data } = await axios.get(`${setBaseUrl}/lease/get-invoice`, {
        headers: {
          "x-access-tokens": sessionStorage.getItem("token"),
          "lease-id": id,
        },
      });
      console.log(data);
      setInvoice(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    get_lease_details();
    get_invoice();
  }, []);

  if (loader) {
    return <Loader />;
  } else {
    return (
      <div id="lease-details" className="">
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
            Lease Details
          </p>
          <div class="sm:flex items-center ml-auto mt-0 hidden text-sm">
            {(perms.indexOf("ADMIN.ALL") !== -1 ||
              perms.indexOf("ASSETS.ALL") !== -1 ||
              perms.indexOf("ASSETS.CRU") !== -1) && (
              <span
                class=" ml-auto flex items-center text-lime-500 cursor-pointer mr-6"
                onClick={() => navigate("/lease/leaseUpdate/" + id)}
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
                Update Lease
              </span>
            )}

            <span class="ml-auto flex items-center text-blue-800 cursor-pointer">
              <svg
                class="stroke-blue-800 mr-1"
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
              </svg>{" "}
              Reload Data
            </span>
          </div>
        </div>
        <div class="intro-y box px-5 pt-5 mt-5 bg-white dark:bg-slate-700 rounded-lg ">
          <div class="flex flex-col lg:flex-row border-b border-gray-200 dark:border-dark-5 pb-5 -mx-5">
            <div class="flex flex-1 px-5 items-center justify-center lg:justify-start">
              <div class="ml-5">
                <div class="w-24 sm:w-40 truncate sm:whitespace-normal font-medium text-lg sm:text-2xl"></div>
                <div class="text-gray-600">
                  <span className="mx-2 text-lg text-gray-500">Status:</span>
                  <span className="text-[#61c755] text-base">
                    {leaseSpecificDetails?.lease_status}
                  </span>
                </div>
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
                  class="w-4 h-4 mr-2 feather feather-calendar"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                Rental Start Date:
                <span class="bg-lime-500 text-white rounded px-2 text-xs ml-4 py-1">
                  {leaseSpecificDetails?.rental_start_date}
                </span>
              </div>
            </div>
            <div class="flex text-sm mt-6 lg:mt-0 items-center lg:items-start flex-1 flex-col justify-center text-gray-600 dark:text-gray-300 px-5 border-l  border-gray-200 dark:border-dark-5 border-t lg:border-t-0 pt-5 lg:pt-0">
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
                  class="w-4 h-4 mr-2 feather feather-calendar"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                Rental End Date:
                <span class="bg-red-500 text-white rounded px-2 text-xs ml-4 py-1">
                  {leaseSpecificDetails?.rental_end_date}
                </span>
              </div>
            </div>
          </div>
          <div class="nav-tabs flex flex-col sm:flex-row justify-center lg:justify-start text-sm">
            <span
              onClick={() => setInnerTab(1)}
              className={`lease-details-tab py-4 sm:mr-8 cursor-pointer ${
                innerTab === 1 && "assetDetailsActive"
              } `}
            >
              Dashboard
            </span>
            <span
              onClick={() => setInnerTab(2)}
              className={`lease-details-tab py-4 sm:mr-8 cursor-pointer ${
                innerTab === 2 && "assetDetailsActive"
              } `}
            >
              Assets
            </span>
            <span
              onClick={() => setInnerTab(3)}
              className={`lease-details-tab py-4 sm:mr-8 cursor-pointer ${
                innerTab === 3 && "assetDetailsActive"
              } `}
            >
              Maintenance
            </span>
            <span
              onClick={() => setInnerTab(4)}
              className={`asset-details-tab py-4 sm:mr-8 cursor-pointer ${
                innerTab === 4 ? "assetDetailsActive" : ""
              }`}
            >
              Photos
            </span>
            <span
              onClick={() => setInnerTab(5)}
              className={`asset-details-tab py-4 sm:mr-8 cursor-pointer ${
                innerTab === 5 ? "assetDetailsActive" : ""
              }`}
            >
              Documents
            </span>
            <span
              onClick={() => setInnerTab(6)}
              className={`asset-details-tab py-4 sm:mr-8 cursor-pointer ${
                innerTab === 6 ? "assetDetailsActive" : ""
              }`}
            >
              Invoice Details
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
                      <div class="font-medium text-gray-500">
                        Customer PO No
                      </div>
                    </div>
                    <div class="flex">
                      <div class="text-center">
                        <div class="bg-lime-500 text-white text-xs rounded px-2 mt-1">
                          {leaseSpecificDetails?.customer_po_no}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col sm:flex-row mt-4">
                    <div class="mr-auto">
                      <div class="font-medium text-gray-500">Customer</div>
                    </div>
                    <div class="flex">
                      <div class="text-center">
                        <div class="font-medium">
                          {leaseSpecificDetails?.customer}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col sm:flex-row mt-4">
                    <div class="mr-auto">
                      <div class="font-medium text-gray-500">Cuerrency</div>
                    </div>
                    <div class="flex">
                      <div class="text-center">
                        <div class="font-medium">
                          {leaseSpecificDetails?.currency}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col sm:flex-row mt-4">
                    <div class="mr-auto">
                      <div class="font-medium text-gray-500"> Status </div>
                    </div>
                    <div class="flex">
                      <div class="text-center">
                        <div class="bg-orange-500 text-white text-xs rounded px-2 mt-1">
                          {leaseSpecificDetails?.lease_status}
                        </div>
                      </div>
                    </div>
                  </div>
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
                        Contract Value
                      </div>
                    </div>
                    <div class="flex">
                      <div class="text-center">
                        <div class="font-medium">
                          {leaseSpecificDetails?.contract_value}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col sm:flex-row mt-4">
                    <div class="mr-auto">
                      <div class="font-medium text-gray-500">
                        Transportation Charges
                      </div>
                    </div>
                    <div class="flex">
                      <div class="text-center">
                        <div class="font-medium">
                          {" "}
                          {leaseSpecificDetails?.transportation_charge}{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col sm:flex-row mt-4">
                    <div class="mr-auto">
                      <div class="font-medium text-gray-500">Normal Amount</div>
                    </div>
                    <div class="flex">
                      <div class="text-center">
                        <div class=" font-medium">
                          {leaseSpecificDetails?.normal_amount}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col sm:flex-row mt-4">
                    <div class="mr-auto">
                      <div class="font-medium text-gray-500">
                        Overtime Amount
                      </div>
                    </div>
                    <div class="flex">
                      <div class="text-center">
                        <div class=" font-medium">
                          {leaseSpecificDetails?.overtime_amount}
                        </div>
                      </div>
                    </div>
                  </div>
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
                        Reimbursements
                      </div>
                    </div>
                    <div class="flex">
                      <div class="text-center">
                        <div class="bg-lime-500 text-white text-xs rounded px-2 mt-1">
                          {leaseSpecificDetails?.reimbursements}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col sm:flex-row mt-4">
                    <div class="mr-auto">
                      <div class="font-medium text-gray-500">
                        Total Claimable Amount
                      </div>
                    </div>
                    <div class="flex">
                      <div class="text-center">
                        <div class="font-medium">
                          {leaseSpecificDetails?.total_claimable_amount}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col sm:flex-row mt-4">
                    <div class="mr-auto">
                      <div class="font-medium text-gray-500">
                        Rental Start Date
                      </div>
                    </div>
                    <div class="flex">
                      <div class="text-center">
                        <div class="bg-lime-500 text-white text-xs rounded px-2 mt-1">
                          {leaseSpecificDetails?.rental_start_date}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col sm:flex-row mt-4">
                    <div class="mr-auto">
                      <div class="font-medium text-gray-500">
                        {" "}
                        Rental End Date{" "}
                      </div>
                    </div>
                    <div class="flex">
                      <div class="text-center">
                        <div class="bg-red-500 text-white text-xs rounded px-2 mt-1">
                          {leaseSpecificDetails?.rental_end_date}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div class="intro-y box col-span-12 lg:col-span-12 zoom-in bg-white dark:bg-slate-700 rounded-lg">
              <div class="p-5 text-sm">
                <div class="flex flex-col sm:flex-row">
                  <div class="mr-auto">
                    <div class="font-medium text-gray-500">Created on</div>
                  </div>
                  <div class="flex">
                    <div class="text-center ">
                      <div class="bg-blue-800 text-white text-xs rounded px-2 mt-1">
                      
                      - - -
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            </div>
          </div>
        )}

        {innerTab === 2 && (
          <div id="opD-assets" class="leaseD-tabs  mt-4 animSlideUp relative">
            <div className="text-right">
              <NewAssetBtn tabName="asset" />
            </div>
            <AssetDetailsTab asset_id={leaseInAsset} leaseId={id} />
          </div>
        )}
        {innerTab === 3 && (
          <div
            id="opD-operators"
            class="leaseD-tabs  mt-4 animSlideUp relative"
          >
            <div className="text-right">
              <NewAssetBtn tabName="maintenance" />
            </div>
            <MaintenanceTab lease_id={id} />
          </div>
        )}
        {innerTab === 4 && (
          <div id="assetD-photos" class="assetD-tabs  mt-4">
            <div class="grid grid-cols-12 gap-6">
              <div class="intro-y box col-span-12 bg-white dark:bg-slate-700 rounded-lg">
                <div class="flex items-center px-5 py-5 sm:py-3 border-b border-gray-200 dark:border-dark-5">
                  <h2 class="font-medium text-base mr-auto">Lease Photos</h2>
                </div>
                <div class="grid grid-cols-3 gap-5 p-5">
                  {imageUrl.length > 0 ? (
                    imageUrl.map((image) => (
                      <Image image_uri={image?.image_uri} />
                    ))
                  ) : (
                    <div>No Photos found..</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        {innerTab === 5 && (
          <Documents documentUrl={documentUrl} section="lease" />
        )}
        {innerTab === 6 && (
          <div class="assetD-tabs  mt-4">
            <div class="grid grid-cols-12 gap-6">
              <div class="intro-y box col-span-12 bg-white dark:bg-slate-700 rounded-lg p-4">
                <table className="w-full text-center border-separate border-spacing-6 border  ">
                  <thead>
                    <tr>
                      <th>Invoice Name</th>
                      <th>Invoice Number</th>
                      <th>Invoice Date</th>
                      <th>Operator Name</th>
                      <th>Document</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.map((item) => (
                      <tr>
                        <td>{item.invoice_name}</td>
                        <td>{item.invoice_no}</td>
                        <td>{item.invoice_date}</td>
                        <td>{item.operator_name}</td>
                        <td>
                          <div className="flex justify-center items-center">
                            <p>
                              {
                                item.documents_link.split(
                                  "test-2023-durbin.s3.amazonaws.com/invoice/invoice"
                                )[1]
                              }
                            </p>
                            <a
                              href={`https://${item?.documents_link}`}
                              target="_blank"
                              className="self-end"
                            >
                              <img
                                src={downloader}
                                alt="Download"
                                style={{
                                  width: "35px",
                                  height: "35px",
                                  margin: "0.30rem",
                                }}
                              />
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
      </div>
    );
  }
}

export default LeaseDetails;

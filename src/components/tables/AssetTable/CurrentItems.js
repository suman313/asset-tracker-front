import axios from "axios";
import React, { useEffect, useState } from "react";
import { setBaseUrl } from "../../../config";
import { TableLoader } from "../../TableLoader";
import { useNavigate } from "react-router-dom";
import { PermissionContext } from "../../../Context/PermissionsContext";
import { useContext } from "react";
import telematicsLogo from "../../../assets/images/telematics/telematics.svg"

export const CurrentItems = ({
  assetDetails,
  setLoader,
  deleted,
  setDeleted,
}) => {
  const [perms, setPerms] = useContext(PermissionContext);
  const navigate = useNavigate();
  const [tableAnimation, setTableAnimation] = useState(false);
  const openAssetDetails = (id, telematics = false) => {
    if (telematics) navigate("/assets/AssetDetails/" + id + "/" + telematics);
    else navigate("/assets/AssetDetails/" + id);
  };

  const openAssetUpdateTab = (id) => {
    navigate("updateAsset/" + id);
  };
  const deleteAsset = async (id) => {
    try {
      setLoader(true);
      const { data } = axios.delete(
        `${setBaseUrl}/asset/delete`,
        {
          id: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-tokens": sessionStorage.getItem("token"),
          },
        }
      );
      setDeleted((prev) => !prev);
    } catch (error) {
      console.log(error);
      alert(error.message);
    } finally {
      setLoader(false);
      return;
    }
  };
  useEffect(() => {
    // console.log(assetDetails)
    setTimeout(() => {
      setTableAnimation(true);
    }, 400);
  }, [deleted]);
  return (
    <>
      <div className="intro-y overflow-auto lg:overflow-y-scroll mt-8 sm:mt-0 h-[60vh] ">
        {assetDetails === undefined || assetDetails.length === 0 ? (
          <div className="h-[50vh] flex justify-center items-center">
            No Data available
          </div>
        ) : (
          <table
            className={`table ${
              tableAnimation ? "show-rows" : ""
            } cascade-slide  border-separate border-spacing-y-3  sm:mt-2 w-full relative`}
          >
            {/* <!--Table Headers--> */}
            <thead className="sticky top-0 bg-[#fff]">
              <tr className="text-base transition-transform duration-300 ease-in-out transform">
                <th className="w-40 text-center whitespace-no-wrap px-5 py-3 font-medium">
                  ASSET NO
                </th>
                <th className="w-52 whitespace-no-wrap  font-medium">
                  BRAND &amp; MODEL
                </th>
                <th className="w-60 text-center whitespace-no-wrap px-5 py-3 font-medium">
                  SERIAL NO
                </th>
                <th className="w-60 text-center whitespace-no-wrap px-5 py-3 font-medium">
                  Lease Status
                </th>
                <th className="w-56 text-center whitespace-no-wrap px-5 py-3 font-medium">
                  CATEGORY
                </th>
                <th className="w-40 text-center whitespace-no-wrap px-5 py-3 font-medium">
                  YOM
                </th>
                <th className="w-40 text-center whitespace-no-wrap px-5 py-3 font-medium">
                  CREATED ON
                </th>
                <th className="w-72 text-center whitespace-no-wrap px-5 py-3 font-medium">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {assetDetails.map((data, index) => (
                <tr
                  key={index}
                  style={{ animationDelay: `${0.3 + index * 0.05}s` }}
                  className="intro-x  text-sm rounded-lg bg-white dark:bg-gray-900 shadow-sm hover:shadow-xl text-gray-600 dark:text-slate-100 cursor-pointer"
                >
                  <td
                    onClick={() => openAssetDetails(data?.id)}
                    className="text-center"
                  >
                    {" "}
                    {data?.asset_no}
                  </td>
                  <td
                    onClick={() => openAssetDetails(data?.id)}
                    className="text-center py-3 rounded-l-lg "
                  >
                    <a href="" className="font-medium whitespace-no-wrap">
                      {data?.brand}
                    </a>
                    <div className="text-gray-400 text-xs whitespace-no-wrap">
                      {data?.model}
                    </div>
                  </td>
                  <td
                    onClick={() => openAssetDetails(data?.id)}
                    className="text-center"
                  >
                    {" "}
                    {data?.serial_no}
                  </td>
                  <td
                    onClick={() => openAssetDetails(data?.id)}
                    className="text-center text-green-500 text-base font-medium"
                  >
                    {" "}
                    {data?.lease_status}
                  </td>
                  <td
                    onClick={() => openAssetDetails(data?.id)}
                    className="text-center"
                  >
                    {" "}
                    {data?.category}{" "}
                  </td>
                  <td onClick={() => openAssetDetails(data?.id)} className="">
                    <div className="flex items-center justify-center font-medium text-lime-600 dark:text-white">
                      {data?.yom}
                    </div>
                  </td>
                  <td onClick={() => openAssetDetails(data?.id)} className="">
                    <div className="flex items-center justify-center">
                      <span className="py-1 px-2 rounded text-xs bg-blue-700 text-white">
                        {new Date(data.created_at * 1000).toLocaleDateString(
                          "en-US"
                        )}
                      </span>
                    </div>
                  </td>
                  <td className="table-report__action w-56 rounded-r-lg">
                    <div className="flex justify-center items-center">
                      {(perms.indexOf("ADMIN.ALL") !== -1 ||
                        perms.indexOf("ASSETS.ALL") !== -1 ||
                        perms.indexOf("ASSETS.CRU") !== -1) && (
                        <>
                          <div
                            onClick={() => openAssetUpdateTab(data?.id)}
                            className="flex items-center justify-center text-gray-500 cursor-pointer mr-4"
                          >
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
                              className="w-4 h-4 mr-2 feather feather-edit"
                            >
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>{" "}
                            Update
                          </div>
                          <div
                            onClick={() => openAssetDetails(data?.id, true)}
                            className="flex items-center justify-center text-gray-500 cursor-pointer mr-4"
                          >
                           <img src={telematicsLogo} alt="telematics" style={{"height": "20px", "width":"20px"}}/>
                            <p className="text-[#c0543c] pl-1">Telematics</p>
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {/* <!--Table Row  1--> */}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

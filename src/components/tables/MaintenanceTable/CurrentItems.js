import React, { useEffect, useState } from "react";
import { setBaseUrl } from "../../../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PermissionContext } from "../../../Context/PermissionsContext";
import { useContext } from "react";
import { LoaderContext } from "../../../Context/LoaderContext";

function CurrentItems({ deleted, setDeleted, allMaintenance}) {
  const [tableAnimation, setTableAnimation] = useState(false)
  const [perms] = useContext(PermissionContext);
  const [loader, setLoader] = useContext(LoaderContext);
  const navigate = useNavigate()
  const deleteMaintenance = async (id) => {
    try {
      setLoader(true);
      const { data } = await axios.delete(
        `${setBaseUrl}/maintenance/delete`,
        
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-tokens": sessionStorage.getItem("token"),
          },
          data: {
            id: id
          }
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
  const openDetailsOnClick = (id) => {
    
    navigate("/maintenance/maintenaneDetails/"+id)
  };

  const handleUpdate = (id) => {
    navigate("/maintenance/update-maintenance/"+id)
  };
  useEffect(() => {
    setTimeout(() => {
      setTableAnimation(true);
    },400)
  }, [])
  return (
    <div class="intro-y overflow-auto lg:overflow-y-scroll mt-8 sm:mt-0 h-[60vh] ">
      {allMaintenance === undefined || allMaintenance.length === 0 ? (
        <div className="h-[50vh] flex justify-center items-center">
          No Data available
        </div>
      ) : (
        <table className={`table ${tableAnimation? "show-rows" : ""} cascade-slide border-separate border-spacing-y-3  sm:mt-2 w-full`}>
          <thead className="sticky top-0 bg-[#fff] rounded-md">
            <tr class="text-sm  text-slate-600 dark:text-white">
              <th class="w-40 whitespace-no-wrap font-medium">In Asset</th>
              <th class="w-32 text-center whitespace-no-wrap px-5 py-1 font-medium ">
                Scheduled date
              </th>
              <th class="w-56 text-center whitespace-no-wrap px-5 py-1 font-medium">
                Status
              </th>
              <th class="w-52 text-center whitespace-no-wrap px-5 py-1 font-medium">
                Types
              </th>
              <th class="w-72 text-center whitespace-no-wrap px-5 py-1 font-medium">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {allMaintenance.map((item) => (
              <tr class="intro-x zoom-in text-sm rounded-lg bg-white dark:bg-gray-900 shadow-sm hover:shadow-xl text-gray-600  dark:text-slate-200">
                <td
                  onClick={() => openDetailsOnClick(item.id)}
                  class="text-center py-3 rounded-l-lg "
                >
                  <a href="" class="font-medium whitespace-no-wrap">
                    {item?.asset_no}
                  </a>
                </td>
                <td
                  onClick={() => openDetailsOnClick(item.id)}
                  class="text-center"
                >
                  {" "}
                  {item?.scheduled_date}{" "}
                </td>
                <td
                  onClick={() => openDetailsOnClick(item.id)}
                  class="text-center"
                >
                  {" "}
                  {item?.status}{" "}
                </td>

                <td onClick={() => openDetailsOnClick(item.id)} class="">
                  <div class="flex items-center justify-center text-red-600 dark:text-white">
                    {item?.types}
                  </div>
                </td>
                {/* <td class="text-center"> 15 </td>
                <td class="text-center"> 367 </td> */}
                <td class="table-report__action w-56 rounded-r-lg">
                  <div class="flex justify-center items-center">
                    {(perms.indexOf("MAINT.ALL")!==-1 || perms.indexOf("MAINT.CRU")!==-1 || perms.indexOf("ADMIN.ALL")!==-1) &&<div
                      class="flex items-center justify-center text-gray-500 cursor-pointer mr-4"
                      onClick={() => {
                        handleUpdate(item.id);
                      }}
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
                    </div>}
                    {(perms.indexOf("ASSETS.ALL")!==-1 || perms.indexOf("ADMIN.ALL")!==-1) &&<div
                      onClick={() => deleteMaintenance(item.id)}
                      class="flex items-center justify-center cursor-pointer text-red-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="23px"
                        height="23px"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="w-4 h-4 mr-2 feather feather-trash stroke-red-600 pr-1"
                      >
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>{" "}
                      Delete
                    </div>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CurrentItems;

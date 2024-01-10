import axios from "axios";
import React, { useState } from "react";
import { setBaseUrl } from "../../../config";
import { PermissionContext } from "../../../Context/PermissionsContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoaderContext } from "../../../Context/LoaderContext";
import { useEffect } from "react";

function CurrentItems({ allOperators, deleted, setDeleted }) {
  const [tableAnimation, setTableAnimation] = useState(false);
  const [loader, setLoader] = useContext(LoaderContext);
  const [perms] = useContext(PermissionContext);
  const navigate = useNavigate();

  const openDetailsOnClick = (id) => {
    navigate(`details/${id}`);
  };

  const openUpdateOperator = (id) => {
    navigate(`updateOperator/${id}`);
  };
  const deleteOperator = async (id) => {
    try {
      setLoader(true);
      const { data } = await axios.delete(`${setBaseUrl}/operator/delete`, {
        headers: {
          "Content-Type": "application/json",
          "x-access-tokens": sessionStorage.getItem("token"),
        },
        data: { id: id },
      });
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
    setTimeout(() => {
      setTableAnimation(true);
    }, 100);
  }, [loader]);
  return (
    <div class="intro-y overflow-auto lg:overflow-y-scroll mt-8 sm:mt-0 h-[60vh]">
      {allOperators === undefined || allOperators.length === 0 ? (
        <div className="h-[50vh] flex justify-center items-center">
          No Data available
        </div>
      ) : (
        <table
          className={`table ${
            tableAnimation ? "show-rows" : ""
          } cascade-slide border-separate border-spacing-y-3  sm:mt-2 w-full relative`}
        >
          <thead className="sticky top-0 bg-[#fff]">
            <tr className="text-sm  text-slate-600 dark:text-white z-[2] text-[#8c7474]">
              <th className="w-40 whitespace-no-wrap font-medium py-3">Name</th>
              <th className="w-32 text-center whitespace-no-wrap px-5 py-1 font-medium ">
                Addhar Number
              </th>
              <th className="w-56 text-center whitespace-no-wrap px-5 py-1 font-medium">
                PF A/C Number
              </th>
              <th className="w-52 text-center whitespace-no-wrap px-5 py-1 font-medium">
                Joinig Date
              </th>
              <th className="w-52 text-center whitespace-no-wrap px-5 py-1 font-medium">
                Leaving Date
              </th>
              <th className="w-72 text-center whitespace-no-wrap px-5 py-1 font-medium">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {allOperators.map((item) => (
              <tr className="intro-x  text-sm rounded-lg bg-white dark:bg-gray-900 shadow-sm hover:shadow-xl text-gray-600  dark:text-slate-200 cursor-pointer">
                <td
                  onClick={() => openDetailsOnClick(item.id)}
                  className="text-center py-3 rounded-l-lg "
                >
                  <a href="" class="font-medium whitespace-no-wrap">
                    {item?.name}
                  </a>
                </td>
                <td
                  onClick={() => openDetailsOnClick(item.id)}
                  className="text-center"
                >
                  {item.aadhar_no === undefined || item.aadhar_no === ""
                    ? "no data available"
                    : item.aadhar_no}
                </td>
                <td
                  onClick={() => openDetailsOnClick(item.id)}
                  className="text-center"
                >
                  {item.pf_account_no === undefined || item.pf_account_no === ""
                    ? "no data availabel"
                    : item.pf_account_no}
                </td>

                <td onClick={() => openDetailsOnClick(item.id)} className="">
                  <div className="flex items-center justify-center text-red-600 dark:text-white">
                    {item.joining_date === undefined || item.joining_date === ""
                      ? "no data available"
                      : item.joining_date}
                  </div>
                </td>
                <td onClick={() => openDetailsOnClick(item.id)} className="">
                  <div className="flex items-center justify-center text-red-600 dark:text-white">
                    {item.leaving_date === undefined || item.leaving_date === ""
                      ? "no data available"
                      : item.leaving_date}
                  </div>
                </td>
                {/* <td className="text-center"> 15 </td>
                <td class="text-center"> 367 </td> */}
                <td class="table-report__action w-56 rounded-r-lg">
                  <div class="flex justify-center items-center">
                    {(perms.indexOf("OPERATOR.ALL") !== -1 ||
                      perms.indexOf("OPERATOR.CRU") !== -1 ||
                      perms.indexOf("ADMIN.ALL") !== -1) && (
                      <div
                        onClick={() => openUpdateOperator(item.id)}
                        class="flex items-center justify-center text-gray-500 cursor-pointer mr-4"
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
                    )}
                    {(perms.indexOf("OPERATOR.ALL") !== -1 ||
                      perms.indexOf("ADMIN.ALL") !== -1) && (
                      <div
                        onClick={() => deleteOperator(item.id)}
                        class="flex items-center justify-center cursor-pointer text-red-600"
                      >
                        <svg
                          className="stroke-red-600 pr-1 w-4 h-4 mr-2 feather feather-trash"
                          xmlns="http://www.w3.org/2000/svg"
                          width="23px"
                          height="23px"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>{" "}
                        Delete
                      </div>
                    )}
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

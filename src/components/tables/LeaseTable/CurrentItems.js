import axios from "axios";
import React, { useEffect, useState } from "react";
import { setBaseUrl } from "../../../config";
import { useNavigate } from "react-router-dom";
import { PermissionContext } from "../../../Context/PermissionsContext";
import { useContext } from "react";

export const CurrentItems = ({
  setTabNo,
  leaseDetails,
  leaseId,
  setLeaseId,
  loader,
  setLoader,
  deleted,
  setDeleted,
}) => {
  const [perms] = useContext(PermissionContext);
  const navigate = useNavigate();
  const [tableAnimation, setTableAnimation] = useState(false);
  const deleteLease = async (id) => {
    console.log(id);
    try {
      setLoader(true);
      const { data } = axios.delete(
        `${setBaseUrl}/lease/delete`,

        {
          headers: {
            "Content-Type": "application/json",
            "x-access-tokens": sessionStorage.getItem("token"),
          },
          data: {
            id: id,
          },
        }
      );
      setDeleted(!deleted);
    } catch (error) {
      console.log(error);
      alert(error.message);
    } finally {
      setLoader(false);
      return;
    }
  };

  const handleClick = (id) => {
    navigate("/lease/leaseDetails/" + id);
  };

  const handleUpdate = (id) => {
    navigate("/lease/leaseUpdate/" + id);
  };
  useEffect(() => {
    setTimeout(() => {
      setTableAnimation(true);
    }, 400);
  }, [deleted]);
  return (
    <div className="intro-y overflow-auto lg:overflow-y-scroll mt-8 sm:mt-0 h-[60vh]">
      {leaseDetails === undefined || leaseDetails.length === 0 ? (
        <div className="h-[50vh] flex justify-center items-center">
          No Data available
        </div>
      ) : (
        <table
          className={`table ${
            tableAnimation ? "show-rows" : ""
          } cascade-slide border-separate border-spacing-y-3  sm:mt-2 w-full animSlideleft relative`}
        >
          <thead className="sticky top-0 bg-[#fff]">
            <tr className="text-base">
              <th className="w-52 whitespace-no-wrap  font-medium">
                Asset No.
              </th>
              <th className="w-52 whitespace-no-wrap  font-medium">
                Sales Person
              </th>
              {/* <th className="w-52 whitespace-no-wrap  font-medium">
                  CUSTOMER PO NO
                </th> */}
              <th className="w-40 text-center whitespace-no-wrap px-5 py-3 font-medium">
                ODOO ORDER ID
              </th>
              <th className="w-40 text-center whitespace-no-wrap px-5 py-3 font-medium">
                CUSTOMER
              </th>

              <th className="w-60 text-center whitespace-no-wrap px-5 py-3 font-medium">
                TOTAL AMOUNT
              </th>
              <th className="w-56 text-center whitespace-no-wrap px-5 py-3 font-medium">
                START DATE
              </th>
              <th className="w-40 text-center whitespace-no-wrap px-5 py-3 font-medium">
                END DATE
              </th>
              <th className="w-40 text-center whitespace-no-wrap px-5 py-3 font-medium">
                STATUS
              </th>
              <th className="w-72 text-center whitespace-no-wrap px-5 py-3 font-medium">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {leaseDetails.map((item) => (
              <tr className="intro-x zoom-in text-sm rounded-lg bg-white dark:bg-gray-900 shadow-sm hover:shadow-xl text-gray-600 dark:text-slate-100">
                <td
                  onClick={() => handleClick(item.id)}
                  className="text-center py-3 rounded-l-lg "
                >
                  {item.asset_no}
                </td>
                <td
                  onClick={() => handleClick(item.id)}
                  className="text-center py-3 rounded-l-lg "
                >
                  {item?.sale_person}
                </td>
                <td
                  onClick={() => handleClick(item.id)}
                  className="text-center py-3 rounded-l-lg "
                >
                  {item?.odoo_order_id===null? "Blank" : item.odoo_order_id}
                </td>

                <td
                  onClick={() => handleClick(item.id)}
                  className="text-center"
                >
                  {item.customer}{" "}
                </td>
                <td
                  onClick={() => handleClick(item.id)}
                  className="text-center"
                >
                  {" "}
                  {item.total_claimable_amount}{" "}
                </td>
                <td
                  onClick={() => handleClick(item.id)}
                  className="text-center"
                >
                  {" "}
                  <span className="py-1 px-2 rounded text-xs bg-blue-700 text-white">
                    {" "}
                    {item.rental_start_date}
                  </span>{" "}
                </td>
                <td
                  onClick={() => handleClick(item.id)}
                  className="text-center"
                >
                  <span className="py-1 px-2 rounded text-xs bg-orange-400 text-white">
                    {" "}
                    {item.rental_end_date}
                  </span>
                </td>
                <td className="">
                  <div className="flex items-center justify-center">
                    {item.lease_status}
                  </div>
                </td>
                <td className="table-report__action w-56 rounded-r-lg">
                  <div className="flex justify-center items-center">
                    {(perms.indexOf("LEASE.ALL") !== -1 ||
                      perms.indexOf("LEASE.CRU") !== -1 ||
                      perms.indexOf("ADMIN.ALL") !== -1) && (
                      <div
                        onClick={() => handleUpdate(item.id)}
                        className="flex items-center justify-center text-gray-500 cursor-pointer mr-4"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24px"
                          height="24px"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
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
                    {(perms.indexOf("LEASE.ALL") !== -1 ||
                      perms.indexOf("ADMIN.ALL") !== -1) && (
                      <div
                        onClick={() => deleteLease(item.id)}
                        className="flex items-center justify-center cursor-pointer text-red-600"
                      >
                        <svg
                          className="stroke-red-600 pr-1"
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
};

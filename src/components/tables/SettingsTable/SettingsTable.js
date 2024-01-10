import React, { useEffect, useState } from "react";
import verified from "../../../assets/images/verified.svg";
import unverified from "../../../assets/images/unverified-16.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setBaseUrl } from "../../../config";
import { Pagination } from "../Pagination";
import Loader from "../../Loader";
function SettingsTable() {
  const navigate = useNavigate();
  const [tableAnimation, setTableAnimation] = useState(false);
  const [allEmployees, setAllEmployees] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [items, setItems] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [loader, setLoader] = useState(false);

  const getAllEmployees = async () => {
    try {
      setLoader(true);
      const { data } = await axios.get(`${setBaseUrl}/company/all_employee`, {
        headers: {
          "Content-Type": "application/json",
          "x-access-tokens": sessionStorage.getItem("token"),
        },
      });
      console.log(data);
      setItems(data.length)
      setAllEmployees(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const updateEmployee = async (email) => {
    navigate(`/settings/update-employee/${email}`);
  };

  useEffect(() => {
    getAllEmployees();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setTableAnimation(true);
    }, 400);
  }, []);

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className="h-full w-full">
          <div className="flex justify-between items-center mx-10 my-0">
            <p className="inline  text-xl font-medium text-slate-700 dark:text-slate-200">
              Employees
            </p>
            <button
              onClick={() => navigate("addEmployee")}
              className="bg-[#243CA7] my-5 px-7 py-2 text-white rounded text-xl"
            >
              + Add
            </button>
          </div>
          <div>
            <div class="intro-y mx-10 overflow-auto lg:overflow-visible mt-8 sm:mt-0">
              <table
                className={`table ${
                  tableAnimation ? "show-rows" : ""
                } border-separate border-spacing-y-3  sm:mt-2 w-full animSlideleft relative`}
              >
                {/* <!--Table Headers--> */}
                <thead>
                  <tr class="text-base">
                    <th class="w-52 whitespace-no-wrap  font-medium pl-4 text-start">
                      Employee
                    </th>
                    <th
                      class="w-40 text-center whitespace-no-wrap px-5 py-3 font-medium"
                      colSpan={2}
                    >
                      Email
                    </th>
                    <th class="w-60 text-center whitespace-no-wrap px-5 py-3 font-medium">
                      verified
                    </th>
                    <th class="w-60 text-center whitespace-no-wrap px-5 py-3 font-medium">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allEmployees.map((data) => (
                    <tr onclick="showDiv('asset-details','main-assets')"
                    className="cascade-slide">
                      <td class="pl-4 py-3 rounded-l-lg ">
                        <div class="text-gray-400 text-md whitespace-no-wrap">
                          {data.name}
                        </div>
                      </td>
                      <td
                        class="pl-4 py-3 rounded-l-lg text-center"
                        colSpan={2}
                      >
                        <div class="text-gray-400 text-md whitespace-no-wrap">
                          {data.email}
                        </div>
                      </td>
                      <td class="pl-4 py-3 rounded-l-lg text-center">
                        {data.verified ? (
                          <div class="flex items-center justify-center cursor-pointer text-red-600">
                            <img
                              src={verified}
                              alt="verified"
                              style={{ width: "25px", height: "25px" }}
                            />
                          </div>
                        ) : (
                          <div class="flex items-center justify-center cursor-pointer text-red-600">
                            <img
                              src={unverified}
                              alt="un-verified"
                              style={{ width: "25px", height: "25px" }}
                            />
                          </div>
                        )}
                      </td>
                      <td className="pl-4 py-3 rounded-l-lg text-center">
                        <div
                          onClick={() => updateEmployee(data.email)}
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
                      </td>
                    </tr>
                  ))}

                  {/* <!--Table Row  1--> */}
                </tbody>
              </table>
            </div>
          </div>
          <Pagination
            itemsPerPage={itemsPerPage}
            itemsLength={items}
            itemOffset={itemOffset}
            setItemOffset={setItemOffset}
          />
        </div>
      )}
    </>
  );
}

export default SettingsTable;

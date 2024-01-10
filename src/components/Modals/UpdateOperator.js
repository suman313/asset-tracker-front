import axios from "axios";
import React, { useEffect, useState } from "react";
import { setBaseUrl } from "../../config";
// import { LoaderContext } from "../../Context/LoaderContext";
import Loader from "../Loader";
import { useNavigate, useParams } from "react-router-dom";

function UpdateOperator() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loader, setLoader] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(null);
  const [isAadharValid, setIsAadharValid] = useState(null);
  const [operatorDetail, setOperatorDetail] = useState({
    aadhar_no: "",
    bank_details: {
      account_no: "",
      id: "",
      ifsc_code: "",
    },
    id: "",
    joining_date: "",
    leaving_date: "",
    name: "",
    net_inhand_salary: "",
    odoo_employee_no: "",
    pf_account_no: "",
    phone: {
      id: "",
      phone_no: "",
      types: "+91",
    },
  });
  const getOperatorDetail = async () => {
    try {
      setLoader(true);
      const { data } = await axios.get(`${setBaseUrl}/operator/get_by_id`, {
        headers: {
          "Content-Type": "application/json",
          "x-access-tokens": sessionStorage.getItem("token"),
          id: id,
        },
      });
      console.log(data);
      setOperatorDetail(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const handlePhone = (e) => {
    setOperatorDetail({
      ...operatorDetail,
      phone: {
        ...operatorDetail.phone,
        phone_no: e.target.value,
      },
    });
    let phoneDigitCount = e.target.value.length;
    if (phoneDigitCount === 10) {
      setIsPhoneValid(null);
    } else {
      setIsPhoneValid(
        "Phone number must contain 10 digits. you gave: >> " + phoneDigitCount
      );
    }
  };

  const handleAdhaar = (e) => {
    setOperatorDetail({
      ...operatorDetail,
      aadhar_no: e.target.value,
    });
    let aadhar_no_value = e.target.value;
    let aadhar_no_value_length = aadhar_no_value.length;
    var expr =
      /^([0-9]{4}[0-9]{4}[0-9]{4}$)|([0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|([0-9]{4}-[0-9]{4}-[0-9]{4}$)/;
    if (expr.test(aadhar_no_value)) {
      setIsAadharValid(null);
    } else {
      setIsAadharValid(
        "Adhaar number must contain 12 digits. You gave>> " +
          aadhar_no_value_length
      );
    }
  };

  useEffect(() => {
    getOperatorDetail();
  }, []);

  const handleSubmit = async (e) => {
    if (isPhoneValid !== null) {
      alert("Please enter a valid phone number.");
      return;
    }
    if (isAadharValid !== null) {
      alert("Please enter a valid adhar number.");
      return;
    }
    e.preventDefault();
    try {
      setLoader(true);
      const { data } = await axios.put(
        `${setBaseUrl}/operator/update`,
        operatorDetail,
        {
          headers: {
            "x-access-tokens": sessionStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);
      setLoader(false);
      navigate(`/operators/details/${data.id}`);
    } catch (error) {
      console.log(error);
    }
  };
  if (loader) {
    return <Loader />;
  } else {
    return (
      <div id="update-operator">
        <div class="flex ">
          <button onClick={() => navigate(`/operators/details/${id}`)}>
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
            Update Operator
          </p>
        </div>
        <div class="flex">
          <div class="intro-y box basis-1/3 bg-white dark:bg-slate-900 rounded-lg mx-2 shadow-md hover:shadow-xl">
            <div class="flex items-center p-5 border-b border-gray-200 dark:border-dark-5">
              <h2 class="font-medium text-base mr-auto">Basic Feilds</h2>
            </div>
            <div class="p-2 text-sm">
              {/* <div class="mt-4">
              <label class="">Asset</label>
              <select class="input w-full border mt-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm">
                <option value="0f195446-0c28-4380-9dd8-b8f0d01d62ae">
                  {" "}
                  Durbin DT001{" "}
                </option>
              </select>
            </div> */}

              <div class="mt-4">
                <label class="">Name</label>
                <input
                  type="text"
                  value={operatorDetail?.name}
                  onChange={(e) =>
                    setOperatorDetail({
                      ...operatorDetail,
                      name: e.target.value,
                    })
                  }
                  placeholder="Op Name(eg: Me X)"
                  class="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
                />
              </div>
              {/* <div class="mt-4">
              <label class="">Pin</label>
              <input
                type="text"
                placeholder="Pin (eg: 1234)"
                class="input w-full border mt-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
              />
            </div> */}
              <div class="mt-4">
                <label class="">MOBILE NO.</label>
                <input
                  value={operatorDetail?.phone.phone_no}
                  onChange={handlePhone}
                  type="number"
                  placeholder="Mobile No."
                  class="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
                />
              </div>
              {isPhoneValid !== null && (
                <p className="text-[#24a062] font-bold mt-4">{isPhoneValid}</p>
              )}
              <div class="mt-4">
                <label class="">ODOO EMPLOYEE NO.</label>
                <input
                  value={operatorDetail?.odoo_employee_no}
                  onChange={(e) =>
                    setOperatorDetail({
                      ...operatorDetail,
                      odoo_employee_no: e.target.value,
                    })
                  }
                  type="text"
                  placeholder="Odoo employee number"
                  class="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
                />
              </div>
            </div>
          </div>
          <div class="intro-y box basis-1/3 bg-white dark:bg-slate-900 rounded-lg mx-2 shadow-md hover:shadow-xl">
            <div class="flex items-center p-5 border-b border-gray-200 dark:border-dark-5">
              <h2 class="text-transparent font-medium text-base mr-auto">
                Basic Feilds
              </h2>
            </div>
            <div class="p-5 text-sm">
              <div class="mt-0">
                <label>Aadhaar no.</label>
                <input
                  value={operatorDetail?.aadhar_no}
                  onChange={handleAdhaar}
                  type="text"
                  placeholder="Aadhaar no."
                  class="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
                />
              </div>
              {isAadharValid !== null && (
                <p className="text-[#24a062] font-bold mt-4">{isAadharValid}</p>
              )}
              <div class="mt-4">
                <label class="">BANK ACCOUNT NO.</label>
                <input
                  value={operatorDetail?.bank_details.account_no}
                  onChange={(e) =>
                    setOperatorDetail({
                      ...operatorDetail,
                      bank_details: {
                        ...operatorDetail.bank_details,
                        account_no: e.target.value,
                      },
                    })
                  }
                  type="text"
                  placeholder="Bank account no."
                  class="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
                />
              </div>

              <div class="mt-4 ">
                <label class="">Bank IFSC Code</label>
                <input
                  value={operatorDetail?.bank_details.ifsc_code}
                  onChange={(e) =>
                    setOperatorDetail({
                      ...operatorDetail,
                      bank_details: {
                        ...operatorDetail.bank_details,
                        ifsc_code: e.target.value,
                      },
                    })
                  }
                  type="text"
                  placeholder="Bank IFSC Code"
                  class="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
                />
              </div>
              {/* <div class="mt-4">
              <label class="">Driving Licence</label>
              <input
                type="text"
                placeholder="0"
                class="input w-full border mt-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
              />
            </div> */}
            </div>
          </div>
          <div class="intro-y box basis-1/3 bg-white dark:bg-slate-900 rounded-lg mx-2 shadow-md hover:shadow-xl">
            <div class="flex items-center p-5 border-b border-gray-200 dark:border-dark-5">
              <h2 class="text-transparent font-medium text-base mr-auto">
                Basic Feilds
              </h2>
            </div>
            <div class="p-5 text-sm">
              <div class="mt-0">
                <label>Date of joining</label>
                <input
                  type="date"
                  value={operatorDetail?.joining_date}
                  onChange={(e) =>
                    setOperatorDetail({
                      ...operatorDetail,
                      joining_date: e.target.value,
                    })
                  }
                  placeholder="07-03-2021"
                  class="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
                />
              </div>
              {/* <div class="mt-4">
              <label>Date of leaving</label>
              <input
                type="date"
                placeholder="07-03-2021"
                class="input w-full border mt-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
              />
            </div> */}
              {/* <div class="mt-4">
              <label class="">Net Inhand Salary Fixed</label>
              <input
                type="number"
                placeholder="Net Inhand Salary Fixed"
                class="input w-full border mt-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
              />
            </div> */}
              <div class="mt-4">
                <label class="">PF Account No.</label>
                <input
                  value={operatorDetail?.pf_account_no}
                  onChange={(e) =>
                    setOperatorDetail({
                      ...operatorDetail,
                      pf_account_no: e.target.value,
                    })
                  }
                  // disabled={true}
                  type="text"
                  placeholder="PF Account No."
                  className="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
                />
              </div>
              <div class="mt-4">
                <label class="">leaving Date</label>
                <input
                  value={operatorDetail?.leaving_date}
                  onChange={(e) =>
                    setOperatorDetail({
                      ...operatorDetail,
                      leaving_date: e.target.value,
                    })
                  }
                  // disabled={true}
                  type="date"
                  placeholder="PF Account No."
                  className="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="flex mt-5">
          <button
            onClick={() => navigate(`/operators/details/${id}`)}
            class="flex basis-1/2 align-middle justify-center py-3 border mx-4 rounded-lg border-gray-600 dark:border-gray-400 text-sm font-medium text-slate-800 dark:text-slate-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            class="flex basis-1/2 justify-center py-4 mx-4 border rounded-lg bg-blue-800 text-sm font-medium text-white"
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
              class="w-4 h-4 mr-2 feather feather-thumbs-up"
            >
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
            </svg>
            Save Changes
          </button>
        </div>
      </div>
    );
  }
}

export default UpdateOperator;

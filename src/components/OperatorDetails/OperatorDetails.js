import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { setBaseUrl } from "../../config";
import Loader from "../Loader";
import { LoaderContext } from "../../Context/LoaderContext";
import { PermissionContext } from "../../Context/PermissionsContext";
import { useNavigate, useParams } from "react-router-dom";
import ifscIco from "../../components/OperatorDetails/assets/ifscIco.svg";
import odooIco from "../../components/OperatorDetails/assets/adhaarIcon.svg";
import adhaarIco from "../../components/OperatorDetails/assets/adhaarIcon2.svg";
import joiningIco from "../../components/OperatorDetails/assets/joiningIcon.svg";
import moneyIco from "../../components/OperatorDetails/assets/moneyIco.svg";
import phoneIco from "../../components/OperatorDetails/assets/phoneIcon.svg";
import profileIco from "../../components/OperatorDetails/assets/profileIco.svg";
import bankAcIco from "../../components/OperatorDetails/assets/bankAcIco.svg";
import pfAcIco from "../../components/OperatorDetails/assets/pfIco.svg";
import CardForDetails from "./CardForDetails";

function OperatorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [perms, setPerms] = useContext(PermissionContext);
  const [operatorDetail, setOperatorDetail] = useState({});
  const loader = useContext(LoaderContext)[0];
  const setLoader = useContext(LoaderContext)[1];
  const [reload, setReload] = useState(false);
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

  useEffect(() => {
    getOperatorDetail();
  }, [reload]);

  if (loader) {
    return <Loader />;
  } else {
    return (
      <div id="operator-details">
        <div class="flex ">
          <button onClick={() => navigate("/operators")}>
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
            Operator Details
          </p>
          <div class="sm:flex items-center ml-auto mt-0 hidden text-sm">
            {(perms.indexOf("OPERATOR.ALL") !== -1 ||
              perms.indexOf("OPERATOR.CRU") !== -1 ||
              perms.indexOf("ADMIN.ALL") !== -1) && (
              <span
                onClick={() => navigate(`/operators/updateOperator/${id}`)}
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
                Update Operator
              </span>
            )}
            <span
              class="ml-auto flex items-center text-blue-800 cursor-pointer"
              onClick={() => setReload((prev) => !prev)}
            >
              <svg
                className="stroke-blue-800  w-4 h-4 mr-3 feather feather-refresh-ccw"
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

        <div className="grid grid-cols-3 gap-3">
          {/* <div className="flex flex-col justify-around items-center p-2 h-[10rem]  bg-[#fff]">
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
              class="w-4 h-4 mr-2 feather feather-briefcase"
            >
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
            <p>{operatorDetail?.name}</p>
            <p>:</p>
          </div> */}
<CardForDetails svg={profileIco} name="NAME" details={operatorDetail?.name} />
<CardForDetails svg={phoneIco} name="MOBILE NO" details={`${operatorDetail?.phone?.types} - ${operatorDetail?.phone?.phone_no}`} />
<CardForDetails svg={adhaarIco} name="AADHAAR NO" details={operatorDetail?.aadhar_no}/>
<CardForDetails svg={bankAcIco} name="BANK ACCOUNT NO" details={operatorDetail?.bank_details?.account_no} />
<CardForDetails svg={odooIco} name="ODOO EMPLOYEE NO" details={operatorDetail?.odoo_employee_no} />
<CardForDetails svg={ifscIco} name="BANK IFSC CODE" details={operatorDetail?.bank_details?.ifsc_code} />
<CardForDetails svg={moneyIco} name="NET INHAND SALARY" details={operatorDetail?.net_inhand_salary || "--"} />
<CardForDetails svg={joiningIco} name="DATE OF JOINING" details={operatorDetail?.joining_date} />
<CardForDetails svg={pfAcIco} name="PF ACCOUNT NO" details={operatorDetail?.pf_account_no} />
          {/* <div className="flex flex-col justify-around items-center p-2 h-[10rem]  bg-[#fff]">
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
              class="w-4 h-4 mr-2 feather feather-briefcase"
            >
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
            <p>{`${operatorDetail?.phone?.types} - ${operatorDetail?.phone?.phone_no}`}</p>
            <p>MOBILE NO:</p>
          </div>

          <div className="flex flex-col justify-around items-center p-2 h-[10rem]  bg-[#fff]">
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
              class="w-4 h-4 mr-2 feather feather-briefcase"
            >
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
            <p>{operatorDetail?.aadhar_no}</p>
            <p>AADHAAR NO:</p>
          </div>

          <div className="flex flex-col justify-around items-center p-2 h-[10rem]  bg-[#fff]">
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
              class="w-4 h-4 mr-2 feather feather-briefcase"
            >
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
            <p>{operatorDetail?.bank_details?.account_no}</p>
            <p>BANK ACCOUNT NO:</p>
          </div>

          <div className="flex flex-col justify-around items-center p-2 h-[10rem]  bg-[#fff]">
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
              class="w-4 h-4 mr-2 feather feather-briefcase"
            >
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
            <p>{operatorDetail?.odoo_employee_no}</p>
            <p>ODOO EMPLOYEE NO:</p>
          </div>

          <div className="flex flex-col justify-around items-center p-2 h-[10rem]  bg-[#fff]">
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
              class="w-4 h-4 mr-2 feather feather-briefcase"
            >
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
            <p className="text-[1.5rem] text-[#8e909a]">
              {operatorDetail?.bank_details?.ifsc_code}
            </p>
            <p className="text-[1rem] text-[#d13131]">BANK IFSC CODE:</p>
          </div>

          <div className="flex flex-col justify-around items-center p-2 h-[10rem]  bg-[#fff]">
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
              class="w-4 h-4 mr-2 feather feather-briefcase"
            >
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
            <p>{operatorDetail?.net_inhand_salary || "--"}</p>
            <p>NET INHAND SALARY:</p>
          </div>
          <div className="flex flex-col justify-around items-center p-2 h-[10rem]  bg-[#fff]">
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
              class="w-4 h-4 mr-2 feather feather-briefcase"
            >
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
            <p>{operatorDetail?.joining_date}</p>

            <p>DATE OF JOINING:</p>
          </div>
          <div className="flex flex-col justify-around items-center p-2 h-[10rem]  bg-[#fff]">
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
              class="w-4 h-4 mr-2 feather feather-briefcase"
            >
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
            <p>{operatorDetail?.pf_account_no}</p>

            <p>PF ACCOUNT NO</p>
          </div> */}
        </div>
      </div>
    );
  }
}

export default OperatorDetails;

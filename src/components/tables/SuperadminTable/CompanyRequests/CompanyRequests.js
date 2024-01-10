import axios from "axios";
import React, { useEffect, useState } from "react";
import { setBaseUrl } from "../../../../config";
import deleteIcon from "../../../../assets/images/cancel.svg";
import SuperAdminLoader from "../../../../pages/Superadmin/SuperAdminLoader";
import Approve from "./Approve";
import Loader from "../../../Loader";

function CompanyRequests({setActiveTab}) {
  const [companies, setCompanies] = useState([]);
  const [loader, setLoader] = useState(false);
  const [commonWithApprove, setCommonWithApprove] = useState(false);
  const getRequestedCompanies = async () => {
    setLoader(true);
    try {
      const { data } = await axios.get(
        `${setBaseUrl}/superadmin/get-requested-companies`,
        {
          headers: {
            "x-access-tokens": sessionStorage.getItem("superadmin_token"),
          },
        }
      );
      console.log(data.response);
      setCompanies(data.response);
    } catch (error) {
      console.log(error);
    }
    setLoader(false);
  };



  useEffect(() => {
    getRequestedCompanies();
  }, [commonWithApprove]);

  return (
   <>{loader?<Loader />: <table className="table border-separate w-full ">
   <thead className="text-center   bg-[rgba(217,223,228,0.97)] rounded-md text-lg">
     <th className="px-4 py-2">Company name</th>
     <th>Email</th>
     <th>Name</th>
     <th>Location</th>
     <th>Phone Number</th>
     <th>Action</th>
   </thead>
   <tbody>
     {companies.length > 0 &&
       companies.map((item) => (
         <tr className="text-center  bg-[rgba(217,223,228,0.42)] rounded-md text-lg">
           <td className="px-4 py-4">{item?.company_name}</td>
           <td>{item?.email}</td>
           <td>{item?.name}</td>
           <td>{item?.address}</td>
           <td>{item?.phone_no}</td>
           <td className="flex justify-center items-center gap-4 px-4 py-4">
             <Approve email={item.email} reload={setCommonWithApprove} setActiveTab={setActiveTab}/>
             <span className="flex gap-1">
               <img src={deleteIcon} alt="approve" />
               <p className="text-sm w-full">Cancel request</p>
             </span>
           </td>
         </tr>
       ))}
   </tbody>
 </table>}</>
  );
}

export default CompanyRequests;

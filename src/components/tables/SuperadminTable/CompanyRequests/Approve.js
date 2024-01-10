import React from "react";
import SuperAdminLoader from "../../../../pages/Superadmin/SuperAdminLoader";
import approve from "../../../../assets/images/approve.svg";
import { useState } from "react";
import { setBaseUrl } from "../../../../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Approve({ email, reload, setActiveTab }) {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const handleOnApprove = async () => {
    setLoader(true);
    try {
      const { data } = await axios.post(
        `${setBaseUrl}/superadmin/approve-company`,

        {
          email: email,
        },
        {
          headers: {
            "x-access-tokens": sessionStorage.getItem("superadmin_token"),
          },
        }
      );
      alert(data.message);
    } catch (error) {
      alert("You Failed in life. Come next year and try again");
    }
    setLoader(false);
    setActiveTab(2);
  };
  return (
    <>
      {loader ? (
        <SuperAdminLoader />
      ) : (
        <span className="flex gap-1 p-4 rounded-[17px] cursor-pointer hover:bg-[#d69265] hover:text-[#ffff]" onClick={handleOnApprove}>
          <img
            src={approve}
            alt="approve"
            style={{ width: "20px", height: "20px" }}
          />
          <p className="text-sm">Approve</p>
        </span>
      )}
    </>
  );
}

export default Approve;

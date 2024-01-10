import React, { useEffect } from "react";

import greenTick from "../assets/images/greenTick.png";
import { useNavigate } from "react-router-dom";

export const Successful = () => {
  const navigate = useNavigate();

  useEffect(() => {
   let timerId =  setTimeout(() => {
      navigate("/login");
    }, 2000);
    return () => {
      clearTimeout(timerId);
    };
  }, []);

  return (
    <div className="flex gap-2 justify-center items-center bg-white  border-8 mt-[10vh] m-[10rem]">
      <h4 className="text-[#066a2cf9] text-lg">Password Changed Successfully</h4>
      <span>
        <img src={greenTick} style={{ width: "40px", height: "40px" }} />
      </span>
    </div>
  );
};

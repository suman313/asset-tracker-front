import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setBaseUrl } from "../config";
import OuterLoader from "./OuterLoder";

export const ChangePassword = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [creds, setCreds] = useState({ email: "", new_password: "" });

  const handleSubmit = async () => {
    try {
      setLoader(true);
      const { data } = await axios.post(`${setBaseUrl}/change-password`, {
        email: creds.email,
        password: creds.new_password,
      });
      sessionStorage.clear();

      navigate("/Successful");
    } catch (error) {
      console.log(error);
      setLoader(false);
      alert(error.response.data.message);
    }
  };

  if (loader) {
    return <OuterLoader />;
  } else {
    return (
      <div className="h-full w-full flex flex-col justify-center gap-4 items-center mt-[10vh]">
        <div className="flex justify-start items-center mx-10 my-0">
          <div className="flex justify-between items-center">
            <button onClick={() => navigate("/settings")}>
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
                className="w-6 h-6 mr-6 cursor-pointer feather feather-arrow-left text-white"
              >
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </button>
            <p className="inline  text-xl font-medium text-white dark:text-slate-200 ml-5">
              Change Password
            </p>
          </div>
        </div>
        <div class="intro-y mx-10 overflow-auto lg:overflow-visible mt-8 sm:mt-0">
          <div className="flex flex-col gap-4 justify-center items-center">
            <label for="email" className="text-white">
              Email:
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="Email"
              className="p-2 mx-4 rounded-md text-center"
              onChange={(e) => setCreds({ ...creds, email: e.target.value })}
            />
            <label for="name" className="text-white">
              Enter Old Password:
            </label>
            <input
              type="password"
              name="name"
              required
              placeholder="Old Password"
              className="p-2 mx-4 rounded-md text-center"
            />
            <label for="name" className="text-white">
              Enter New Password:
            </label>
            <input
              type="password"
              name="name"
              required
              placeholder="Enter Old Password"
              className="p-2 mx-4 rounded-md text-center"
              onChange={(e) =>
                setCreds({ ...creds, new_password: e.target.value })
              }
            />
            <button
              type="submit"
              className="p-2 bg-[#7a6fb8] text-white rounded-md"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
};

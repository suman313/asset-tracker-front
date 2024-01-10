import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
// import { useSelector, useDispatch } from 'react-redux'
// import {setUser, setToken} from "../slicers/UserSlice"
import { Link, useNavigate } from "react-router-dom";
// import { BACKEND_LOCATION } from "../config";
import Layout from "./Layout";
// import Alert from "react-bootstrap/Alert";
import "./style.css";
import { setBaseUrl } from "../config";
import OuterLoader from "../pages/OuterLoder";
import backgVideo from "../assets/videos/Access-banner.mp4";
import DurbinLogo from "../assets/images/DurbinLogo.jpg"

const SuperadminLogin = () => {
 
  const formData = new FormData();
  const navigate = useNavigate();
  // const dispatch = useDispatch()
  const [data, setData] = React.useState({ email: "", password: "" });
  const [show, setShow] = React.useState(false);
  const [errormsg, setErrormsg] = React.useState("");
  const [visible, setVisible] = React.useState(true);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    // checkIfLoggedIn();
  }, []);

  const checkIfLoggedIn = () => {
    let isLoggedIn = sessionStorage.getItem("token");
    if (isLoggedIn) {
      navigate("/assets");
    } else {
      return;
    }
  };

  

  const LoginFunction = async () => {
    try {
      setLoader(true);
      const res = await axios.post(`${setBaseUrl}/superadmin/login`, {
        email: data.email,
        password: data.password,
      });
      
      sessionStorage.setItem("superadmin_token", res.data.token);
      sessionStorage.setItem("superadmin_email", data.email);
      navigate("/superadmin/")
    } catch (error) {
      alert(error.message);
    } finally {
      setLoader(false)
    }
  };

  const showPassword = () => {
    let passType = document.getElementById("password");
    if (passType.type === "password") {
      passType.type = "text";
      setVisible(false);
    } else {
      passType.type = "password";
      setVisible(true);
    }
  };

 
  if (loader) {
    return <OuterLoader />;
  } else {
    return (
      <div className="main-login-container" role="banner">
        <video className="" src={backgVideo} autoPlay id="heroVideo" loop muted />
        <div className="absolute top-[30%] left-[35%] login-content p-5 flex flex-col justify-center items-center gap-4 login bg-[#ffff] rounded-[20px] border-[0.5px] border-[#0000ff]">
          <div className="w-[100px] h-[100px] mt-[-20%] rounded-[50%] border-[0.5px] border-[#0000ff] overflow-hidden">
            <img src={DurbinLogo} alt="dubin logo" />
          </div>
          <div className="text-lg font-medium text-[#0000ff] m-5">
            Company Login
          </div>
          <div className="flex flex-col gap-4 justify-between items-center p-2 email-field">
            <input
              type="text"
              name="email"
              placeholder="Email"
              id="email"
              onChange={(e) => {
                setData({ ...data, email: e.target.value });
              }}
            />
            <div className="flex justify-around gap-0  p-2 pss-field">
            <input
              type="password"
              name="password"
              placeholder="Password"
              id="password"
              onChange={(e) => {
                setData({ ...data, password: e.target.value });
              }}
            />
            {visible ? (
              <span class="material-symbols-outlined" onClick={showPassword}>
                visibility
              </span>
            ) : (
              <span class="material-symbols-outlined" onClick={showPassword}>
                visibility_off
              </span>
            )}
          </div>
          </div>
          
          <button className="login-btn" type="submit" onClick={LoginFunction}>
            Login
          </button>
        </div>
  
        {/* </div> */}
      </div>
    );
  }
};

export default SuperadminLogin;

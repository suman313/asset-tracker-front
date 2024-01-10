import React, { useContext, useEffect, useState } from "react";
import logo from "../../assets/images/logo.png";
import profile from "../../assets/images/profile.png";
import { useNavigate } from "react-router-dom";
import { NavbarContext } from "../../Context/NavbarContext";
import { PermissionContext } from "../../Context/PermissionsContext";
import merryChristmas from "../../../src/assets/images/merryChristmas.svg"
import sittingSanta from "../../../src/assets/images/sittingSanta.svg"
function Navbar({ tabNo, setTabNo, theme, setTheme }) {
  const user = sessionStorage.getItem("user");
  const [perms, setPerms] = useContext(PermissionContext);
  const [navState, setNavState] = useContext(NavbarContext);
  const [openTab, setOpenTab] = useState("");
  const [openUserLogo, setOpenUserLogo] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    switch (navState) {
      case 1:
        setOpenTab("Dashboard");
        break;
      case 2:
        setOpenTab("Assets");
        break;
      case 3:
        setOpenTab("Maintenance");
        break;
      case 4:
        setOpenTab("Lease");
        break;
      case 5:
        setOpenTab("Telematics");
        break;
      case 6:
        setOpenTab("Operator");
        break;
      case 7:
        setOpenTab("Settings");

      default:
        break;
    }
  }, [navState]);

  const handleTheme = () => {
    if (sessionStorage.getItem("theme") === "dark") {
      console.log("theme changed to normal");
      setTheme("");
      sessionStorage.removeItem("theme");
    } else {
      console.log("theme changed to dark");
      setTheme("dark");
      sessionStorage.setItem("theme", "dark");
    }
  };
  const handleLogut = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <nav
        id=""
        className=" navbar-border md:pt-2 lg:pt-0  px-4 lg:px-8 border-b border-slate-400 "
      >
        <div className="flex ">
          <div className=" navbar-border basis-3/12 lg:basis-2/12 hidden md:block  md:pb-5 pt-5 border-r">
            <div className="inline  ">
              <img className="inline w-6 mr-2 mb-1" src={logo} alt="logo" />
              <p className="inline font-sans font-medium text-white text-lg ">
                Asset <span className="font-semibold">Tracker</span>{" "}
              </p>
            </div>
          </div>

          <div className="basis-6/12 sm:basis-6/12 md:basis-3/12  inline items-center  md:mb-0 pb-5 pt-5   md:pl-6">
            <span className="inline text-sm text-slate-300 align-middle ">
              {" "}
              Applications
            </span>
            <span className="inline text-sm text-slate-300">{" > "}</span>
            <span
              id="head-tab"
              className="inline text-sm text-slate-200 font-semibold"
            >
              {openTab}
            </span>
          </div>
          <div className=" flex justify-end basis-6/12 sm:basis-6/12 md:basis-6/12 lg:basis-7/12 text-right items-center  pb-5 pt-5">
            <div className="inline  pl-2 pr-1 md:px-5">
              <div className="flex items-center justify-center mx-auto  ">
                <div className="flex justify-end items-center auto relative">
                  <span className="text-sm pr-2 justify-end font-medium text-slate-300">
                    Dark Mode
                  </span>
                  <div>
                    <input
                      type="checkbox"
                      name=""
                      id="checkmode"
                      className="hidden"
                    />
                    <label
                      htmlFor="checkmode"
                      className="cursor-pointer"
                      onClick={handleTheme}
                    >
                      <div className=" w-9 h-5 flex items-center bg-blue-800 drop-shadow-lg border border-slate-200 dark:border-slate-400 dark:bg-slate-700 rounded-full p2">
                        <div className="switch-ball w-4 h-4 bg-white dark:bg-slate-800 rounded-full shadow-2xl"></div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div
              id="notif-btn"
              className="  inline pr-1 md:pr-5 "
              onclick="toggleColumn('notif-content')"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22px"
                height="22px"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className=" inline notification__icon dark:text-gray-300 feather feather-bell"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </div>
            <div
              id="notif-content"
              className="  notification-content   px-5 absolute top-16 right-2 z-10 -mr-10 sm:mr-0 overflow-scroll hidden shadow-2xl bg-white  text-slate-700 dark:bg-slate-900 dark:text-slate-100 rounded-2xl "
            >
              <div className=" max-h-96  dark:bg-dark-6">
                <div className=" text-lg text-left py-3">Notifications</div>
                <div className="cursor-pointer relative flex items-start py-2 border-b border-gray-100 zoom-in">
                  <div className="overflow-hidden">
                    <div className="flex items-start">
                      <a href="javascript:;" className="font-medium mr-5">
                        Unexpected Vibration Occured
                      </a>
                      <div className="text-xs text-gray-400 ml-auto whitespace-no-wrap">
                        {" "}
                        06:37 am{" "}
                      </div>
                    </div>
                    <div className="w-full text-gray-400">
                      {" "}
                      in Genie Z4525JRT{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="inline">
              <img
                className="dropdown w-9 h-9  shadow-lg inline cursor-pointer"
                alt="durbin"
                src={profile}
                onClick={() => setOpenUserLogo((prev) => !prev)}
              />
            </div>
            {openUserLogo && (
              <div
                id="dropdown-content"
                className="dropdown-box  absolute w-56 top-16 right-1 z-20 "
              >
                <div
                  id="profile-dropdown"
                  className="bg-indigo-900 dark:bg-black rounded-2xl box  dark:bg-dark-6 text-white"
                >
                  <div className="p-4 border-b border-theme-40 dark:border-dark-3">
                    {/* <div className="font-medium">Name Surname</div> */}
                    <div className="text-xs dark:text-gray-300"> {user} </div>
                  </div>
                  <div className="p-2">
                    <a
                      href="#"
                      className="flex items-center p-2 transition duration-300 ease-in-out  dark:hover:bg-dark-3 rounded-md"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4 mr-2 feather feather-user"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>{" "}
                      Position{" "}
                    </a>
                    <a
                      href="#"
                      className="flex items-center p-2 transition duration-300 ease-in-out  dark:hover:bg-dark-3 rounded-md"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4 mr-2 feather feather-help-circle"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                      </svg>{" "}
                      Help{" "}
                    </a>
                  </div>
                  {perms.indexOf("ADMIN.ALL") !== -1 && (
                    <div className="p-2 border-t border-theme-40 dark:border-dark-3 ">
                      <a href="/settings">
                        <span className="mr-[80%] px-3">Settings</span>
                      </a>
                    </div>
                  )}
                  <div
                    className="p-2 border-t border-theme-40 dark:border-dark-3"
                    onClick={handleLogut}
                  >
                    <span className="cursor-pointer flex items-center p-2 transition duration-300 ease-in-out  dark:hover:bg-dark-3 rounded-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4 mr-2 feather feather-log-out"
                      >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                      </svg>{" "}
                      Exit
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

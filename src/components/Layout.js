import React, { useContext, useEffect, useState } from "react";
import Navbar from "./navbar/Navbar";
import dashboard from "../assets/images/dasboard.svg";
import assets from "../assets/images/assets.svg";
import maintanance from "../assets/images/maitanance.svg";
import lease from "../assets/images/lease.svg";
import telematics from "../assets/images/telematics.svg";
import settings from "../assets/images/settings.svg";
import wrench from "../assets/images/wrench.svg";
import { Link, useNavigate } from "react-router-dom";
import { NavbarContext } from "../Context/NavbarContext";
import { PermissionContext } from "../Context/PermissionsContext";
import webSiteTheme from "../utils/Theme";
import useAuthorities from "../utils/useAuthorities";

function Layout({ pageNum, children }) {
  const navigate = useNavigate();
  const [theme, setTheme] = useState("");
  const [navState, setNavState] = useContext(NavbarContext);
  const [perms, setPerms] = useContext(PermissionContext);
  const { assetsTabPerm, maintenanceTabPerm, leasesTabPerm, operatorsTabPerm } =
    useAuthorities();
  // let assetsTabPerm = true;
  // let maintenanceTabPerm = true;
  // let leasesTabPerm = true;
  // let operatorsTabPerm = true;

  useEffect(() => {
    webSiteTheme();
    setTheme(sessionStorage.getItem("theme"));
  }, [theme]);

  const onClickTabChange = (number) => {
    setNavState(number);
  };

  return (
    <>
      <Navbar theme={theme} setTheme={setTheme} />
      <main>
        <div className="flex flex-wrap mx-4 lg:mx-8" id="tabs-id">
          <div className="w-full">
            <div className="max-[768px]:hidden lg:block shrink flex">
              <ul className="flex  mb-0 max-[1279px]:mb-2  max-[1279px]:mx-0 mx-10 list-none flex-wrap pt-12  flex-row basis-full">
                {navState === 1 && (
                  <div className="min-[1279px]:block">
                    <div
                      id="f-nav-tab2"
                      className=" f-cornerdiv  relative bg-slate-100 dark:bg-gray-800  w-4 h-[1.2rem] align-bottom mt-8"
                    >
                      <div className=" absolute rounded-br-2xl bg-blue-800 dark:bg-gray-900  w-4 h-[1.2rem] "></div>
                    </div>
                  </div>
                )}
                <li
                  className="-mb-px shrink last:mr-0  text-center"
                  onClick={() => onClickTabChange(1)}
                >
                  <Link
                    to="/dashboard"
                    href="#tb-dashboard"
                    id="nav-tab1"
                    className={`navbar-tab inlne cursor-pointer text-sm  font-medium   px-5 py-3 max-[1279px]:rounded-2xl rounded-t-2xl block leading-normal  dark:text-slate-100 hover:transition-all hover:delay-100  ${
                      navState === 1
                        ? "bg-slate-100 text-black dark:bg-gray-800"
                        : "text-white"
                    } `}
                  >
                    <img
                      src={dashboard}
                      alt="dashboard"
                      className="inline mx-2"
                    />
                    <p className="inline">Dashboard</p>
                  </Link>
                </li>
                {navState === 1 && (
                  <div className="min-[1279px]:block">
                    <div
                      id="b-nav-tab1"
                      className=" b-cornerdiv block  relative bg-slate-100 dark:bg-gray-800  w-4 h-[1.2rem] align-bottom mt-8"
                    >
                      <div className=" absolute rounded-bl-2xl bg-blue-800 dark:bg-gray-900  w-4 h-[1.2rem] "></div>
                    </div>
                  </div>
                )}
                {assetsTabPerm && (
                  <>
                    {navState === 2 && (
                      <div className="min-[1279px]:block">
                        <div
                          id="f-nav-tab2"
                          className=" f-cornerdiv  relative bg-slate-100 dark:bg-gray-800  w-4 h-[1.2rem] align-bottom mt-8"
                        >
                          <div className=" absolute rounded-br-2xl bg-blue-800 dark:bg-gray-900  w-4 h-[1.2rem] "></div>
                        </div>
                      </div>
                    )}

                    <li
                      className="-mb-px shrink last:mr-0  text-center  "
                      onClick={() => onClickTabChange(2)}
                    >
                      <Link
                        to="/assets"
                        href="#tab-assets"
                        id="nav-tab2"
                        className={`navbar-tab inlne cursor-pointer text-sm  font-medium   px-5 py-3 max-[1279px]:rounded-2xl rounded-t-2xl block leading-normal  dark:text-slate-100 hover:transition-all hover:delay-100  ${
                          navState === 2
                            ? "bg-slate-100 text-black dark:bg-gray-800"
                            : "text-white"
                        } `}
                      >
                        <img
                          src={assets}
                          alt="assets"
                          className="inline mx-2"
                        />
                        Assets
                      </Link>
                    </li>
                    {navState === 2 && (
                      <div className=" min-[1279px]:block">
                        <div
                          id="b-nav-tab2"
                          className=" b-cornerdiv relative bg-slate-100 dark:bg-gray-800    w-4 h-[1.2rem] align-bottom mt-8"
                        >
                          <div className=" absolute rounded-bl-2xl bg-blue-800 dark:bg-gray-900  w-4 h-[1.2rem] "></div>
                        </div>
                      </div>
                    )}
                  </>
                )}
                {maintenanceTabPerm && (
                  <>
                    {navState === 3 && (
                      <div className="min-[1279px]:block">
                        <div
                          id="f-nav-tab3"
                          className=" f-cornerdiv relative  bg-slate-100 dark:bg-gray-800   w-4 h-[1.2rem] align-bottom mt-8"
                        >
                          <div className=" absolute rounded-br-2xl bg-blue-800 dark:bg-gray-900  w-4 h-[1.2rem] "></div>
                        </div>
                      </div>
                    )}

                    <li
                      className="-mb-px shrink last:mr-0  text-center "
                      onClick={() => onClickTabChange(3)}
                    >
                      <Link
                        to="/maintenance"
                        href="#tab-maintenance"
                        id="nav-tab3"
                        className={`navbar-tab inlne cursor-pointer text-sm  font-medium   px-5 py-3 max-[1279px]:rounded-2xl rounded-t-2xl block leading-normal  dark:text-slate-100 hover:transition-all hover:delay-100  ${
                          navState === 3
                            ? "bg-slate-100 text-black dark:bg-gray-800"
                            : "text-white"
                        } `}
                      >
                        <img
                          src={maintanance}
                          alt="maintanance"
                          className="inline mx-2"
                        />{" "}
                        Maintenance
                      </Link>
                    </li>
                    {navState === 3 && (
                      <div class=" min-[1279px]:block">
                        <div
                          id="b-nav-tab3"
                          className=" b-cornerdiv relative bg-slate-100 dark:bg-gray-800    w-4 h-[1.2rem] align-bottom mt-8"
                        >
                          <div className=" absolute rounded-bl-2xl bg-blue-800 dark:bg-gray-900  w-4 h-[1.2rem] "></div>
                        </div>
                      </div>
                    )}
                  </>
                )}
                {leasesTabPerm && (
                  <>
                    {" "}
                    {navState === 4 && (
                      <div className="min-[1279px]:block">
                        <div
                          id="f-nav-tab4"
                          className=" f-cornerdiv relative bg-slate-100 dark:bg-gray-800    w-4 h-[1.2rem] align-bottom mt-8"
                        >
                          <div className=" absolute rounded-br-2xl bg-blue-800 dark:bg-gray-900  w-4 h-[1.2rem] "></div>
                        </div>
                      </div>
                    )}
                    <li
                      className="-mb-px shrink last:mr-0  text-center  "
                      onClick={() => onClickTabChange(4)}
                    >
                      <Link
                        to="/lease"
                        href="#tab-lease"
                        id="nav-tab4"
                        className={`navbar-tab inlne cursor-pointer text-sm  font-medium   px-5 py-3 max-[1279px]:rounded-2xl rounded-t-2xl block leading-normal  dark:text-slate-100 hover:transition-all hover:delay-100  ${
                          navState === 4
                            ? "bg-slate-100 text-black dark:bg-gray-800"
                            : "text-white"
                        } `}
                      >
                        <img src={lease} alt="lease" className="inline mx-2" />{" "}
                        Lease
                      </Link>
                    </li>
                    {navState === 4 && (
                      <div class=" min-[1279px]:block">
                        <div
                          id="b-nav-tab4"
                          class=" b-cornerdiv   relative bg-slate-100 dark:bg-gray-800    w-4 h-[1.2rem] align-bottom mt-8"
                        >
                          <div class=" absolute rounded-bl-2xl bg-blue-800 dark:bg-gray-900  w-4 h-[1.2rem] "></div>
                        </div>
                      </div>
                    )}
                  </>
                )}
                {/* {navState === 5 && (
                  <div class=" min-[1279px]:block">
                    <div
                      id="f-nav-tab5"
                      class=" f-cornerdiv   relative bg-slate-100 dark:bg-gray-800    w-4 h-[1.2rem] align-bottom mt-8"
                    >
                      <div class=" absolute rounded-br-2xl bg-blue-800 dark:bg-gray-900   w-4 h-[1.2rem] "></div>
                    </div>
                  </div>
                )}

                <li
                    class="-mb-px shrink last:mr-0  text-center "
                    onClick={() => onClickTabChange(5)}
                  >
                    <Link
                      to="/telematics"
                      href="#tab-telematics"
                      id="nav-tab5"
                      className={`navbar-tab inlne cursor-pointer text-sm  font-medium   px-5 py-3 max-[1279px]:rounded-2xl rounded-t-2xl block leading-normal  dark:text-slate-100 hover:transition-all hover:delay-100  ${
                        navState === 5
                          ? "bg-slate-100 text-black"
                          : "text-white"
                      } `}
                    >
                      <img
                        src={telematics}
                        alt="telematics"
                        className="inline mx-2 w-[24px] h-[24px]"
                      />
                      Telematics
                    </Link>
                  </li>
                {navState === 5 && (
                  <div class=" min-[1279px]:block">
                    <div
                      id="b-nav-tab5"
                      class=" b-cornerdiv   relative bg-slate-100 dark:bg-gray-800    w-4 h-[1.2rem] align-bottom mt-8"
                    >
                      <div class=" absolute rounded-bl-2xl bg-blue-800 dark:bg-gray-900  w-4 h-[1.2rem] "></div>
                    </div>
                  </div>
                )} */}
                {operatorsTabPerm && (
                  <>
                    {" "}
                    {navState === 6 && (
                      <div class=" min-[1279px]:block">
                        <div
                          id="f-nav-tab6"
                          class=" f-cornerdiv   relative bg-slate-100 dark:bg-gray-800    w-4 h-[1.2rem] align-bottom mt-8"
                        >
                          <div class=" absolute rounded-br-2xl bg-blue-800 dark:bg-gray-900  w-4 h-[1.2rem] "></div>
                        </div>
                      </div>
                    )}
                    <li
                      class="-mb-px shrink last:mr-0  text-center "
                      onClick={() => onClickTabChange(6)}
                    >
                      <Link
                        to="/operators"
                        id="nav-tab6"
                        className={`navbar-tab inlne cursor-pointer text-sm  font-medium   px-5 py-3 max-[1279px]:rounded-2xl rounded-t-2xl block leading-normal  dark:text-slate-100 hover:transition-all hover:delay-100  ${
                          navState === 6
                            ? "bg-slate-100 text-black dark:bg-gray-800"
                            : "text-white"
                        } `}
                      >
                        <img
                          src={wrench}
                          alt="operator"
                          className="inline mx-2 w-[24px] h-[24px]"
                        />{" "}
                        Operator
                      </Link>
                    </li>
                    {navState === 6 && (
                      <div class=" min-[1279px]:block">
                        <div
                          id="b-nav-tab6"
                          class=" b-cornerdiv   relative bg-slate-100 dark:bg-gray-800    w-4 h-[1.2rem] align-bottom mt-8"
                        >
                          <div class=" absolute rounded-bl-2xl bg-blue-800 dark:bg-gray-900  w-4 h-[1.2rem] "></div>
                        </div>
                      </div>
                    )}
                  </>
                )}
                {perms.indexOf("ADMIN.ALL") !== -1 && (
                  <>
                    {navState === 7 && (
                      <div class=" min-[1279px]:block">
                        <div
                          id="f-nav-tab7"
                          class=" f-cornerdiv   relative bg-slate-100 dark:bg-gray-800    w-4 h-[1.2rem] align-bottom mt-8"
                        >
                          <div class=" absolute rounded-br-2xl bg-blue-800 dark:bg-gray-900  w-4 h-[1.2rem] "></div>
                        </div>
                      </div>
                    )}

                    <li
                      class="-mb-px shrink last:mr-0  text-center"
                      onClick={() => onClickTabChange(7)}
                    >
                      <Link
                        to="/settings"
                        id="nav-tab7"
                        className={`navbar-tab inlne cursor-pointer text-sm  font-medium   px-5 py-3 max-[1279px]:rounded-2xl rounded-t-2xl block leading-normal  dark:text-slate-100 hover:transition-all hover:delay-100  ${
                          navState === 7
                            ? "bg-slate-100 text-black dark:bg-gray-800"
                            : "text-white"
                        } `}
                      >
                        <img
                          src={settings}
                          alt="settings"
                          className="inline mx-2 w-[24px] h-[24px]"
                        />{" "}
                        Settings
                      </Link>
                    </li>
                    {navState === 7 && (
                      <div class=" min-[1279px]:block">
                        <div
                          id="b-nav-tab7"
                          class=" b-cornerdiv  relative bg-slate-100 dark:bg-gray-800    w-4 h-[1.2rem] align-bottom mt-8"
                        >
                          <div class=" absolute rounded-bl-2xl bg-blue-800 dark:bg-gray-900  w-4 h-[1.2rem] "></div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </ul>
            </div>
            <div class=" relative flex flex-col  h-fit bg-slate-100 dark:bg-gray-800  w-full mb-6 rounded-2xl">
              <div class="px-5 py-5 flex-auto">
                <div class="tab-content tab-space">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Layout;

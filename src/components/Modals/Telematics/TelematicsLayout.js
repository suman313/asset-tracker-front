import React from "react";
import { useNavigate } from "react-router-dom";

function Layout({ children }) {
  const navigate = useNavigate();
  return (
    <div className="tabList" id="tab-telematics">
      <div class="flex justify-between px-5 py-5 flex-auto">
        <p
          id="tele-heading"
          className="inline py-5 pl-5 text-xl font-medium text-slate-700 dark:text-slate-200"
        >
          Device Events
        </p>

        <div className="sm:flex items-center ml-auto mt-0">
          {/* for new site and location button */}
          <div id="gps-buttons" className="hidden">
            <button
              onclick="openModal('newSite_modal');"
              className="button text-white bg-blue-800 py-2 px-2 rounded-md shadow-md mr-2 text-xs sm:text-sm cursor-pointer"
            >
              New Site
            </button>
            <button
              onclick="openModal('newLocation_modal');"
              className="button text-white bg-orange-500 py-2 px-2 rounded-md shadow-md mr-2 text-xs sm:text-sm cursor-pointer"
            >
              New Location
            </button>
          </div>

          <div className="intro-y pr-1">
            <div className="chat box sm:w-full w-44">
              <div className="text-sm nav-tabs justify-center flex bg-white dark:bg-slate-600 rounded-md">
              <span
                  onClick={() => navigate("/telematics/unlinked-devices")}
                  className="tele-tab flex-2 py-2 px-2 rounded-md text-center cursor-pointer truncate active"
                >
                  Unlinked Devices
                </span>
                <span
                  onClick={() => navigate("/telematics/")}
                  className="tele-tab flex-2 py-2 px-2 rounded-md text-center cursor-pointer truncate"
                >
                  Device events
                </span>
                <span
                  onClick={() => navigate("/telematics/tag-in-out")}
                  className="tele-tab flex-2 py-2 px-2 rounded-md text-center cursor-pointer truncate"
                >
                  Tag In/Out
                </span>
                <span
                  onClick={() => navigate("/telematics/usage-vs-actual")}
                  className="tele-tab flex-2 py-2 px-2 rounded-md text-center cursor-pointer truncate"
                >
                  Usage Vs Actual
                </span>
                <span
                  onClick={() => navigate("/telematics/gps-tracker")}
                  className="tele-tab flex-2 py-2 px-2 rounded-md text-center cursor-pointer truncate"
                >
                  GPS tracker
                </span>
                <span
                  onClick={() => navigate("/telematics/geo-tagging")}
                  className="tele-tab flex-2 py-2 px-2 rounded-md text-center cursor-pointer truncate"
                >
                  Geo-tagging
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}

export default Layout;

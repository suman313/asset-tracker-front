import React, { useEffect, useState } from "react";
import CompanyLogo from "../../assets/images/logo.png";
import userLogo from "../../assets/images/profile.png";
import dropdown from "../../assets/images/dropdown.svg";
import requestCompanies from "../../assets/images/request-company.svg";
import approveCompany from "../../assets/images/approve-company.png";
function Layout({ children, propsForActiveTab }) {
  const getAllProps = propsForActiveTab.activeTab;
  const activeTab = getAllProps[0];
  const setActiveTab = getAllProps[1];
  const [userName, setUserName] = useState("");
  const [logoutDiv, setLogoutDiv] = useState(false);

  const handleLogoutDiv = (event) => {
    if(event.target.className == "dropdown-toggle") {
      setLogoutDiv(true)
    }
    else {
      setLogoutDiv(false)
    }
  }

  window.addEventListener('click', handleLogoutDiv)
  useEffect(() => {
    document.body.classList.remove("bg-blue-800");
    document.body.classList.add("bg-gray-200");
    setUserName(sessionStorage.getItem("superadmin_email"));
  }, []);

  return (
    <div className="m-0 p-0 box-border">
      <nav className="w-full border-b-[#a7a2a2] border-b-2 flex justify-between items-center px-5 mt-3 mb-4">
        <div className="flex justify-around items-center gap-2 font-medium">
          <img
            src={CompanyLogo}
            alt="company logo"
            style={{ height: "75px", width: "75px" }}
          />
          <p className="text-[#2f2e2e] font-bold">Asset Tracker</p>
        </div>
        <div className="flex justify-between gap-2">
          <div className="flex justify-center items-center border-[#ffff] border-2 text-[#454242] font-medium p-2 mx-4 rounded-[9px]">
            {userName}
          </div>
          <div className="relative flex justify-around items-center gap-2" 
          >
            <img
              src={userLogo}
              alt="user logo"
              style={{ width: "55px", height: "55px" }}
            />
            <img
              src={dropdown}
              alt="dropdown"
              style={{ width: "15px", height: "15px" }}
              // onClick={ handleLogoutDiv}
              className="dropdown-toggle"
            />
          </div>
          {logoutDiv && <div className="absolute right-0 p-3 mt-12 bg-[#ffff] mx-5 border-2 rounded font-semibold">
            Log Out
          </div>}
        </div>
      </nav>
      <main className="flex flex-between">
        <aside className="flex flex-col justify-between items-center w-[25%] h-[20vh]  my-16 gap-16">
          <div
            className={`flex justify-center items-center gap-4 ${
              activeTab == 1 &&
              "bg-gradient-to-r from-indigo-500 p-2 bg-blend-normal px-4 rounded-[9px] "
            } cursor-pointer `}
            onClick={() => setActiveTab(1)}
          >
            <img
              src={requestCompanies}
              alt="requested companies"
              style={{ width: "50px", height: "50px" }}
            />
            <p className="text-[#2f2e2e] font-bold hover:border-b-2 border-[#3649d8]">
              Requested Companies
            </p>
          </div>
          <div
            className={`flex justify-center items-center gap-4 ${
              activeTab == 2 &&
              "bg-gradient-to-r from-indigo-500 p-2 bg-blend-normal px-4 rounded-[9px] "
            } cursor-pointer`}
            onClick={() => setActiveTab(2)}
          >
            <img
              src={approveCompany}
              alt="requested companies"
              style={{ width: "60px", height: "60px" }}
            />
            <p className="text-[#2f2e2e] font-bold hover:border-b-2 border-[#3649d8]">
              Approved Companies
            </p>
          </div>
        </aside>
        <div className={`w-full ${activeTab == 2 && "px-[10%]"}`}>
          {children}
        </div>
      </main>
    </div>
  );
}

export default Layout;

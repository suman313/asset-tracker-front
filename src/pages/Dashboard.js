import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import totalAssets from "../assets/images/dashboard/totalAssets.svg";
import freeAssestsIcon from "../assets/images/dashboard/freeAssets.svg";
import leasedAssets from "../assets/images/dashboard/leasedAssets.svg";
import assetsInMaintenance from "../assets/images/dashboard/assetsInMaintenance.svg";
import assetsInBreakdown from "../assets/images/dashboard/assetsInBreakdown.svg";
import usageHours from "../assets/images/dashboard/usageHours.svg";
import actualhours from "../assets/images/dashboard/actualhours.svg";
import totalOperators from "../assets/images/dashboard/totalOperators.svg";
import { allDashboardData } from "../apis/dashboard/all_data_for_dashboard";
import { useQuery } from "@tanstack/react-query";
import CategoryTable from "../components/tables/DashboardTable/CategoryTable";
import Loader from "../components/Loader";
import { NavbarContext } from "../Context/NavbarContext";
function Dashboard({ setActiveTab }) {
  const [navState, setNavState] = useContext(NavbarContext);
  const navigate = useNavigate()
  const handleReload = () => {
    document.location.reload();
  };

  const {
    isLoading,
    isError,
    data: allData,
    error,
  } = useQuery({ queryKey: ["dashboard_data"], queryFn: allDashboardData });

  useEffect(() => {
    setNavState(1);
  }, []);

  if (isLoading) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <Layout>
      <div className="tabList block" id="tab-dashboard">
        <div className="flex justify-between">
          <p className="inline py-5 pl-5 text-lg font-medium text-slate-700 dark:text-slate-200">
            General Report
          </p>
          <button
            className="ml-auto mt-5 flex justify-center items-center cursor-pointer"
            onClick={handleReload}
          >
            <svg
              class="inline align-middle"
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="1 4 1 10 7 10"></polyline>
              <polyline points="23 20 23 14 17 14"></polyline>
              <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
            </svg>
            <p className="p-2">Reload Data</p>
          </button>
        </div>
        {/* <!--Assets boxes 1st row--> */}
        <div className="flex flex-col md:flex-row animSlideup relative">
          <div className="basis-full md:basis-1/4 my-5 report-box zoom-in hover:scale-105" onClick={() => navigate("/assets")}>
            <div className=" p-5 mx-5 rounded-lg bg-white dark:bg-slate-900 shadow-sm">
              <div className="flex">
                <img src={totalAssets} alt="free assets" />
              </div>
              <div className="text-3xl font-bold leading-8 mt-6 dark:text-white">
                {allData?.total_assets}
              </div>
              <div className="text-base text-gray-400 mt-1 dark:text-slate-200">
                Total Assets
              </div>
            </div>
          </div>
          <div className="basis-full md:basis-1/4 my-5 report-box zoom-in hover:scale-105 " onClick={() => navigate("/assets/inactive")}>
            <div className=" p-5 mx-5 rounded-lg bg-white dark:bg-slate-900 shadow-sm">
              <div className="flex">
                <img src={freeAssestsIcon} alt="free assets" />
              </div>
              <div className="text-3xl font-bold leading-8 mt-6 dark:text-white">
                {allData?.total_assets - allData?.total_assets_active_in_lease}
              </div>
              <div className="text-base text-gray-400 mt-1 dark:text-slate-200">
                Free Assets
              </div>
            </div>
          </div>
          <div className="basis-full md:basis-1/4 my-5 report-box zoom-in hover:scale-105 " onClick={() => navigate("/lease")}>
            <div className="box p-5 mx-5 rounded-lg bg-white dark:bg-slate-900 shadow-sm">
              <div className="flex">
                <img src={leasedAssets} alt="leased assets" />
              </div>
              <div className="text-3xl font-bold leading-8 mt-6 dark:text-white">
                {allData?.total_assets_active_in_lease}
              </div>
              <div className="text-base text-gray-400 mt-1 dark:text-slate-200">
                Asset Leased
              </div>
            </div>
          </div>
          <div className="basis-full md:basis-1/4 my-5 report-box zoom-in hover:scale-105 " onClick={() => navigate("/maintenance")}>
            <div className="box p-5 mx-5 rounded-lg bg-white dark:bg-slate-900 shadow-sm">
              <div className="flex">
                <img src={assetsInMaintenance} alt="assets under maintenance" />
              </div>
              <div className="text-3xl font-bold leading-8 mt-6 dark:text-white">
                {allData?.total_assets_in_maintenance}
              </div>
              <div className="text-base text-gray-400 mt-1 dark:text-slate-200">
                Asset under Maintenance
              </div>
            </div>
          </div>
        </div>

        {/* <!--Assets boxes 2nd row--> */}
        <div className="flex flex-col md:flex-row animSlideup relative">
          <div className="basis-full md:basis-1/4 my-5 report-box zoom-in hover:scale-105 ">
            <div className="box p-5 mx-5 rounded-lg bg-white dark:bg-slate-900 shadow-sm">
              <div className="flex">
                <img src={assetsInBreakdown} alt="assets under Breakdown" />
              </div>
              <div className="text-3xl font-bold leading-8 mt-6 dark:text-white">
                {" "}
                0{" "}
              </div>
              <div className="text-base text-gray-400 mt-1 dark:text-slate-200">
                Asset under Breakdown
              </div>
            </div>
          </div>
          <div className=" basis-full md:basis-1/4 my-5 report-box zoom-in hover:scale-105 ">
            <div className=" box p-5 mx-5 rounded-lg bg-white dark:bg-slate-900 shadow-sm">
              <div className="flex justify-between">
                <img src={usageHours} alt="usage hours" />
                <div className="relative justify-end ">
                  <select
                    type="text"
                    onchange="getUsageHrs(this)"
                    className="text-xs pl-2 pr-3 py-1 font-medium text-slate-500 tracking-wider input  border rounded-lg border-slate-300 dark:bg-slate-700 dark:text-white  cursor-pointer"
                  >
                    <option value="week">Weekly</option>
                    <option value="month" selected>
                      Monthly
                    </option>
                    <option value="year">Yearly</option>
                    <option value="cumulative">Cumulative</option>
                  </select>
                </div>
              </div>
              <div className="text-3xl font-bold leading-8 mt-6 dark:text-white">
                {" "}
                0.00{" "}
              </div>
              <div className="">
                <span className="text-base text-gray-400 mt-1 dark:text-slate-200">
                  Usage hours:{" "}
                </span>
                <span
                  id="usage_hrs"
                  className=" text-base text-gray-400 mt-1 dark:text-slate-200"
                >
                  Last Month
                </span>
              </div>
            </div>
          </div>
          <div className="basis-full md:basis-1/4 my-5 report-box zoom-in hover:scale-105 ">
            <div className="box p-5 mx-5 rounded-lg bg-white dark:bg-slate-900 shadow-sm">
              <div className="flex justify-between">
                <img src={actualhours} alt=" actual hours" />
                <div className="relative justify-end ">
                  <select
                    type="text"
                    onchange="getActualHrs(this)"
                    className=" text-xs pl-2 pr-3 py-1 font-medium text-slate-500 tracking-wider input border rounded-lg border-slate-300 dark:bg-slate-700 dark:text-white cursor-pointer"
                  >
                    <option value="week">Weekly</option>
                    <option value="month" selected>
                      Monthly
                    </option>
                    <option value="year">Yearly</option>
                    <option value="cumulative">Cumulative</option>
                  </select>
                </div>
              </div>
              <div className="text-3xl font-bold leading-8 mt-6 dark:text-white">
                {" "}
                0.00{" "}
              </div>
              <div className="">
                <span className="text-base text-gray-400 mt-1 dark:text-slate-200">
                  Actual hours:{" "}
                </span>
                <span
                  id="actual_hrs"
                  className="text-base text-gray-400 mt-1 dark:text-slate-200"
                >
                  Last Month
                </span>
              </div>
            </div>
          </div>
          <div className="basis-full md:basis-1/4 my-5 report-box zoom-in hover:scale-105 ">
            <div className="box p-5 mx-5 rounded-lg bg-white dark:bg-slate-900 shadow-sm">
              <div className="flex">
                <img src={totalOperators} alt="total operators" />
              </div>
              <div className="text-3xl font-bold leading-8 mt-6 dark:text-white">
                {allData?.total_number_operator}
              </div>
              <div className="text-base text-gray-400 mt-1 dark:text-slate-200">
                Total Operators
              </div>
            </div>
          </div>
        </div>
      </div>
      <CategoryTable />
    </Layout>
  );
}

export default Dashboard;

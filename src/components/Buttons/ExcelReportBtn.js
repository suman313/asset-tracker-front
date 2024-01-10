import React from "react";
import exportFromJSON from "export-from-json";
import axios from "axios";
import { setBaseUrl } from "../../config";

function ExcelReportBtn({ section }) {
  const handleClick = async () => {
    let setDownloadUrl = "";
    if (section == "assets") {
      setDownloadUrl = `${setBaseUrl}/asset/get_excel_json`;
    } else if (section == "maintenance") {
      setDownloadUrl = `${setBaseUrl}/maintenance/get-json-data`;
    } else if (section == "lease") {
      setDownloadUrl = `${setBaseUrl}/lease/get-json-data`;
    } else {
      setDownloadUrl = `${setBaseUrl}/operator/get-json-data`;
    }
    try {
      const { data } = await axios.get(setDownloadUrl, {
        headers: {
          "x-access-tokens": sessionStorage.getItem("token"),
        },
      });
      console.log(data);
      // const dataModified = data.map((item) => {
      //   let tempItem = {
      //     ...item,
      //     ...item.commercial_detail,
      //     ...item.config_data,
      //   };
      //   delete tempItem.commercial_detail;
      //   delete tempItem.config_data;
      //   return tempItem;
      // });
      const fileName = `All ${section} List`;
      const exportType = exportFromJSON.types.xls;
      exportFromJSON({ data: data, fileName, exportType });
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };
  return (
    <button
      className="flex button text-white bg-lime-500 py-2 px-2 rounded-md shadow-md mr-2 text-xs sm:text-sm cursor-pointer"
      onClick={handleClick}
    >
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
        className="w-4 h-4 mr-2 feather feather-download"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
      </svg>{" "}
      Excel Report
    </button>
  );
}

export default ExcelReportBtn;

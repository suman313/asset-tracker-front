import React from "react";
import { CirclesWithBar } from "react-loader-spinner";

export const TableLoader = () => {
  return (
    <div className=" h-[50vh] w-[100vw] flex justify-center items-center ">
      <CirclesWithBar
        height="100"
        width="100"
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        outerCircleColor=""
        innerCircleColor=""
        barColor=""
        ariaLabel="circles-with-bar-loading"
      />
    </div>
  );
};

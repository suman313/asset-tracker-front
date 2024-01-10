import React from "react";

import { Blocks } from "react-loader-spinner";

function Loader() {
  return (
    // fixed inset-0 z-[9999]
    <div className="flex justify-center items-center w-full h-[55vh]  bg-white">
      <Blocks
        height="100"
        width="100"
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        outerCircleColor=""
        innerCircleColor=""
        barColor=""
        ariaLabel="blocks-wrapper"
      />
    </div>
  );
}

export default Loader;

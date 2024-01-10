import React from "react";

import { Blocks } from "react-loader-spinner";

function OuterLoader() {
  return (
    // fixed inset-0 z-[9999]
    <div className="flex justify-center items-center fixed inset-0 z-[9999] bg-white">
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

export default OuterLoader;

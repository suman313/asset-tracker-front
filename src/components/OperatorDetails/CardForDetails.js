import React from "react";

function CardForDetails({ svg, name, details }) {
  return (
    <div className="flex flex-col justify-around items-center p-2 h-[10rem]  bg-[#fff]">
      <img src={svg} />
      <p className="text-[1.5rem] text-[#8e909a]">{details}</p>
      <p className="text-[1rem] text-[#d13131]">{name}</p>
    </div>
  );
}

export default CardForDetails;

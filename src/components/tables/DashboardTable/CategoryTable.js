import React, { useEffect, useState } from "react";
import { get_data_by_categories } from "../../../apis";

function CategoryTable() {
  const categories = [
    "Telescopic Boom",
    "Articulating Boom",
    "VTL",
    "Diesel Scissors",
    "nill",
    "Truck Mounted Boom",
    "Runabout",
  ];

  const [unlinked_assets, setUnlinked_assets] = useState([]);
  const [Leased_assets, setLeased_assets] = useState([]);
  const [maintenance_assets, setMaintenance_assets] = useState([]);

  const getUnlinked_assets = async () => {
    try {
      const { data } = await get_data_by_categories();
      console.log(data);
      let temp_unlinked_assets = [];
      let temp_leased_assets = [];
      let temp_maintenance_assets = [];
      data.forEach((item) => {
        for (const property in item) {
          temp_leased_assets.push(item[property].lease.length);
          temp_unlinked_assets.push(item[property].unlink_asset.length);
          temp_maintenance_assets.push(item[property].maintenance.length);
        }
      });
      setUnlinked_assets(temp_unlinked_assets);
      setLeased_assets(temp_leased_assets);
      setMaintenance_assets(temp_maintenance_assets);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUnlinked_assets();
  }, []);

  return (
    <div className="flex justify-center items-center p-5 mt-5 ">
      <table className=" border-[0px] border-[#fff] bg-gradient-to-r from-[#756b94] via-[#1b1663] to-[#756b94] rounded-[1rem]">
        <thead className="text-white ">
          <tr className="border border-slate-300">
            <td className="p-5 text-center ">Category</td>
            <td className="p-5 text-center">Unlinked Assets</td>
            <td className="p-5 text-center">Leased</td>
            <td className="p-5 text-center">Under Maintenance</td>
            <td className="p-5 text-center"> Under Breakdown</td>
          </tr>
        </thead>
        <tbody>
          {categories.map((item, index) => (
            <tr className="border border-slate-300 text-white">
              <td className="p-2 text-center">{item}</td>
              <td className="p-2 text-center">{unlinked_assets[index]}</td>
              <td className="p-2 text-center">{Leased_assets[index]}</td>
              <td className="p-2 text-center">{maintenance_assets[index]}</td>
              <td className="p-2 text-center">- -</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CategoryTable;

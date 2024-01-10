import { useQuery } from "@tanstack/react-query";
import React from "react";
import { partsData } from "../../../utils/Search";
import AsyncSelect from 'react-select/async';

import { getPartDetails } from "../../../apis/maintenance/getPartDetails";

function MaintenanceTableInput({
  index,
  text,
  oneTupleDetails,
  partDetails,
  setPartDetails,
  id,
  partsForInstallation
}) {

  const filterColors = (inputValue) => {
    return partsForInstallation.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadOptions = (
    inputValue,
    callback
  ) => {
    if(inputValue.length >= 3){
    setTimeout(() => {
      callback(filterColors(inputValue));
    }, 1000);
  }
  };
  const handlePartId = () => {
    setPartDetails((prev) => {
      const updatedDetails = [...prev];
      console.log(index);
      updatedDetails[index] = { ...oneTupleDetails, part_id: id };
      console.log(updatedDetails);
      return updatedDetails;
    });
  };

  React.useEffect(() => {
    if (id !== null) {
      handlePartId();
    }
  }, []);

  // const handlePartName = (e) => {
  //   setPartDetails((prev) => {
  //     const updatedDetails = [...prev]
  //     console.log(index)
  //     updatedDetails[index] = {...oneTupleDetails, "part_name": e.target.value}
  //     console.log(updatedDetails);
  //     return updatedDetails;
  //   })
  // };

  const handlePartNo = (e) => {
    setPartDetails((prev) => {
      const updatedDetails = [...prev];
      console.log(index);
      updatedDetails[index] = { ...oneTupleDetails, part_no: e.value };
      console.log(updatedDetails);
      return updatedDetails;
    });
  };

  const handleDescription = (e) => {
    setPartDetails((prev) => {
      const updatedDetails = [...prev];
      updatedDetails[index] = {
        ...oneTupleDetails,
        part_description: e.target.value,
      };
      return updatedDetails;
    });
  };

  const handleQty = (e) => {
    setPartDetails((prev) => {
      const updatedDetails = [...prev];
      updatedDetails[index] = { ...oneTupleDetails, quantity: e.target.value };
      return updatedDetails;
    });
  };

  const handlePrice = (e) => {
    setPartDetails((prev) => {
      const updatedDetails = [...prev];
      updatedDetails[index] = { ...oneTupleDetails, price: e.target.value };
      return updatedDetails;
    });
  };


  return (
    <>
      {/* <div className=" p-1 border-[1px] "><input className="w-full " defaultValue={partDetails?.part_name === undefined ? "" : partDetails?.part_name} type="text" name="part_name" placeholder="part name" onChange={handlePartName} /></div> */}
      <div className=" p-1 border-[1px] ">
        {/* <input
          className="w-full "
          defaultValue={
            partDetails?.part_no === undefined ? "" : partDetails?.part_no
          }
          type="text"
          name="part_no"
          placeholder="part no."
          onChange={handlePartNo}
        /> */}
      
       <AsyncSelect cacheOptions loadOptions={loadOptions} defaultOptions onChange={handlePartNo}/>
      <div className="text-center text-red-500 p-2">Enter atleast 3 characters to initiate search</div>
      </div>
      <div className=" p-1  ">
        <input
          className="w-full h-[50%] text-center focus:outline-none border-[1px]"
          defaultValue={
            partDetails?.quantity === undefined ? "" : partDetails.quantity
          }
          type="text"
          name="quantity"
          placeholder="quantity"
          onChange={handleQty}
        />
      </div>
      {text === "installation" && (
        <div className=" p-1 ">
          <input
            className="w-full h-[50%] text-center focus:outline-none border-[1px]"
            type="text"
            name="price"
            defaultValue={
              partDetails?.price === undefined ? "" : partDetails.price
            }
            placeholder="price"
            onChange={handlePrice}
          />
        </div>
      )}
    </>
  );
}

export default MaintenanceTableInput;

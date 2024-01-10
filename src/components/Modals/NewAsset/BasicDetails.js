import React, { useEffect, useState } from "react";

function BasicDetails({ assetBasicDetails, setAssetBasicDetails }) {
  const categories = [
    "Articulating Boom",
    "Telescopic Boom",
    "Truck Mounted Boom",
    "Diesel Scissors",
    "VTL",
    "Runabout",
    "Battery Scissors",
  ];

  const handleSelectChange = (e) => {
    setAssetBasicDetails({
      ...assetBasicDetails,
      category: e.target.value,
    });
  };
  useEffect(() => {
    setAssetBasicDetails({
      ...assetBasicDetails,
      category: categories[0],
    });
    console.log(assetBasicDetails);
  }, []);
  return (
    <div class="flex animSlideup relative">
      <div class="intro-y box basis-1/3 bg-white dark:bg-slate-900 rounded-lg mx-2 shadow-md hover:shadow-xl">
        <div class="flex items-center p-5 border-b border-gray-200 dark:border-dark-5">
          <h2 class="font-medium text-base mr-auto">Basic Feilds</h2>
        </div>
        <div class="p-5 text-sm">
          <div class="flex flex-col">
            <div class="w-full">
              <label class="">Asset No*</label>
              <input
                type="text"
                value={assetBasicDetails?.asset_no}
                placeholder="Asset No"
                class="input w-full border text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm mt-2 p-2"
                onChange={(e) =>
                  setAssetBasicDetails({
                    ...assetBasicDetails,
                    asset_no: e.target.value,
                  })
                }
              />
            </div>
            <div class="w-full mt-2">
              <label class="">Make*</label>
              <input
                type="text"
                value={assetBasicDetails?.make}
                placeholder="Make"
                class="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900  font-medium rounded-md text-sm"
                onChange={(e) =>
                  setAssetBasicDetails({
                    ...assetBasicDetails,
                    make: e.target.value,
                  })
                }
              />
            </div>
            <div class="w-full mt-2">
              <label class="">Model*</label>
              <input
                type="text"
                value={assetBasicDetails?.model}
                placeholder="Model"
                onChange={(e) =>
                  setAssetBasicDetails({
                    ...assetBasicDetails,
                    model: e.target.value,
                  })
                }
                class="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
              />
            </div>
            <div class="w-full mt-3">
              <label class="">Description</label>
              <textarea
                rows="2"
                value={assetBasicDetails?.description}
                placeholder="Say something that best describes the asset"
                onChange={(e) =>
                  setAssetBasicDetails({
                    ...assetBasicDetails,
                    description: e.target.value,
                  })
                }
                class="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <div class="intro-y box basis-1/3 bg-white dark:bg-slate-900 rounded-lg mx-2 shadow-md hover:shadow-xl">
        <div class="flex items-center p-5 border-b border-gray-200 dark:border-dark-5">
          <h2 class="font-medium text-base mr-auto">Asset Details</h2>
        </div>
        <div class="p-5 text-sm">
          <div class="flex flex-col">
            <div class="w-full">
              <label class="">Serial No</label>
              <input
                type="text"
                value={assetBasicDetails?.serial_no}
                placeholder="Serial No"
                onChange={(e) =>
                  setAssetBasicDetails({
                    ...assetBasicDetails,
                    serial_no: e.target.value,
                  })
                }
                class="input w-full border text-gray-500 border-slate-300 dark:bg-slate-900  font-medium rounded-md text-sm mt-2 p-2"
              />
            </div>
            <div class="w-full mt-2">
              <label class="">Purchased from*</label>
              <input
                type="text"
                value={assetBasicDetails?.purchased_from}
                placeholder="Purchased From"
                onChange={(e) =>
                  setAssetBasicDetails({
                    ...assetBasicDetails,
                    purchased_from: e.target.value,
                  })
                }
                class="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
              />
            </div>
            <div class="w-full mt-2">
              <label class="">RFID</label>
              <input
                type="text"
                value={assetBasicDetails?.rfid}
                placeholder="RFID Not Required"
                // onChange={(e) => setAssetBasicDetails({...assetBasicDetails, rfid: e.target.value})}
                // disabled={true}
                className="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900  font-medium rounded-md text-sm"
              />
            </div>
            <div className="w-full mt-3">
              <label className="">Device Id</label>
              <input
                type="text"
                value={assetBasicDetails?.device_id}
                placeholder="Device Hash Not Required"
                // disabled={true}
                onChange={(e) => setAssetBasicDetails({...assetBasicDetails, device_id: e.target.value})}
                className="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900  font-medium rounded-md text-sm"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="intro-y box basis-1/3 bg-white dark:bg-slate-900 rounded-lg mx-2 shadow-md hover:shadow-xl">
        <div className="flex items-center p-5 border-b border-gray-200 dark:border-dark-5">
          <h2 className=" font-medium text-base mr-auto">Others</h2>
        </div>
        <div class="p-5 text-sm">
          <div class="flex flex-col">
            <div class="w-full">
              <label class="">YOM*</label>
              <input
                value={assetBasicDetails?.yom}
                type="text"
                placeholder="YOM"
                onChange={(e) =>
                  setAssetBasicDetails({
                    ...assetBasicDetails,
                    yom: e.target.value,
                  })
                }
                class="input w-full border text-gray-500 border-slate-300 dark:bg-slate-900  font-medium rounded-md text-sm mt-2 p-2"
              />
            </div>
            <div class="w-full">
              <label class="">Site Location*</label>
              <input
                value={assetBasicDetails?.site_location}
                type="text"
                placeholder="Site Loacation"
                required
                onChange={(e) =>
                  setAssetBasicDetails({
                    ...assetBasicDetails,
                    site_location: e.target.value,
                  })
                }
                class="input w-full border text-gray-500 border-slate-300 dark:bg-slate-900  font-medium rounded-md text-sm mt-2 p-2"
              />
            </div>
            <div class="flex flex-col mt-2">
              <label class="">Category*</label>
              <select
                className="border-2 rounded-md p-2"
                onChange={handleSelectChange}
              >
                {/* <option value="" selected disabled hidden>
                  Choose here
                </option> */}
                {categories.map((category) => (
                  <option key={category} value={category} selected={assetBasicDetails?.category===category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            {/* <div class="w-full mt-3">
                <div class="flex justify-between">
                  <label class="">Location*</label>
                  <button
                    id="open-btn"
                    onclick="openModal('newLocation_modal');"
                    class="block bg-blue-800 text-white text-xs rounded px-2 py-1 cursor-pointer"
                    type="button"
                  >
                    +New
                  </button>
                </div>
                <select class="input w-full border mt-2 text-gray-500 border-slate-300 dark:bg-slate-900  font-medium rounded-md text-sm">
                  <option value="bb4eaffe-6d14-4589-8495-f7b76948e6dd">
                    {" "}
                    Pon Nagar, Parivakkam{" "}
                  </option>
                  <option value="b50d06eb-bd71-4a7d-bdd4-bd55288c5613">
                    {" "}
                    Shamshabad, Mamidpally{" "}
                  </option>
                  <option value="8db77f4e-5966-4e10-93f4-32fe7be72ed7">
                    {" "}
                    Airport (L&amp;T Gate){" "}
                  </option>
                  <option value="3b46f800-9cbf-44b0-a007-6c3ade64a3e3">
                    {" "}
                    Hyderabad{" "}
                  </option>
                  <option value="06822b0a-f80d-4232-a109-04c9c09121ce">
                    {" "}
                    Hyderabad{" "}
                  </option>
                </select>
              </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasicDetails;

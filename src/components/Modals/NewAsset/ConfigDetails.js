import React from "react";

function ConfigDetails({ assetConfigDetails, setAssetConfigDetails }) {
  return (
    <div class="flex animSlideup relative">
      <div class="intro-y basis-1/3 bg-white dark:bg-slate-900 rounded-lg mx-2 mt-5 shadow-md hover:shadow-xl">
        <div class="flex items-center p-5 border-b border-gray-200 dark:border-dark-5">
          <h2 class="font-medium text-base mr-auto">Configuration Feilds</h2>
        </div>
        <div class="p-5 text-sm">
          <div class="flex flex-col">
            <div class="w-full">
              <div class="flex justify-between">
                <label>USED/NEW</label>
              </div>
              <select
                class="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
                value={assetConfigDetails?.used_or_new}
                onChange={(e) => setAssetConfigDetails({...assetConfigDetails, used_or_new: e.target.value})}
              >
                <option value="used">Used</option>
                <option value="new">New</option>
              </select>
            </div>
            <div class="w-full mt-2">
              <div class="flex justify-between">
                <label>ANSI/CE</label>
              </div>
              <select class="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
              value={assetConfigDetails?.ansi_or_new}
              onChange={(e) => setAssetConfigDetails({...assetConfigDetails, ansi_or_new: e.target.value})}
              >
                <option value="ansi">ANSI</option>
                <option value="ce">CE</option>
              </select>
            </div>
            <div class="w-full mt-2">
              <div class="flex justify-between">
                <label>Machine Ownership Ship Type</label>
              </div>
              <select class="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
              value={assetConfigDetails?.machine_ownership_type}
              onChange={(e) => setAssetConfigDetails({...assetConfigDetails, machine_ownership_type: e.target.value})}
              >
                <option value="rental">Rental</option>
                <option value="sands">S and S</option>
                <option value="retail">Retail</option>
                <option value="sold">Sold</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="intro-y basis-1/3 bg-white dark:bg-slate-900 rounded-lg mx-2 mt-5 shadow-md hover:shadow-xl">
        <div class="flex items-center p-5 border-b border-gray-200 dark:border-dark-5">
          <h2 class="font-medium text-base mr-auto py-3"></h2>
        </div>
        <div class="p-5 text-sm">
          <div class="w-full mt-0">
            <div class="flex justify-between">
              <label>DIESEL/BATTERY</label>
            </div>
            <select class="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
            value={assetConfigDetails?.battery_type}
            onChange={(e) => setAssetConfigDetails({...assetConfigDetails, battery_type: e.target.value})}
            >
              <option value="diesel">Diesel</option>
              <option value="battery">Battery</option>
            </select>
          </div>
          <div class="w-full mt-2">
            <label class="">ENGINE SR.NO</label>
            <input
              type="text"
              value={assetConfigDetails.engine_serial_no}
              onChange={(e) => setAssetConfigDetails({...assetConfigDetails, engine_serial_no: e.target.value})}
              placeholder="Engine sr.no"
              class="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sms"
            />
          </div>
          <div class="w-full mt-2">
            <label class="">2WD / 4WD</label>
            <select class="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm" 
            value={assetConfigDetails.two_or_four_wd}
            onChange={(e) => setAssetConfigDetails({...assetConfigDetails, two_or_four_wd: e.target.value})}
            >
              <option value="2WD">2WD</option>
              <option value="4WD">4WD</option>
            </select>
          </div>
        </div>
      </div>
      <div class="intro-y box basis-1/3 bg-white dark:bg-slate-900 rounded-lg mx-2 mt-5 shadow-md hover:shadow-xl">
        <div class="flex items-center p-5 border-b border-gray-200 dark:border-dark-5">
          <h2 class=" font-medium  text-base mr-auto">
            Others
          </h2>
        </div>
        <div class="p-5 text-sm">
          <div class="flex flex-col">
            <div class="w-full">
              <label class="">Accessories (if any)</label>
              <input
                type="text"
                value={assetConfigDetails?.accessories}
                onChange={(e) => setAssetConfigDetails({...assetConfigDetails, accessories: e.target.value})}
                placeholder="Accessories"
                class="input w-full border p-2 border-slate-300 dark:bg-slate-900  font-medium rounded-md text-sm mt-2"
              />
            </div>

            <div class="w-full mt-3">
              <label class="">Tires</label>
              <select class="input w-full border p-2 text-gray-500 mt-2 border-slate-300 dark:bg-slate-900  font-medium rounded-md text-sm"
              value={assetConfigDetails.tyres}
              onChange={(e) => setAssetConfigDetails({...assetConfigDetails, tyres: e.target.value})}
              >
                <option> Airfilled </option>
                <option> Foam </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfigDetails;

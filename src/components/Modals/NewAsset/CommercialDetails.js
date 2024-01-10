import React, { useState } from 'react'

function CommercialDetails({commToggle, setCommToggle,commercialDetails,setCommercialDetails }) {
    const handleToggle = () => {
        setCommToggle((prev)=> !prev)
    }
  return (
    <>
    <div className="flex animSlideup relative">
      <div className="intro-y box basis-1/2 bg-white dark:bg-slate-900 rounded-lg mx-2 mt-5 shadow-md hover:shadow-xl">
        <div className="flex items-center p-5 border-b border-gray-200 dark:border-dark-5">
          <h2 className="font-medium text-base mr-auto">Commercial Details</h2>
          <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
            <input
              onClick={handleToggle}
              type="checkbox"
              name="toggle"
              id="showComm"
              className="comToggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-2 appearance-none cursor-pointer"
            />
            <label
              for="showComm"
              className="comToggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
            ></label>
          </div>
        </div>

        {commToggle && <div id="" className="showOnComm p-5 text-sm">
          <div className="flex flex-col">
            <div className="w-full mt-2">
              <label className=""> PO No.and copy placed on OEM</label>
              <input
                type="text"
                value={commercialDetails?.purchase_order_no}
                placeholder="PO No.and copy placed on OEM"
                onChange={(e) => setCommercialDetails({...commercialDetails, purchase_order_no: e.target.value })}
                className="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
              />
            </div>
            <div className="w-full mt-2">
              <label className=""> PO Date</label>
              <input
                type="date"
                value={commercialDetails?.purchase_order_date}
                onChange={(e) => setCommercialDetails({...commercialDetails, purchase_order_date:e.target.value})}
                className="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
              />
            </div>
            <div className="w-full mt-2">
              <label className=""> Invoice No.</label>
              <input
                type="text"
                placeholder="Invoice No."
                value={commercialDetails?.invoice_no}
                onChange={(e) => setCommercialDetails({...commercialDetails, invoice_no:e.target.value})}
                className="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
              />
            </div>
            <div className="w-full mt-2">
              <label className=""> Invoice Date</label>
              <input
                type="date"
                value={commercialDetails?.invoice_date}
                onChange={(e) => setCommercialDetails({...commercialDetails, invoice_date:e.target.value})}
                className="input w-full border mt-2 p-2 border-slate-300 text-gray-500 dark:bg-slate-900 font-medium rounded-md text-sm"
              />
            </div>
            <div className="w-full mt-2">
              <label className=""> Payment Terms</label>
              <input
                type="text"
                value={commercialDetails?.payment_terms}
                onChange={(e) => setCommercialDetails({...commercialDetails, payment_terms:e.target.value})}
                placeholder="Payment Terms"
                className="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
              />
            </div>
            <div className="w-full mt-2">
              <label className=""> Payment Remitted to OEM</label>
              <input
                type="text"
                value={commercialDetails?.amount_rem_to_oem}
                onChange={(e) => setCommercialDetails({...commercialDetails, amount_rem_to_oem:e.target.value})}
                placeholder="Payment Remitted to OEM"
                className="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
              />
            </div>
            <div className="w-full mt-2">
              <label className=""> Date of Payment Remitted to OEM</label>
              <input
                type="date"
                value={commercialDetails?.date_of_rem_to_oem}
                onChange={(e) => setCommercialDetails({...commercialDetails, date_of_rem_to_oem : e.target.value})}
                className="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
              />
            </div>
            <div className="w-full mt-2">
              <label className=""> Exchange Rate of Remittence</label>
              <input
                type="text"
                value={commercialDetails?.exchange_rate_rem}
                onChange={(e) => setCommercialDetails({...commercialDetails, exchange_rate_rem:e.target.value})}
                placeholder="Exchange Rate of Remittence"
                className="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
              />
            </div>
          </div>
        </div>}
      </div>
      {commToggle && <div className="showOnComm  intro-y  box basis-1/2 bg-white dark:bg-slate-900 rounded-lg mx-2 mt-5 shadow-md hover:shadow-xl">
        <div className="flex items-center p-5 border-b border-gray-200 dark:border-dark-5">
          <h2 className="font-medium text-base mr-auto">
            Commercial Details
          </h2>
        </div>
        <div className="p-5 text-sm">
          <div className="flex flex-col">
            <div className="w-full mt-2">
              <label className=""> Date of Custom Duty Payment</label>
              <input
                type="date"
                value={commercialDetails?.custom_duty_payment}
                onChange={(e) => setCommercialDetails({...commercialDetails, custom_duty_payment:e.target.value})}
                className="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
              />
            </div>
            <div className="w-full mt-2">
              <label className=""> Ex Work Price</label>
              <input
                type="text"
                value={commercialDetails?.exworks_price}
                onChange={(e) => setCommercialDetails({...commercialDetails, exworks_price: e.target.value})}
                placeholder="Ex Work Price"
                className="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
              />
            </div>
            <div className="w-full mt-2">
              <label className=""> CIF Charges</label>
              <input
                type="text"
                value={commercialDetails?.cif_charges}
                onChange={(e) => setCommercialDetails({...commercialDetails, cif_charges: e.target.value})}
                placeholder="0"
                className="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
              />
            </div>
            <div className="w-full mt-2">
              <label className=""> Total Cost</label>
              <input
                type="text"
                value={commercialDetails?.total_cost}
                onChange={(e) => setCommercialDetails({...commercialDetails, total_cost: e.target.value})}
                placeholder="0"
                className="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
              />
            </div>
            <div className="w-full mt-2">
              <label className=""> BOE No.</label>
              <input
                type="text"
                value={commercialDetails?.boe_no}
                onChange={(e) => setCommercialDetails({...commercialDetails, boe_no: e.target.value})}
                placeholder="BOE No."
                className="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
              />
            </div>
            <div className="w-full mt-2">
              <label className=""> Custom Duty Value</label>
              <input
                type="text"
                value={commercialDetails?.custom_duty_value}
                onChange={(e) => setCommercialDetails({...commercialDetails, custom_duty_value: e.target.value})}
                placeholder="Custom Duty Value"
                className="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
              />
            </div>
            <div className="w-full mt-2">
              <label className=""> GST Amount</label>
              <input
                type="text"
                value={commercialDetails?.gst_amount}
                onChange={(e) => setCommercialDetails({...commercialDetails, gst_amount: e.target.value})}
                placeholder="GST Amount"
                className="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
              />
            </div>
            <div className="w-full mt-2">
              <label className=""> Ex Rate as per BOE</label>
              <input
                type="text"
                value={commercialDetails?.exrate_boe}
                onChange={(e) => setCommercialDetails({...commercialDetails, exrate_boe: e.target.value})}
                placeholder="Ex Rate as per BOE"
                className="input w-full border mt-2 p-2 text-gray-500 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
              />
            </div>
          </div>
        </div>
      </div>}
    </div>
    {commToggle && <div className="showOnComm">
        <div className="flex ">
          <div className="intro-y box basis-1/3 bg-white dark:bg-slate-900 rounded-lg mx-2 mt-5 shadow-md hover:shadow-xl">
            <div className="p-5 text-sm">
              <div className="flex flex-col">
                <div className="w-full mt-2">
                  <label className=""> Clearing Charges </label>
                  <input
                    type="text"
                    value={commercialDetails?.clearing_charges}
                    onChange={(e) => setCommercialDetails({...commercialDetails, clearing_charges: e.target.value})}
                    placeholder="Clearing Charges"
                    className="input w-full border mt-2 p-2 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
                  />
                </div>
                <div className="w-full mt-2">
                  <label className=""> CHA Charges </label>
                  <input
                    type="text"
                    value={commercialDetails?.cha_charges}
                    onChange={(e) => setCommercialDetails({...commercialDetails, cha_charges: e.target.value})}
                    placeholder="CHA Charges"
                    className="input w-full border mt-2 p-2 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
                  />
                </div>
                <div className="w-full mt-2">
                  <label className=""> Transportation charges upto yard </label>
                  <input
                    type="text"
                    value={commercialDetails?.transportation_charges}
                    onChange={(e) => setCommercialDetails({...commercialDetails, transportation_charges: e.target.value}) }
                    placeholder="Transportation charges upto yard"
                    className="input w-full border mt-2 p-2 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
                  />
                </div>
                <div className="w-full mt-2">
                  <label className=""> Country / Port of dispatch </label>
                  <input
                    type="text"
                    value={commercialDetails?.port_of_dispatch}
                    onChange={(e) => setCommercialDetails({...commercialDetails, port_of_dispatch: e.target.value})}
                    placeholder="Country / Port of dispatch"
                    className="input w-full border mt-2 p-2 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="intro-y box basis-1/3 bg-white dark:bg-slate-900 rounded-lg mx-2 mt-5 shadow-md hover:shadow-xl">
            <div className="p-5 text-sm">
              <div className="flex flex-col">
                <div className="w-full mt-2">
                  <label className=""> Port of clearance </label>
                  <input
                    type="text"
                    value={commercialDetails?.port_of_clearance}
                    onChange={(e) => setCommercialDetails({...commercialDetails, port_of_clearance: e.target.value})}
                    placeholder="Port of clearance"
                    className="input w-full border mt-2 p-2 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
                  />
                </div>
                <div className="w-full mt-2">
                  <label className=""> Under which GST machine cleared </label>
                  <input
                    type="text"
                    placeholder="Under which GST machine cleared"
                    className="input w-full border mt-2 p-2 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
                  />
                </div>
                {/* <div className="w-full mt-2">
                  <label className=""> Insurance Cost </label>
                  <input
                    type="text"
                    value={}
                    placeholder="Insurance Cost"
                    className="input w-full border mt-2 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
                  />
                </div> */}
                {/* <div className="w-full mt-2">
                  <label className=""> Insurer </label>
                  <input
                    type="text"
                    placeholder="Insurer"
                    className="input w-full border mt-2 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
                  />
                </div> */}
              </div>
            </div>
          </div>
          <div className="intro-y box basis-1/3 bg-white dark:bg-slate-900 rounded-lg mx-2 mt-5 shadow-md hover:shadow-xl">
            <div className="p-5 text-sm">
              <div className="flex flex-col">
                <div className="w-full mt-2">
                  <label className=""> Period of Insurance </label>
                  <input
                    type="text"
                    value={commercialDetails?.period_of_insurance}
                    onChange={(e) => setCommercialDetails({...commercialDetails, period_of_insurance: e.target.value})}
                    placeholder="Period of Insurance"
                    className="input w-full border mt-2 p-2 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
                  />
                </div>
                <div className="w-full mt-2">
                  <label className=""> Renewal Date </label>
                  <input
                    type="date"
                    value={commercialDetails?.insurance_renewal}
                    onChange={(e) => setCommercialDetails({...commercialDetails, insurance_renewal: e.target.value})}
                    className="input w-full border mt-2 p-2 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
                  />
                </div>
                <div className="w-full mt-2">
                  <label className=""> Total Landed Cost </label>
                  <input
                    type="text"
                    value={commercialDetails?.total_landed_cost}
                    onChange={(e) => setCommercialDetails({...commercialDetails, total_landed_cost: e.target.value})}
                    placeholder="Total Landed Cost"
                    className="input w-full border p-2 mt-2 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
                  />
                </div>
                <div className="w-full mt-2">
                  <label className=""> Total Landed Cost + GST </label>
                  <input
                    type="text"
                    value={commercialDetails?.total_landed_cost_with_gst}
                    onChange={(e) => setCommercialDetails({...commercialDetails, total_landed_cost_with_gst: e.target.value})}
                    placeholder="Total Landed Cost + GST"
                    className="input w-full border mt-2 p-2 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>}
    </>
  )
}

export default CommercialDetails
import React from 'react'

function NewLocation() {
  return (
    <div id="newLocation_modal" class=" hidden absolute top-0 z-40 left-72 w-6/12 border p-4 shadow-lg rounded-md bg-white dark:bg-slate-700 animSlideup">
    <h2 data-v-6fbed78c="" class="font-medium text-xl mr-auto mb-2">New Location</h2>
                <div class="basis-full">
                    <label for="">Location</label> <br /> <input type="text" placeholder="eg: Kolkata" class="input w-full rounded-lg border mt-2 flex-1" wfd-id="id14" />    
                </div>
                <div  class="basis-full mt-4">
                  <label  class="">Site Id</label>
                  <select  class="input w-full border mt-2 rounded-lg  text-gray-500">
                  <option data-v-4cb394da="" value="fd5c6914-1993-4fc6-84c8-94f0e122d6d3"> Poonamalle </option><option data-v-4cb394da="" value="40b8524c-db63-48be-ac25-73bfae5406da"> Rajiv Gandhi  Airport (L&amp;T Gate) </option><option data-v-4cb394da="" value="8a297566-93d8-46b6-ba03-1a2b3a7ea20f"> Amazon Circle (GMR) </option><option data-v-4cb394da="" value="f2dcb6d3-b078-444a-82d1-d5fd28ae60e4"> Rajiv Gandhi International Airport (Basement) </option></select><div data-v-4cb394da="" class="text-xs text-red-500 mt-2"></div>
                </div>
                <div class="text-right px-4 py-3 mt-3 ">
                      <button id="ok-btn"  onclick="closeModal('newLocation_modal');" class="inline px-4 py-2 bg-blue-200  text-black text-sm font-medium rounded-md w-1/4 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300">
                        Cancel
                      </button>
                      <button id="ok-btn" onclick="closeModal('newLocation_modal');" class="inline px-4 py-2 bg-blue-800 text-white text-sm font-medium rounded-md w-1/4 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300">
                        Save Changes
                      </button>
                </div>
</div>
  )
}

export default NewLocation
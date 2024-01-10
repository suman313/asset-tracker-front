import React from 'react'

function NewSite() {
  return (
    <div id="newSite_modal" class=" hidden absolute top-0  left-72 w-6/12 border p-4 shadow-lg rounded-md bg-white dark:bg-slate-800 animSlideup ">
                                <h2 data-v-6fbed78c="" class="font-medium text-xl mr-auto mb-2">New Site</h2>
                                  <div  class="flex">
                                    <div class="basis-1/2 mr-2"> 
                                      <label for="">Name</label> <input type="text" placeholder="eg: Durbin" class="input w-full  border mt-2 flex-1 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm" wfd-id="id14" /> 
                                    </div>
                                    <div class="mt-2 basis-1/2"> 
                                      <label for="">Suite</label> <input type="text" placeholder="Suite" class="input w-full border mt-2 flex-1 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm" wfd-id="id14" /> 
                                    </div>
                                  </div>
                                  <div class="mt-2 basis-full">
                                    <label class="">Description</label><textarea rows="3" placeholder="eg: Somthing about asset that will help others to find." class="input w-full border mt-2 flex-1 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm" spellcheck="false"></textarea>
                                  </div>
                                  <div class="mt-2 basis-full">
                                      <label for="">Address</label> <br /> <input type="text" placeholder="eg: 6th Floor, Kolkata" class="input w-full border mt-2 flex-1 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm" wfd-id="id14" />    
                                  </div>
                                  <div  class="flex">
                                    <div class="mt-2 basis-1/2 mr-2"> 
                                      <label for="">State</label> <input type="text" placeholder="State" class="input w-full  border mt-2 flex-1 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm" wfd-id="id14" /> 
                                    </div>
                                    <div class="mt-2 basis-1/2"> 
                                      <label for="">City</label> <input type="text" placeholder="City" class="input w-full  border mt-2 flex-1 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm" wfd-id="id14" /> 
                                    </div>
                                  </div>
                                  <div  class="flex">
                                    <div class="mt-2 basis-1/2 mr-2"> 
                                      <label for="">Pin code</label> <input type="text" placeholder="Pin Code" class="input w-full border mt-2 flex-1 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm" wfd-id="id14" /> 
                                    </div>
                                    <div class="mt-2 basis-1/2"> 
                                      <label for="">Country</label> <input type="text" placeholder="Country" class="input w-full border mt-2 flex-1 border-slate-300 dark:bg-slate-900 font-medium rounded-md text-sm" wfd-id="id14" /> 
                                    </div>
                                  </div>
                                  <div class="text-right px-4 py-3 mt-3">
                                        <button id="ok-btn"  onclick="closeModal('newSite_modal');" class="inline px-4 py-2 bg-blue-200  text-black text-sm font-medium rounded-md w-1/4 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300">
                                          Cancel
                                        </button>
                                        <button id="ok-btn" onclick="closeModal('newSite_modal');" class="inline px-4 py-2 bg-blue-800 text-white text-sm font-medium rounded-md w-1/4 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300">
                                          Save Changes
                                        </button>
                                  </div>
                </div>
  )
}

export default NewSite
import React from 'react'

function AssetHistory() {
  return (
    <div id="asset-history" class="hidden ">
        <div class="flex ">
          <button onclick="showDiv('main-assets','asset-history');" href="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="w-6 h-6 mr-6 cursor-pointer feather feather-arrow-left"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          <p class="inline py-5 pl-5 text-xl font-medium text-slate-700 dark:text-slate-200">
            History
          </p>
        </div>
        <div class="flex">
          <table class=" table border-separate border-spacing-y-3  sm:mt-2 w-full  ">
            <thead>
              <tr class="">
                <th class="w-80 whitespace-no-wrap  px-5 py-1 font-medium">
                  BRAND &amp; MODEL
                </th>
                <th class="w-80 text-center whitespace-no-wrap px-5 py-1 font-medium">
                  TAG ID
                </th>
                <th class="w-80 text-center whitespace-no-wrap px-5 py-1 font-medium">
                  TASK
                </th>
                <th class="w-80 text-center whitespace-no-wrap px-5 py-1 font-medium">
                  TIME
                </th>
                <th class="w-96 text-center whitespace-no-wrap px-5 py-1 font-medium">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody class="hist_table relative">
              <tr class="intro-x zoom-in text-sm rounded-lg bg-white dark:bg-gray-900 shadow-sm hover:shadow-xl text-gray-600 dark:text-slate-100">
                <td class=" py-3 text-center rounded-l-lg">
                  <a href="" class="font-medium whitespace-no-wrap">
                    HAULOTTE
                  </a>
                  <div class="text-gray-600 text-xs whitespace-no-wrap">
                    {" "}
                    Compact 10 AE{" "}
                  </div>
                </td>
                <td class="text-center"> MSE019 </td>
                <td class="text-center">
                  <span class="py-1 px-2 rounded text-xs bg-teal-500 text-white cursor-pointer font-medium">
                    Added a photo to an asset
                  </span>
                </td>
                <td class="text-center"> 2023-03-03 </td>
                <td class="table-report__action w-56 rounded-r-lg border-l border-slate-100 ">
                  <div class="flex justify-center items-center">
                    <div class="flex items-center justify-center text-yellow-400 cursor-pointer mr-4">
                      <svg
                        class="stroke-yellow-400 py-1 w-4 h-4 mr-2 feather feather-external-link"
                        xmlns="http://www.w3.org/2000/svg"
                        width="21px"
                        height="21px"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke=""
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                      Visit
                    </div>
                  </div>
                </td>
              </tr>
              <tr class="intro-x zoom-in text-sm rounded-lg bg-white dark:bg-gray-900 shadow-sm hover:shadow-xl text-gray-600 dark:text-slate-100">
                <td class=" py-3 text-center rounded-l-lg">
                  <a href="" class="font-medium whitespace-no-wrap">
                    HAULOTTE
                  </a>
                  <div class="text-gray-600 text-xs whitespace-no-wrap">
                    {" "}
                    Compact 10 AE{" "}
                  </div>
                </td>
                <td class="text-center"> MSE019 </td>
                <td class="text-center">
                  <span class="py-1 px-2 rounded text-xs bg-teal-500 text-white cursor-pointer font-medium">
                    Added a photo to an asset
                  </span>
                </td>
                <td class="text-center"> 2023-03-03 </td>
                <td class="table-report__action w-56 rounded-r-lg border-l border-slate-100 ">
                  <div class="flex justify-center items-center">
                    <div class="flex items-center justify-center text-yellow-400 cursor-pointer mr-4">
                      <svg
                        class="stroke-yellow-400 py-1 w-4 h-4 mr-2 feather feather-external-link"
                        xmlns="http://www.w3.org/2000/svg"
                        width="21px"
                        height="21px"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke=""
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                      Visit
                    </div>
                  </div>
                </td>
              </tr>
              <tr class="intro-x zoom-in text-sm rounded-lg bg-white dark:bg-gray-900 shadow-sm hover:shadow-xl text-gray-600 dark:text-slate-100">
                <td class=" py-3 text-center rounded-l-lg">
                  <a href="" class="font-medium whitespace-no-wrap">
                    HAULOTTE
                  </a>
                  <div class="text-gray-600 text-xs whitespace-no-wrap">
                    {" "}
                    Compact 10 AE{" "}
                  </div>
                </td>
                <td class="text-center"> MSE019 </td>
                <td class="text-center">
                  <span class="py-1 px-2 rounded text-xs bg-teal-500 text-white cursor-pointer font-medium">
                    Added a photo to an asset
                  </span>
                </td>
                <td class="text-center"> 2023-03-03 </td>
                <td class="table-report__action w-56 rounded-r-lg border-l border-slate-100 ">
                  <div class="flex justify-center items-center">
                    <div class="flex items-center justify-center text-yellow-400 cursor-pointer mr-4">
                      <svg
                        class="stroke-yellow-400 py-1 w-4 h-4 mr-2 feather feather-external-link"
                        xmlns="http://www.w3.org/2000/svg"
                        width="21px"
                        height="21px"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke=""
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                      Visit
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  )
}

export default AssetHistory
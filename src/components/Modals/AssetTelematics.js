import React from 'react'

function AssetTelematics({setShowCurrentTab}) {
  return (
    <div id="asset-telematics" className="animfadein">
        <div class="flex ">
          <button
            onClick={() => setShowCurrentTab((2))}
            href=""
          >
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
            Asset Telematics
          </p>
          <div class="sm:flex items-center ml-auto mt-0 hidden text-sm">
            <span class="ml-auto flex items-center text-blue-800 cursor-pointer">
              <svg
                class="stroke-blue-800 w-4 h-4 mr-3 feather feather-refresh-ccw"
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 23 23"
                fill="none"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="1 4 1 10 7 10"></polyline>
                <polyline points="23 20 23 14 17 14"></polyline>
                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
              </svg>{" "}
              Reload Data
            </span>
          </div>
        </div>
        <div class="intro-y box px-5 pt-5 mt-5 bg-white dark:bg-slate-700 rounded-lg ">
          <div class="flex flex-col lg:flex-row border-b border-gray-200 dark:border-dark-5 pb-5 -mx-5">
            <div class="flex flex-1 px-5 items-center justify-center lg:justify-start">
              <div class="ml-5">
                <div class="w-24 sm:w-40 truncate sm:whitespace-normal font-medium text-lg sm:text-2xl">
                  {" "}
                  JLG{" "}
                </div>
                <div class="text-gray-600">ES 3249</div>
              </div>
            </div>
            <div class="flex text-sm mt-6 lg:mt-0 items-center lg:items-start flex-1 flex-col justify-center text-gray-600 dark:text-gray-300 px-5 border-l border-r border-gray-200 dark:border-dark-5 border-t lg:border-t-0 pt-5 lg:pt-0">
              <div class="truncate sm:whitespace-normal flex items-center">
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
                  class="w-4 h-4 mr-2 feather feather-tag"
                >
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                  <line x1="7" y1="7" x2="7.01" y2="7"></line>
                </svg>{" "}
                TAG ID:
                <span class="font-medium ml-2 dark:text-gray-500">MSE009</span>
              </div>
              <div class="truncate sm:whitespace-normal flex items-center mt-3">
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
                  class="w-4 h-4 mr-2 feather feather-award"
                >
                  <circle cx="12" cy="8" r="7"></circle>
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                </svg>{" "}
                Brand:
                <span class="font-medium ml-2 dark:text-gray-500">JLG</span>
              </div>
              <div class="truncate sm:whitespace-normal flex items-center mt-3">
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
                  class="w-4 h-4 mr-2 feather feather-star"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                Model:
                <span class="font-medium ml-2 dark:text-gray-500">ES 3249</span>
              </div>
            </div>
            <div class="flex text-sm mt-6 lg:mt-0 items-center lg:items-start flex-1 flex-col justify-center text-gray-600 dark:text-gray-300 px-5 border-l border-r border-gray-200 dark:border-dark-5 border-t lg:border-t-0 pt-5 lg:pt-0">
              <div class="truncate sm:whitespace-normal flex items-center">
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
                  class="w-4 h-4 mr-2 feather feather-map-pin"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>{" "}
                SITE:
                <span class="font-medium ml-2 dark:text-gray-500">
                  Poonamalle
                </span>
              </div>
              <div class="truncate sm:whitespace-normal flex items-center mt-3">
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
                  class="w-4 h-4 mr-2 feather feather-map"
                >
                  <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
                  <line x1="8" y1="2" x2="8" y2="18"></line>
                  <line x1="16" y1="6" x2="16" y2="22"></line>
                </svg>{" "}
                LOCATION:
                <span class="font-medium ml-2 dark:text-gray-500">
                  Pon Nagar, Parivakkam
                </span>
              </div>
              <div class="truncate sm:whitespace-normal flex items-center mt-3">
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
                  class="w-4 h-4 mr-2 feather feather-list"
                >
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>{" "}
                CATEGORY:
                <span class="font-medium ml-2 dark:text-gray-500">
                  SCISSOR LIFT
                </span>
              </div>
            </div>
            <div class="mt-6 lg:mt-0 flex-1 px-5 border-t lg:border-0 border-gray-200 dark:border-dark-5 pt-5 lg:pt-0 text-sm">
              <div class="font-medium text-center lg:text-left lg:mt-5"></div>
              <div class="truncate sm:whitespace-normal flex items-center mt-3">
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
                  class="w-4 h-4 mr-2 feather feather-user"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>{" "}
                ASSIGNED TO: - -{" "}
              </div>
              <div class="truncate sm:whitespace-normal flex items-center mt-3">
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
                  class="w-4 h-4 mr-2 feather feather-bar-chart-2"
                >
                  <line x1="18" y1="20" x2="18" y2="10"></line>
                  <line x1="12" y1="20" x2="12" y2="4"></line>
                  <line x1="6" y1="20" x2="6" y2="14"></line>
                </svg>{" "}
                STATUS:
                <span class="bg-lime-500 text-white rounded px-2 text-xs ml-4 py-1">
                  leased
                </span>
              </div>
              <div class="mt-4">
                <span class="bg-red-600 text-white rounded px-2 text-sm  py-1">
                  STOP
                </span>
                <span class="bg-green-500 text-white rounded px-2 text-sm  ml-4 py-1">
                  RESUME
                </span>
              </div>
            </div>
          </div>
          <div class="nav-tabs flex flex-col sm:flex-row justify-center lg:justify-start text-sm">
            <span
              onclick="changeAssetTDetails(event,'assetT-telematics')"
              class="asset-telematics-tab py-4 sm:mr-8 cursor-pointer assetDetailsActive"
            >
              Telematics
            </span>
            <span
              onclick="changeAssetTDetails(event,'assetT-usagevsactual')"
              class="asset-telematics-tab py-4 sm:mr-8 cursor-pointer"
            >
              Usage v/s Actual
            </span>
          </div>
        </div>

        <div id="assetT-telematics" class="assetT-tabs block mt-4 ">
          <div class="flex ">
            <div class="basis-4/12 mr-2">
              <div id="map" style={{width: '100%', height: '400px'}}></div>
            </div>
            <div class="basis-8/12 bg-white dark:bg-slate-700 rounded-lg">
              <div class="flex items-center px-5 py-5 sm:py-3 border-b border-gray-200 dark:border-dark-5">
                <h2 class="font-medium text-base mr-auto">Accelerometer</h2>
                <input
                  type="text"
                  id="datesa"
                  name="dates"
                  value="10/04/2023 - 10/04/2023"
                  class="rounded-lg border-slate-400 text-sm text-slate-700"
                />
                {/* <script>
                                $('#datesa').daterangepicker({
                                    "showDropdowns": true,
                                    ranges: {
                                        'Today': [moment(), moment()],
                                        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                                        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                                        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                                        'This Month': [moment().startOf('month'), moment().endOf('month')],
                                        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                                    },
                                    "alwaysShowCalendars": true,
                                },);
                              </script> */}
                <select
                  type="text"
                  class="ml-2 input border border-slate-400 rounded-lg text-sm text-slate-700 cursor-pointer"
                >
                  <option value="daily">Daily</option>
                  <option value="week">Weekly</option>
                  <option value="month">Monthly</option>
                  <option value="year">Yearly</option>
                </select>
              </div>
              <canvas
                class="rounded-xl"
                id="myChart2"
                style={{width:'100%', height: '400px'}}
              ></canvas>
            </div>
          </div>
          <div class="flex mt-4">
            <div class="basis-1/2  mr-2 bg-white dark:bg-slate-700 rounded-lg">
              <div class="flex items-center px-5 py-5 sm:py-3 border-b border-gray-200 dark:border-dark-5">
                <h2 class="font-medium text-base mr-auto">Gyroscope</h2>
                <input
                  type="text"
                  id="datesg"
                  name="dates"
                  value="10/04/2023 - 10/04/2023"
                  class="rounded-lg border-slate-400 text-sm text-slate-700"
                />
                {/* <script>
                                $('#datesg').daterangepicker({
                                    "showDropdowns": true,
                                    ranges: {
                                        'Today': [moment(), moment()],
                                        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                                        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                                        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                                        'This Month': [moment().startOf('month'), moment().endOf('month')],
                                        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                                    },
                                    "alwaysShowCalendars": true,
                                },);
                              </script> */}
                <select
                  type="text"
                  class="ml-2 input border border-slate-400 rounded-lg text-sm text-slate-700 cursor-pointer"
                >
                  <option value="daily">Daily</option>
                  <option value="week">Weekly</option>
                  <option value="month">Monthly</option>
                  <option value="year">Yearly</option>
                </select>
              </div>
              <canvas
                class="rounded-xl"
                id="myChart3"
                style={{width:'100%', height: '400px'}}
              ></canvas>
            </div>
            <div class="basis-1/2 bg-white  ml-2 dark:bg-slate-700 rounded-lg">
              <div class="flex items-center px-5 py-5 sm:py-3 border-b border-gray-200 dark:border-dark-5">
                <h2 class="font-medium text-base mr-auto">Temperature</h2>
                <input
                  type="text"
                  id="datest"
                  name="dates"
                  value="10/04/2023 - 10/04/2023"
                  class="rounded-lg border-slate-400 text-sm text-slate-700"
                />
                {/* <script>
                                $('#datest').daterangepicker({
                                    "showDropdowns": true,
                                    ranges: {
                                        'Today': [moment(), moment()],
                                        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                                        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                                        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                                        'This Month': [moment().startOf('month'), moment().endOf('month')],
                                        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                                    },
                                    "alwaysShowCalendars": true,
                                },);
                              </script> */}
                <select
                  type="text"
                  class="ml-2 input border border-slate-400 rounded-lg text-sm text-slate-700 cursor-pointer"
                >
                  <option value="daily">Daily</option>
                  <option value="week">Weekly</option>
                  <option value="month">Monthly</option>
                  <option value="year">Yearly</option>
                </select>
              </div>
              <canvas
                class="rounded-xl"
                id="myChart4"
                style={{width:'100%', height: '400px'}}
              ></canvas>
            </div>
          </div>
        </div>

        <div id="assetT-usagevsactual" class="assetT-tabs hidden mt-4">
          <div class="grid grid-cols-12 gap-6">
            <div class="intro-y box col-span-12 bg-white dark:bg-slate-700 rounded-lg">
              <div class="flex items-center px-5 py-5 sm:py-3 border-b border-gray-200 dark:border-dark-5">
                <h2 class="font-medium text-base mr-auto">Asset Documents</h2>
                <button class="button border rounded-lg py-2 px-2 font-medium text-sm text-right text-gray-800 dark:border-gray-400 dark:text-gray-300 hidden sm:flex">
                  <input
                    type="file"
                    accept="image/jpeg, image/png"
                    class="hidden"
                    wfd-id="id57"
                  />
                  +Add Documents
                </button>
              </div>
              <div class="p-5">
                <div class="intro-y grid gap-3 sm:gap-6 grid-cols-12"></div>
              </div>
            </div>
          </div>
        </div>

        <div id="assetD-maintenance" class="assetD-tabs mt-4 hidden">
          <div class="grid grid-cols-12 gap-6">
            <div class="intro-y box col-span-12 bg-white dark:bg-slate-700  rounded-lg">
              <div class="flex items-center px-5 py-5 sm:py-3 border-b border-gray-200 dark:border-dark-5">
                <h2 class="font-medium text-base mr-auto">Asset Maintenance</h2>
                <button class="button border rounded-lg py-2 px-2 font-medium text-sm text-right text-gray-800 dark:border-gray-400 dark:text-gray-300 hidden sm:flex">
                  <input
                    type="file"
                    accept="image/jpeg, image/png"
                    class="hidden"
                    wfd-id="id57"
                  />
                  +Add Maintenance
                </button>
              </div>
              <div class="p-5">
                <div class="intro-y grid gap-3 sm:gap-6 grid-cols-12"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default AssetTelematics
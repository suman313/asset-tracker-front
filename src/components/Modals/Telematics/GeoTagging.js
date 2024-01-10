import React from 'react'

function GeoTagging() {
  return (
    <div id="geo-tagging" class="teleDiv">
                    <div class="col-span-12 flex justify-end my-4">
                      <form class="intro-x search hidden sm:block">
                        <input type="text" placeholder="Search..." class="search__input input bg-gray-200 rounded-3xl border-none" />
                        <button type="submit" class="hidden"></button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" 
                              class="w-5 h-5 absolute top-0 right-0 bottom-0 mt-28 mr-7 feather feather-search search__icon dark:text-gray-300 cursor-pointer">
                        <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                      </form>
                    </div>
                    <div class="flex animSlideup relative">
                      <div class="basis-1/4 mr-1">
                        <input type="text" placeholder="Latitude" class="text-sm input w-full text-slate-400 dark:text-slate-100 bg-white dark:bg-slate-700 border-gray-300 dark:border-gray-600 rounded-md" />
                      </div>
                      <div class="basis-1/4 mx-1">
                        <input type="text" placeholder="Longitude" class="text-sm input w-full text-slate-400 dark:text-slate-100 bg-white dark:bg-slate-700 border-gray-300 dark:border-gray-600 rounded-md" />
                      </div>
                      <div class="basis-1/4 mx-1">
                        <select class="text-sm input w-full text-slate-400 dark:text-slate-100 bg-white dark:bg-slate-700 border-gray-300 dark:border-gray-600 rounded-md">
                          <option> Poonamalle </option>
                          <option> Rajiv Gandhi  Airport (L&amp;T Gate) </option>
                          <option> Amazon Circle (GMR) </option>
                          <option> Rajiv Gandhi International Airport (Basement) </option>
                        </select>
                      </div>
                      <div class="basis-1/4 ml-1">
                        <button class=" text-sm font-medium button w-full h-full  text-white flex items-center justify-center bg-blue-800 rounded-md">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 mr-2 feather feather-plus">
                            <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> Add Geo Tag 
                        </button>
                      </div>
                    </div>
                    <table  class="w-full mt-4">
                      <tbody class="">
                        <tr class="intro-x zoom-in text-sm rounded-lg bg-white dark:bg-gray-900 shadow-sm hover:shadow-xl text-gray-600 dark:text-slate-100">
                          <td class="w-max text-left py-3 rounded-l-lg px-5 ">
                            <a href="" class="font-medium whitespace-no-wrap">Poonamalle</a>
                            <div class="text-gray-400 text-xs whitespace-no-wrap"> Name </div>
                          </td>
                          <td class=" text-center py-3 px-10 ">
                            <a href="" class="font-medium whitespace-no-wrap">13.0633</a>
                            <div class="text-gray-400 text-xs whitespace-no-wrap"> Latitude </div>
                          </td>
                          <td class=" text-center py-3 px-10 ">
                            <a href="" class="font-medium whitespace-no-wrap">80.099</a>
                            <div class="text-gray-400 text-xs whitespace-no-wrap"> Longitude </div>
                          </td>
                          <td class=" text-center rounded-r-lg px-10">
                            <a href="" class="font-medium whitespace-no-wrap">50.00 m</a>
                            <div class="text-gray-400 text-xs whitespace-no-wrap"> Radius </div>
                          </td>
                          
                        </tr>
                      </tbody>
                    </table>
                      
                    
                  </div>
  )
}

export default GeoTagging
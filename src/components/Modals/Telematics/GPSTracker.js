import React from 'react'

function GPSTracker() {
  return (
    <div id="gps-tracker" class="teleDiv">
                      <div id="map" style={{width: '100%', height: '400px'}}></div>
                      <table class="table table-report sm:mt-2">
                        <thead>
                          <tr>
                            <th class="w-56 font-normal text-sm whitespace-no-wrap">BRAND &amp; MODEL</th>
                            <th class="w-56 font-normal text-sm text-center whitespace-no-wrap">ADDRESS</th>
                            <th class="w-56 font-normal text-sm text-center whitespace-no-wrap">CITY</th>
                            <th class="w-56 font-normal text-sm text-center whitespace-no-wrap">STATE</th>
                            <th class="w-56 font-normal text-sm text-center whitespace-no-wrap">COUNTRY</th>
                            <th class="w-56 font-normal text-sm text-center whitespace-no-wrap">USAGE HOURS</th>
                            <th class="w-56 font-normal text-sm text-center whitespace-no-wrap">STATUS</th>
                            <th class="w-56 font-normal text-sm text-center whitespace-no-wrap">ACTION</th>
                          </tr>
                        </thead>
                        <tbody></tbody>
                      </table> 
                  </div>
  )
}

export default GPSTracker
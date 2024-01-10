import React from 'react'

function UsageVsActual() {
  return (
    <div id="usage-actual" class="teleDiv">
                    <table class="table table-report sm:mt-2 h-72 w-full">
                      <thead>
                        <tr>
                          <th class="w-56 font-normal text-sm whitespace-no-wrap">ASSET</th>
                          <th class="w-56 font-normal text-sm text-center whitespace-no-wrap">ASSET NO</th>
                          <th class="w-56 font-normal text-sm text-center whitespace-no-wrap">STATUS</th>
                          <th class="w-60 font-normal text-sm text-center whitespace-no-wrap">TOTAL USAGE HOURS</th>
                          <th class="w-60 font-normal text-sm text-center whitespace-no-wrap">TOTAL ACTIVE HOURS</th>
                          <th class="w-60 font-normal text-sm text-center whitespace-no-wrap">TOTAL OVERTIME</th>
                        </tr>
                      </thead>
                      <tbody></tbody>
                    </table>
                  </div>
  )
}

export default UsageVsActual
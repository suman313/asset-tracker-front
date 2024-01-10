import React from "react";

function TagInOut() {
  return (
    // <!--Tag IN/OUT-->
    <div id="tagInOut" class="teleDiv">
      <table class="table table-report sm:mt-2 h-72 w-full">
        <thead>
          <tr>
            <th class="w-56 font-normal text-center whitespace-no-wrap">
              DEVICE ID
            </th>
            <th class="w-56 font-normal text-center whitespace-no-wrap">
              DEVICE NAME
            </th>
            <th class="w-56 font-normal text-center whitespace-no-wrap">
              OPERATOR NAME
            </th>
            <th class="w-60 font-normal text-center whitespace-no-wrap">
              TAG IN TIME
            </th>
            <th class="w-60 font-normal text-center whitespace-no-wrap">
              TAG OUT TIME
            </th>
            <th class="w-60 font-normal text-center whitespace-no-wrap">
              TOTAL USAGE HOURS
            </th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
}

export default TagInOut;

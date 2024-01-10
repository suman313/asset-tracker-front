import React from 'react'

function HistoryBtn() {
  return (
    <button
              onclick="showDiv('asset-historyBtn', 'main-assets');"
              className="button text-white bg-orange-500 py-2 px-2 rounded-md shadow-md mr-2 text-xs sm:text-sm cursor-pointer"
            >
              {" "}
              History{" "}
            </button>
  )
}

export default HistoryBtn
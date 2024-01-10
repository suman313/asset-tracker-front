import React, { useState } from 'react'
import MaintenanceTableInput from './MaintenanceTableInput'


function Removal({text, partArray, setPartArray, partsForInstallation}) {

    // const [tableNo, setTableNo] = useState(0);
    const objForRemoval = {'part_no':'',  'quantity': 0};

    

    const handleAdd = () => {
      // setTableNo((prev) => prev + 1)
      
      setPartArray([...partArray, objForRemoval ])
      
      console.log(partArray)
    }



  return (
    <div class="flex flex-col w-full h-full bg-white dark:bg-slate-900 rounded-lg mx-2 shadow-md hover:shadow-xl">
                        <div class="flex items-center p-5 border-b border-gray-200 dark:border-dark-5">
                          <h2 class="font-medium text-base mr-auto">Part Removal</h2>
                        </div>
                        <div class="p-5 text-sm">
                          <div class="flex flex-col">
                                <div  className={`grid grid-cols-2 gap-4`}>
                                  
                                    <div className='bg-gray-200 dark:bg-[#7a7ab1] p-2 text-center'>Part no.</div>
                                    {/* <div className='bg-gray-200 dark:bg-[#7a7ab1] p-2 text-center'>Part Description</div> */}
                                    <div className='bg-gray-200 dark:bg-[#7a7ab1] p-2 text-center'>Quantity</div>
                                {/* {Array.from({length: tableNo}, (_, index) => (
                                    
                                    <MaintenanceTableInput key={index} text={text} oneTupleDetails={partDetails[index]} setPartDetails={setPartDetails} partDetails={partDetails}/>
                                ) )} */}

                                {
                                  partArray.map((value, index ) => (
                                    <MaintenanceTableInput key={index} index={index} text={text} oneTupleDetails={value} partDetails={partArray[index]} setPartDetails={setPartArray} id={value?.id} partsForInstallation={partsForInstallation}/>
                                  ))
                                }
                            </div>
                            <button className='bg-[#4549b9] text-[1rem] text-white rounded-full ml-[42%] mr-[42%] px-6 py-1 mt-5' onClick={handleAdd}>+ Add</button>
                          </div>
                        </div>
                      </div>
  )
}

export default Removal
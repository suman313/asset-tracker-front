import React from 'react'

function ModalContent({onClose}) {
  return (
    <div className='absolute top-0 left-0 right-0 bottom-0 backdrop-blur-sm flex justify-center items-center'>
    <div className='relative flex flex-col justify-center items-center gap-5 border-2 bg-[#fff]  w-[30%] py-10 rounded-[17px]'>
        <span className='absolute top-0 right-0 p-3 cursor-pointer' onClick={onClose}>Close</span>
        <label for="rfid" className='font-medium'>Enter valid RFID no.</label>
        <input type='text' id="rfid" placeholder="rfid" className='text-center border-2 rounded-[17px]'   />
        <label for="device-hash" className='font-medium'>Enter Device hash</label>
        <input type='text' id="device-hash" placeholder="Device #" className='text-center border-2 rounded-[17px]' />
        <span className='bg-[#4b0ee4] rounded text-white font-semibold p-2'>Submit</span>
    </div>
    </div>
  )
}

export default ModalContent
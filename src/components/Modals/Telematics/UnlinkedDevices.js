import React from 'react'
import { createPortal } from 'react-dom'
import ModalContent from './ModalContent'
import { useState } from 'react'

function UnlinkedDevices() {
    const [showModal, setShowModal] = useState(false)
  return (
    <div className='flex justify-center items-center'>
    <table>
        <th>
            <td className='px-4'>Asset No.</td>
        </th>
        <tr>
            <td className='px-4'>5678</td>
            <td><button className='bg-[#5b26d6] text-white p-2 rounded' onClick={() => setShowModal(true)}>Link Device</button></td>
        </tr>
    </table>
    {showModal && createPortal(
        <ModalContent onClose={() => setShowModal(false) } />
    , document.body)}
    </div>
  )
}

export default UnlinkedDevices

import React from 'react'
import { FaCrown } from "react-icons/fa";

const Premiem = () => {
  return (
    <div className='max-w-max px-5 rounded-full h-[40px] flex flex-row items-center gap-3 border cursor-pointer'>
      <FaCrown size={20} />
      <h5 className='hidden xl:block'>Premium</h5>
    </div>
  )
}

export default Premiem
import React from 'react'
import { FaCrown } from "react-icons/fa";
import Icon from '../Icon';

const Premiem = () => {
  return (
    <div className='pro text-black max-w-max px-5 rounded-full h-[40px] flex flex-row items-center gap-3 border cursor-pointer'>
      <Icon icon={<FaCrown size={20} />} title="Upgrade Premium" />
      <h5 className='hidden xl:block font-bold'>Premium</h5>
    </div>
  )
}

export default Premiem
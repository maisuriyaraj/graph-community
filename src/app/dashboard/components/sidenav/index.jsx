import React from 'react';
import avatar from '../../../../../public/user.png';
import Image from 'next/image';


export default function SideNav() {
  return (
    <div className='w-64 bg-white fixed border border-solid border-r-[#e5e7eb] left-0 h-[100vh]' id='sideNav'>
      <div className='flex flex-col items-center justify-center border-b mt-24 p-8 cursor-pointer'>
        <div className='border image-section rounded-[50%] p-2'>
          <img src={"https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} className="rounded-[50%] object-cover" alt='avatar' width={100} />
          {/* <Image src={avatar} className="rounded-[50%] object-cover" alt='avatar' width={80} /> */}

        </div>
        <div className='text-center mt-1'>
          <p className='font-bold text-xl'>John Doe</p>
          <span className='text-sm font-semibold text-gray-600'>Co-Manager</span>
        </div>
      </div>
    </div>
  )
}

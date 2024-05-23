"use client"
import { logOutUser } from '@/lib/helperFunctions'
import React from 'react'

export default function Dashboard() {
  return (
    <div>
      Welcome To Graph Community <br />
      <button className='btn bg-green-600 text-white rounded py-2 px-5' onClick={logOutUser}>Log out</button>
    </div>
  )
}

"use client";
import { getRequest } from '@/lib/api.service';
import Cookies from 'js-cookie';
import { useEffect, useRef, useState } from 'react';
import running from '../../../public/running.svg';
import verification from '../../../public/verification.svg';

import Image from 'next/image';
import Link from 'next/link';

export default function Dashboard() {
  const [loggedInUserId, setUserId] = useState(null);
  const [loggedUser, setUser] = useState(null);
  /*
    Ref for Initial Mount: The isInitialMount ref is used to ensure that the effect runs only once during the initial mount.
  */
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      getUserData();
    }
  }, []);

  function getUserData() {
    const userData = JSON.parse(Cookies.get('userId'));
    const BearerToken = JSON.parse(Cookies.get('AuthToken'));
    const AuthToken = BearerToken.split(' ')[1];
    getRequest(`http://localhost:3000/api/user/${userData}`, { 'Authorization': AuthToken }).then((response) => {
      setUser(response.data.data);
    }).catch((error) => {
      console.log(error);
    })
  }

  return (
    <div className='h-[100vh] w-full px-5' id='dashboard'>
      <div className='flex gap-2'>
        <div className='w-1/2 activation-card flex justify-between items-center h-auto shadow border p-6'>
          <div className='text-white'>
            <h2 className='text-white title-card'>Email Verification</h2>
            <p>Please Complete Your Email Verification.</p>
            <Link href='/dashboard/profile' className='text-white mt-3 underline font-bold'>Verify Now</Link>
          </div>
          <div className='pt-2'>
            <Image src={running} alt='running' width={180} />
          </div>
        </div>
        <div className='w-1/2 activation-card2 flex justify-between items-center h-auto shadow border p-6'>
        <div className='text-black'>
            <h2 className='text-green-600 title-card'>Phone Verification</h2>
            <p>Please Complete Your Mobile Number Verification.</p>
            <Link href='/dashboard/profile' className='text-black mt-3 underline font-bold'>Verify Now</Link>
          </div>
          <div className='pt-2'>
            <Image src={verification} alt='running' width={180} />
          </div>
        </div>
      </div>
    </div>
  )
}

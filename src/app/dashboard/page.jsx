"use client";
import { getRequest } from '@/lib/api.service';
import Cookies from 'js-cookie';
import { useEffect, useRef, useState } from 'react';
import running from '../../../public/running.svg';
import verification from '../../../public/verification.svg';

import Image from 'next/image';
import Link from 'next/link';
import GraphModal from '../components/modal';
import GraphFieldTextModal from '../components/Fieldmodal';
import Head from 'next/head';

export default function Dashboard() {
  const [loggedInUserId, setUserId] = useState(null);
  const [loggedUser, setUser] = useState(null);
  const [openModal, setModal] = useState(false);
  const [modalTitle, setModalTitle] = useState();
  const [textField, setTextField] = useState();
  const [fieldType, setFieldType] = useState();
  const [fieldValue, setFieldValue] = useState();
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

  function openVerificationModal(modalName) {
    if (modalName == "Email") {
      setFieldType("email");
      setModalTitle("Email Verification");
      setTextField("Email Address");
      setModal(true);
    } else {
      setFieldType("text");
      setModalTitle("Mobile Verification");
      setTextField("Mobile Number");
      setModal(true);
    }
  }

  const closeModal = () => {
    setModal(false);
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted", event?.target[0].value);
    // setModal(false);
    setFieldValue(event?.target[0].value, () => {
      console.log(fieldValue);
    });
  }

  return (
    <main className='h-[100vh] w-full px-5' id='dashboard'>
      <Head>
        <title>Good Morning {loggedUser?.data?.userName}</title>
      </Head>
      <div className='flex gap-2'>
        <div className='w-1/2 activation-card flex justify-between items-center h-auto shadow border p-6'>
          <div className='text-white'>
            <h2 className='text-white title-card'>Email Verification</h2>
            <p>Please Complete Your Email Verification.</p>
            <a type='button' onClick={() => openVerificationModal("Email")} className='text-white cursor-pointer mt-3 underline font-bold'>Verify Now</a>
          </div>
          <div className='pt-2'>
            <Image src={running} alt='running' width={180} />
          </div>
        </div>
        <div className='w-1/2 activation-card2 flex justify-between items-center h-auto shadow border p-6'>
          <div className='text-black'>
            <h2 className='text-green-600 title-card'>Phone Verification</h2>
            <p>Please Complete Your Mobile Number Verification.</p>
            <a type='button' onClick={() => openVerificationModal("Phone")} className='text-black cursor-pointer mt-3 underline font-bold'>Verify Now</a>
          </div>
          <div className='pt-2'>
            <Image src={verification} alt='running' width={180} />
          </div>
        </div>
      </div>
      {/* {openModal && <div>
          <GraphModal  closeModal={closeModal} />
      </div>} */}
      {openModal && <div>
        <GraphFieldTextModal closeModal={closeModal} modalTitle={modalTitle} textField={textField} fieldType={fieldType} handleFormSubmit={handleFormSubmit} />
      </div>}
    </main>
  )
}

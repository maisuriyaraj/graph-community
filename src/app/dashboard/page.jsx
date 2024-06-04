"use client";
import { getRequest, postRequest, putRequest } from '@/lib/api.service';
import Cookies from 'js-cookie';
import { useEffect, useRef, useState } from 'react';
import running from '../../../public/running.svg';
import verification from '../../../public/verification.svg';
import Image from 'next/image';
import Link from 'next/link';
import GraphModal from '../components/modal';
import GraphFieldTextModal from '../components/Fieldmodal';
import Head from 'next/head';
import { EmailVerificationMail } from '@/lib/mailService';
import { ToastContainer, toast } from 'react-toastify';

export default function Dashboard() {
  const [loggedInUserId, setUserId] = useState(null);
  const [loggedUser, setUser] = useState(null);
  const [openModal, setModal] = useState(false);
  const [modalTitle, setModalTitle] = useState();
  const [modalLoader, setModalLoader] = useState(false);
  const [modalType, setModalType] = useState();
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
      setModalType('Email');
      setModalTitle("Email Verification");
      setTextField("Email Address");
      setModal(true);
    } else {
      setFieldType("text");
      setModalType('Phone');
      setModalTitle("Mobile Verification");
      setTextField("Mobile Number");
      setModal(true);
    }
  }

  const closeModal = () => {
    setModal(false);
  }

  const handleFormSubmit = (event, type) => {

    event.preventDefault();
    console.log("Submitted", event?.target[0].value);
    // setModal(false);
    if (type == 'Email') {
      const userId = JSON.parse(Cookies.get('userId'));
      const token = JSON.parse(Cookies.get('AuthToken'));
      const AuthToken = token.split(' ')[1];

      console.log("Email Sent Successfully");
      let link = `http://localhost:3000/emailVerification/email/${userId}/${AuthToken}`
      let mailBody = EmailVerificationMail(link);

      const payload = { userId: userId, email: event?.target[0].value }
      putRequest('http://localhost:3000/api/auth/verification', payload, { 'Authorization': AuthToken })
        .then((res) => {
          if(res.data.status){
            console.log(res);
            return true;
          }else{
            setModal(false);
            toast.error(res.data.message);
            return false;
          }
        }).then((res) => {
          if(res){
            const payload = {
              email: event?.target[0].value,
              mailBody: mailBody
            }
            return postRequest('http://localhost:3000/api/mail', payload, { 'Authorization': AuthToken })
          }
        }).catch((error) => {
          console.log(error);
        });
    } else {
      console.log("SMS Sent Successfully");
    }
    setModalLoader(true);
    setFieldValue(event?.target[0].value);
  }

  return (
    <main className='h-[100vh] w-full px-5' id='dashboard'>
      <Head>
        <title>Good Morning {loggedUser?.data?.userName}</title>
      </Head>
      <div className='flex gap-2'>
      <ToastContainer />

       {!loggedUser?.isEmailVerified &&  <div className='w-1/2 activation-card flex justify-between items-center h-auto shadow border p-6'>
          <div className='text-white'>
            <h2 className='text-white title-card'>Email Verification</h2>
            <p>Please Complete Your Email Verification.</p>
            <a type='button' onClick={() => openVerificationModal("Email")} className='text-white cursor-pointer mt-3 underline font-bold'>Verify Now</a>
          </div>
          <div className='pt-2'>
            <Image src={running} alt='running' width={180} />
          </div>
        </div>}
        {!loggedUser?.isMobileVerified && <div className='w-1/2 activation-card2 flex justify-between items-center h-auto shadow border p-6'>
          <div className='text-black'>
            <h2 className='text-green-600 title-card'>Phone Verification</h2>
            <p>Please Complete Your Mobile Number Verification.</p>
            <a type='button' onClick={() => openVerificationModal("Phone")} className='text-black cursor-pointer mt-3 underline font-bold'>Verify Now</a>
          </div>
          <div className='pt-2'>
            <Image src={verification} alt='running' width={180} />
          </div>
        </div>}
      </div>
      {/* {openModal && <div>
          <GraphModal  closeModal={closeModal} />
      </div>} */}
      {openModal && <div>
        <GraphFieldTextModal closeModal={closeModal} loader={modalLoader} modalTitle={modalTitle} textField={textField} fieldType={fieldType} modalType={modalType} handleFormSubmit={handleFormSubmit} />
      </div>}
    </main>
  )
}

"use client";
import { getRequest } from '@/lib/api.service';
import Cookies from 'js-cookie';
import { useEffect, useRef, useState } from 'react';

export default function Dashboard() {
  const [loggedInUserId,setUserId] = useState(null);
  const [loggedUser ,setUser] = useState(null);
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


  useEffect(()=>{
    console.log("><><><><><><><><><><><",loggedUser);
  },[loggedUser]);

  function getUserData(){
    const userData = JSON.parse(Cookies.get('userId'));
    getRequest(`http://localhost:3000/api/user/${userData}`).then((response) => {
      setUser(response.data.data);
     
    }).catch((error) => {
      console.log(error);
    })
  }
  
  return (
    <div className='h-[100vh] w-full'>
      Welcome To Graph Community <br />
    </div>
  )
}

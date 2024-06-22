"use client";
import Image from "next/image";
import loaderGif from '../../../public/Infinity.gif';
import logo from '../../../public/logo-2.png';
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { getRequest } from "@/lib/api.service";
/**
 * 
 * @description In Below Function I get Search Params for E.x "http://localhost:3000/accounts?code=4/0ATx3LY4hm1wdOUXwjfSXcz8gzKiPW0tgm72d5amMjkCwruZ-2luwKpZ5RMZGGDCnltAhPQ&scope=https://www.googleapis.com/auth/calendar"
 * from Above Url I get the value of Query Params 
 * 
 */
export default function Accounts() {

    const searchParams = useSearchParams();

    const code = searchParams.get('code');

    useEffect(()=>{
        getRequest(`http://localhost:3000/api/google/v1?code=${code}`).then((response)=>{
            console.log(response);
        }).catch((error)=>{
            console.log(error);
        })
    },[]);

     
  return (
    <div className="flex justify-center items-center w-100">
        <div className="flex flex-col items-center">
            <Image src={logo} alt="App Logo" width={550} />
            <Image src={loaderGif} alt="Loading..."  />
            <span className="text-xl font-semibold">Please Wait , While We are redirecting you !</span>
        </div>
    </div>
  )
}


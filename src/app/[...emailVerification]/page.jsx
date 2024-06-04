
// async function VerifyUser(userId,Token,verification){
//     fetch({method:'POST',url:"http://localhost:3000/api/auth/verification",body:{verification:verification,userId:userId,token:Token}, headers: {'Authorization': `Bearer ${Token}`}}).then((response)=>{
//     if(response.ok){
//     }
//     }).catch((error)=>{
//       console.log(error)
//     })
// }

"use client";
import { postRequest } from "@/lib/api.service";
import { useEffect } from "react";

export default function EmailVerification({params}) {
    // VerifyUser(params.emailVerification[2],params.emailVerification[3],params.emailVerification[1]);
    useEffect(()=>{
      const payload = {
        verification:params.emailVerification[1],
        userId:params.emailVerification[2],
      }
  
      let token = params.emailVerification[3]
      postRequest("http://localhost:3000/api/auth/verification",payload,{'Authorization':token}).then(()=>{
  
      }).catch((error)=>{
        console.log(error)
      })
    },[]);
  return (
    <div>page</div>
  )
}

import { sendEmailService } from "@/lib/helperFunctions";
import { NextResponse } from "next/server";

export async function POST(request){
    const payload = await request.json();
    try {
        if(payload?.email){
            sendEmailService(payload.email,payload.mailBody);
            return NextResponse.json({status:true,message:"Mail Sent Successfully !"});
        }else{
            return NextResponse.json({status:false,message:"Please Provide Email Address !!"})
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({status:false,message:"Unable to provide service !"});
    }
}
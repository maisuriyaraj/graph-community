import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export async function POST(request){
    const payload = await request.json();
    if(payload.email){
        
    }else{
        return NextResponse.json({status:false,message:"Please Provide Email Addredd !!"})
    }
}
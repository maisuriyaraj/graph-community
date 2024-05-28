import { AuthTableModel, userModel } from "@/lib/models";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

const secreate_key = process.env.SECREATE_KEY

export async function GET(request, content) {
    try {
        if (content.params.userId == null || content.params.userId == undefined) {
            return NextResponse.json({ status: false, message: "Please Provide userId." });
        }
        let userAuthToken = await AuthTableModel.findOne({ user_id: content.params.userId });

        if (userAuthToken) {
            try {
                jwt.verify(userAuthToken.access_token, secreate_key);
                console.log("Token Verified");
                let user = await userModel.findOne({ _id: content.params.userId }).select({ password: 0 });
                if (user) {
                    return NextResponse.json({ status: true, data: user, message: "Data Fetched Successfully" },{status:201});
                }
            } catch (error) {
                console.log(error)
                return NextResponse.json({ status: false, message: "Token is Expired !" });

            }
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ status: false, message: "Unable to Provide Services!" });
    }
}
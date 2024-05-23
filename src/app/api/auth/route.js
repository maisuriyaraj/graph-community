import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { AuthTableModel, userModel } from "@/lib/models";

const secreate_key = "akfnkdfkdjf-+-+--+-+skdfbs d sxcdvhjkdfghjkdfghjkdfghjklfghjkl852852741063!@#$%!@#$%^@#$%^@#$%^&%^&*(^&*()*()&*)";


export async function POST(request) {
    try {
        const payload = await request.json();
        console.log(payload);

        if (!payload.email) {
            return NextResponse.json({ status: false, message: "Please Provide Email Address !!" });
        }

        let user = await userModel.findOne({ email: payload.email });
        if (user) {
            return NextResponse.json({ status: false, message: 'User has already registered !'});
        } else {
            // User Sign Up
            let userBody = { email: payload.email };

            if (payload?.password) {
                const salt = await bcrypt.genSalt(10);
                userBody.password = await bcrypt.hash(payload.password, salt);
            }
            if (payload?.userName) {
                userBody.userName = payload.userName;
            }
            if (payload?.googleAccount) {
                userBody.googleAccount = payload.googleAccount;
            }
            if (payload?.githubAccount) {
                userBody.githubAccount = payload.githubAccount;
            }

            const newUser = new userModel(userBody);
            const result = await newUser.save();

            const newToken = jwt.sign({ email: payload.email }, secreate_key, { expiresIn: '7d' });

            const authTableBody = {
                user_id: result._id,
                access_token: newToken,
                ...(payload.device_token && { device_token: payload.device_token }),
                ...(payload.fcm_token && { fcm_token: payload.fcm_token })
            };

            const newAuthRecord = new AuthTableModel(authTableBody);
            await newAuthRecord.save();

            return NextResponse.json({ status: true, message: "User Registered Successfully!", token: newToken });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ status: false, message: "Unable to Provide Services!" });
    }
}

export async function PUT(request) {
    try {
        const payload = await request.json();
        console.log(payload);

        if (!payload.email) {
            return NextResponse.json({ status: false, message: "Please Provide Email Address !!" });
        }

        let user = await userModel.findOne({ email: payload.email });
        if (user) {
            // User Log In
            if (payload.password) {
                let isRight = await bcrypt.compare(payload.password, user?.password);
                console.log(isRight)
                if (!isRight) {
                    return NextResponse.json({ status: false, message: "Password is not correct !", code: 501 })
                }
            }
            let tokenData = await AuthTableModel.findOne({ user_id: user._id });
            let token = tokenData?.access_token;

            try {
                jwt.verify(token, secreate_key);
                console.log("TOKEN VERIFIED !!")
                return NextResponse.json({ status: true, message: 'User Logged In Successfully', token });
            } catch (err) {
                // Token expired or invalid
                let newToken = jwt.sign({ email: payload.email }, secreate_key, { expiresIn: '7d' });

                const updateData = { access_token: newToken };
                if (payload?.device_token) {
                    updateData.device_token = payload.device_token;
                }

                await AuthTableModel.updateOne({ user_id: user._id }, { $set: updateData });
                console.log("TOKEN EXPIRED AND NEW GENERATED !!")
                return NextResponse.json({ status: true, message: 'User Logged In Successfully', token: newToken });
            }
        }else{
            return NextResponse.json({ status: false, message: "User Does Not Exists !!" });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ status: false, message: "Unable to Provide Services!" });
    }
}
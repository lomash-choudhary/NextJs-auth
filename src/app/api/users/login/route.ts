import { connect } from "@/dbConfig/dbConfig";
import UserModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

connect()

export async function POST(req:NextRequest){
    try {
        const reqBody = await req.json();
        const {username, password} = reqBody;

        const isUserExsists = await UserModel.findOne({
            username:username
        })

        if(!isUserExsists){
            return NextResponse.json({message:"user with this username does not exists"},{status:400})
        }

        const comparedPassword = await bcryptjs.compare(password, isUserExsists.password)

        if(!comparedPassword){
            return NextResponse.json({message:"Incorrect Password"},{status:400})
        }

        const tokenPayLoad = {
            id: isUserExsists._id
        }

        const token = await jwt.sign(tokenPayLoad, process.env.USER_AUTH_TOKEN!, {expiresIn:'1h'})


        const response = NextResponse.json({
            message: "Logged In successfully"
        })

        response.cookies.set('token', token, {
            httpOnly:true
        })

        return response

    } catch (error:any) {
        return NextResponse.json({error: error.message},{status:500})
    }
}
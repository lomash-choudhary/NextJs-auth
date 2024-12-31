import UserModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig"
connect()
export async function POST(req: NextRequest){
    try {   
        const reqBody = await req.json()
        const {token} = reqBody

        const isUserVerified = await UserModel.findOne({
            verifyToken:token,
            verifyTokenExpiry:{$gt: Date.now()}
        })

        console.log(isUserVerified)

        if(!isUserVerified){
            return NextResponse.json({error: 'Invalid Token Received'}, {status:400})
        }

        isUserVerified.isVerified = true
        isUserVerified.verifyToken = undefined
        isUserVerified.verifyTokenExpiry = undefined

        await isUserVerified.save() //saving the changes in the database

        return NextResponse.json({message: 'Verification Completed'},{status:200})

    } catch (error: any) {
        return NextResponse.json({error: error.message},{status: 500})
    }
}
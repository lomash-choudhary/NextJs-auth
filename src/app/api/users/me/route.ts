import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import {getTokenData} from "@/helpers/getTokenData"
import UserModel from "@/models/userModel";
connect()

export async function GET(req:NextRequest){
    try{
        const userId = await getTokenData(req);
        const user = await UserModel.findOne({
            _id: userId
        },{
            _id:0,
            password:0,
            isAdmin:0,
            __v:0
        })
        if(!user){
            return NextResponse.json({message:"User does not exists in the data base"})
        }
        return NextResponse.json(user)

    }catch(err:any){
        return NextResponse.json({error: err.message},{status:500})
    }
}
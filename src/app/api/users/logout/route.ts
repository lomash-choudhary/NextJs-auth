import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";

connect()

export async function GET(req:NextRequest){
    try {
        const response = NextResponse.json({
            message:"Logged Out successfully"
        })

        response.cookies.set("token","",{
            httpOnly:true,
            expires: new Date(0)
        })

        return response
        
    } catch (error:any) {
        return NextResponse.json({error: error.message},{status:500})
    }
}
import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

export const getTokenData = (request:NextRequest) => {
    try{
        const getToken:any = request.cookies.get("token")?.value

        const decodedUser:any = jwt.verify(getToken, process.env.USER_AUTH_TOKEN!)

        return decodedUser.id

    }catch(err:any){
        return NextResponse.json({error: err.message},{status:500})
    }
}
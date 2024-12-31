import { connect } from '@/dbConfig/dbConfig'
import { NextResponse, NextRequest } from 'next/server'
import  UserModel from '@/models/userModel'
import { z } from 'zod'
import bcryptjs from 'bcryptjs'
import { sendEmail } from '@/helpers/mailer'


connect()

export async function POST(request:NextRequest){
    try{
        const reqBody = await request.json();
        const {username, password, email} = reqBody;
        const validatedBody = z.object({
            username:z
            .string()
            .min(3,"Please Enter a valid username")
            .max(20,'Please enter a valid username'),
            password:z
            .string()
            .min(3,"Please Enter a valid username")
            .max(20,'Please enter a valid username')
            .regex(/[A-Z]/,'Please enter a password that contain atleast one uppercase character')
            .regex(/[a-z]/,'Please Enter a password that contain atleast one lowercase character')
            .regex(/[0-9]/,'Please enter a password that contain atleast one numeric character')
            .regex(/[\W_]/,'Please enter a password that contain atleast one special character')
        })

        const parsedBody = validatedBody.safeParse(reqBody)

        if(!parsedBody.success){
            console.log(parsedBody.error.errors.map((item) => {
                return NextResponse.json(item.message)
            }))
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const userCreated = await UserModel.create({
            username,
            email,
            password: hashedPassword
        })
        if(!userCreated){
            return NextResponse.json({message: 'Unable to create user in the database'},{status:500})
        }

        // send verification email

        await sendEmail({emailId:email, emailType:"Verify", userId:userCreated._id})

        return NextResponse.json({message:"user created successfully in the database"},{status:200})

        
    }catch(err:any){
        // console.log(err)
        return NextResponse.json({error: err.message},{status:400})
    }
}
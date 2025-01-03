'use client'
import { useEffect, useState } from "react"
import axios from "axios"
import { toast, Toaster } from "react-hot-toast"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function SignUpPage(){
    const router = useRouter()
    const [userDetails, setUserDetails] = useState({
        username:"",
        password:"",
        email:""
    })
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)
    const [loading, setLoading] = useState(false);
    const signUp = async () => {
        try {
            setLoading(true);
            const toastId = toast.loading("Processing Your request...")
            const response = await axios.post("/api/users/signup", userDetails)
            setLoading(false)
            toast.dismiss(toastId)
            toast.success(response.data.message)
            router.push("/login")
        } catch (error:any) {
            console.log("Signup failed");
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if(userDetails.email.length > 0 && userDetails.password.length > 0 && userDetails.username.length > 0){
            setIsButtonDisabled(false)
        }
        else{
            setIsButtonDisabled(true);
        }
    },[userDetails])

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-4">
            <Toaster /> 
            <h1>Sign Up</h1>
            <label htmlFor="username">Username</label>
            <input
            className="rounded-lg px-4 py-2 text-black"
                type="text"
                id="username"
                value={userDetails.username}
                onChange={(e) => setUserDetails({...userDetails, username: e.target.value})}
                placeholder="Enter your username"
            ></input>
            <label>Password</label>
            <input
                className="rounded-lg px-4 py-2 text-black"
                placeholder="enter the password"
                type="password"
                value={userDetails.password}
                onChange={(e) => setUserDetails({...userDetails, password:e.target.value})}
            ></input>
            <label htmlFor="email">Email</label>
            <input 
            className="rounded-lg px-4 py-2 text-black"
            type="text"
            value={userDetails.email}
            onChange={(e) => setUserDetails({...userDetails, email:e.target.value})}
            placeholder="Enter your email"
            ></input>
            <button
                className="p-2 border-grey-300 border rounded-lg mb-4 focus:outline-none hover:border-gray-600"
                disabled={isButtonDisabled ? true:false }
                onClick={signUp}
            >
                {isButtonDisabled ? "Please Enter the details" : "Sign up"}
            </button>
            <Link href={'/login'}>Visit Login Page</Link>
        </div>
    )
}
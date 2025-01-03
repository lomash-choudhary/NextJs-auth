'use client'
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react"

export default function VerifyEmail(){
    const [token, setToken] = useState("");
    const [isVerified, setIsVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post(`/api/users/verifyemail`,{ token })
            setIsVerified(true);
        } catch (error:any) {
            setError(true)
            console.log(error.response.data.error)
        }
    }

    useEffect(() => {
        setError(false)
        setToken(window.location.search.split("=")[1] || "")
    },[])

    useEffect(() => {
        setError(false)
        if(token.length > 0){
            verifyUserEmail()
        }
    },[token])

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
            <h1>Verify Email</h1>
            <h2 className="p-2 bg-orange-800">{token ? token: "no token"}</h2>
            {isVerified && (
                <div>
                    <h2>Verified</h2>
                    <Link href={"/login"}>Go To Login Page</Link>
                </div>
            )}
            {error && (
                <div>
                    <h2>Error</h2>
                </div>
            )}
        </div>
    )
}

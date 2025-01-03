'use client'
import axios, { toFormData } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast";

export default function Profile(){
    const router = useRouter()
    const [data, setData] = useState({
        email:"",
        username:"",
        isVerified:"",
        id:""
    })
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const getUserDetails = async () => {
        const toastId = toast.loading('Processing your request');
        try {
            setLoading(true);
            const response = await axios.get("/api/users/me");
            setLoading(false)
            toast.success("Fetched Data Successfully",{id:toastId});
            setData({
                email:response.data.email,
                username: response.data.username,
                isVerified: response.data.isVerified,
                id:response.data._id
            })
        } catch (error:any) {
            setError(error.message)
            // toast.dismiss(toastId)
            toast.error(error.message,{id:toastId});
        }
    }

    const logout = async () => {
        const toastId = toast.loading("Processing Your Request");
        try {   
            setLoading(true);
            await axios.get('api/users/logout') 
            toast.success("Logged Out Successfully",{id:toastId})
            setLoading(false)
            router.push("/login")
        } catch (error:any) {
            setError(error.message)
            toast.error(error.message,{id: toastId})
        }
    }

    return(
        <div className="flex flex-col">
            <div>
            {data ? <Link href={`/profile/${data.id}`}>CLICK ME :- {data.id}</Link>:"No Data Present"}
            <div>
                {data ? <div>Email :- {data.email}, Username :- {data.username} Verifed By Email :- {data.isVerified ? "Yes":"No"}</div>:"No Data Present"}
            </div>
            </div>
            <button onClick={getUserDetails} disabled={loading ? true:false}>Get data</button>
            <button onClick={logout} disabled={loading ? true:false}>Logout</button>
        </div>
    )
}
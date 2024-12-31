import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, "Please Enter Username To Continue"],
        unique:[true, "Please Enter A Unique Username To Continue"]
    },
    email:{
        type:String,
        required:[true, "Please Enter Email Address To Continue"],
        unique:[true,"Please Enter A Unique Email Address"]
    },
    password:{
        type:String,
        required:[true, "Please Enter a Password To Continue"]
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken:String,
    verifyTokenExpiry: Date
})


const UserModel = mongoose.models.users || mongoose.model('users', userSchema)

export default UserModel
import UserModel from "@/models/userModel";
import { ObjectId } from "mongoose";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

interface sendEmailInterface {
  emailId: string;
  emailType: string;
  userId: ObjectId;
}

export const sendEmail = async ({
  emailId,
  emailType,
  userId,
}: sendEmailInterface) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    const verifyEmailHTML = `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here/<a> to Verify your email or copy and paste the link below in your browser.
            <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`;
    const resetPasswordEmailHTML = `<p>Click <a href="${process.env.DOMAIN}/resetPassword?token=${hashedToken}">here/<a> to Verify your email or copy and paste the link below in your browser.
            <br> ${process.env.DOMAIN}/resetpassword?token=${hashedToken}
            </p>`;
    if (emailType === "Verify") {
      await UserModel.findOneAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "Forgot") {
      await UserModel.findOneAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 36000000,
      });
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.CREATE_TRANSPORT_USER_KEY,
        pass: process.env.CREATE_TRANSPORT_PASS,
      },
    });

    const mailOptions = {
      from: "lomashchoudhary9812@gmail.com",
      to: emailId,
      subject:
        emailType === "Verify"
          ? "Verify Your email address"
          : "Reset your password",
      html: emailType === "Verify" ? verifyEmailHTML : resetPasswordEmailHTML,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    console.log("Message sent: %s", mailResponse.messageId);
  } catch (err) {
    console.log(err);
  }
};

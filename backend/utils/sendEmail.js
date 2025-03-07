import nodemailer from "nodemailer";
import serverConfig from "../config/serverConfig.js";

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: true,
    auth: {
        user: "abdulmoeed455@gmail.com",
        pass: "ktawmfvvhhkfqjks",
    }
});

const sendEmail = async (data) => {
    try {
        const response = await transporter.sendMail({
            from: serverConfig.gmail_user_mail,
            ...data
        });

        return response;
    } catch (error) {
        throw error;
    }
};

export { sendEmail };
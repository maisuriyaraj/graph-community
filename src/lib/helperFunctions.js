import Cookies from "js-cookie";
import nodemailer from 'nodemailer';
export function logOutUser(){
    localStorage.clear();
    Cookies.remove('AuthToken');
    window.location.reload();
}

export function sendEmailService(email,mailBody){
    nodemailer.createTestAccount((err, account) => {
        if (err) {
            console.error('Failed to create a testing account. ' + err.message);
            return process.exit(1);
        }

        // Create a SMTP transporter object
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'rajmaisuria111@gmail.com',
                pass: 'pmks qvya coug ekih'
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // Message object
        let message = {
            from: `Graph Community <graphcommunity@gmail.com>`,
            to: `Recipient <${email}>`,
            subject: 'Please upload your Documents',
            // html: "<h1>Welcome to Graph Community</h1>" || mailBody
            html: mailBody
        };
        transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log('Error occurred. ' + err.message);
                return process.exit(1);
            }
            emailURL = nodemailer.getTestMessageUrl(info);
            // linkUrl = nodemailer.getTestMessageUrl(info);
            // res.send({ status: true, message: "Email sent Successfully", url: nodemailer.getTestMessageUrl(info) });
        });
    });
}
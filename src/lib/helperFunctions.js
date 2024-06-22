import nodemailer from 'nodemailer';
import twilio from 'twilio';


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
            subject: 'Email Verification ',
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

export function sendSMSService(mobile,smsBody){
    let accountSid = process.env.TWILIOSID ;
    let authToken =process.env.TWILIOCLIENT;
    const twilioClient = new twilio(accountSid,authToken);

    twilioClient.messages.create({
        to: mobile,
        messagingServiceSid:"MGcaf703405c93b25d9dddf43571e1960",
        body: smsBody,
    }).then((response)=>{
        return true;
    }).catch((error)=>{
        console.log("<><><><><<><>><>",error);
    })
}

export function generateUniqueUsername(baseName = 'user') {
    const baseLength = `${baseName}._`.length; // Length of 'user._'
    const randomNumbersLength = 10 - baseLength; // Remaining length for random numbers
    const randomNumbers = Math.floor(Math.random() * Math.pow(10, randomNumbersLength)).toString().padStart(randomNumbersLength, '0'); // Generate random numbers and pad with zeros if necessary
    const uniqueUsername = `${baseName}._${randomNumbers}`;
    return uniqueUsername;
}
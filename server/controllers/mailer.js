import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import ENV from '../config.js';

let nodeConfig = {
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        user: ENV.EMAIL,
        pass: ENV.PASSWORD
    },
}

let transporter = nodemailer.createTransport(nodeConfig);

let MailGenerator = new Mailgen({
    theme: "default",
    product: {
        name: "Mailgen",
        link: "https://mailgen.js/"
    }
});

/** POST: http://localhost:8080/api/registerMail 
 * @param: {
  "username" : "example123",
  "password" : "admin123",
  "text" : "example123",
  "subject" : "admin123"
}
*/

export const registerMail = async(req,res) => {
    const {username, userEmail,text,subject} = req.body;

    //email body
    var email = {
        body: {
            name: username,
            intro: text || "This is default intro",
            outro: "Thank you",
        }
    }

    var emailBody = MailGenerator.generate(email);
    let message = {
        from : ENV.EMAIL,
        to: userEmail,
        subject: subject || "Signup successful",
        html: emailBody
    }

    //sending mail 
    transporter.sendMail(message)
        .then(() =>{
            return res.status(200).send({ msg: "You have been sent an email."});
        })
        .catch(error => res.status(500).send({ error }));
}
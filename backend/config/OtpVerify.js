const nodemailer=require('nodemailer');

async function otplogin(emailId) {
    var otp = Math.random();
    otp = otp * 1000000;
    otp = parseInt(otp);
    //console.log(otp);


    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        service : 'Gmail',
        
        auth: {
          user: "keshavsinghal201820@gmail.com",
          pass: "meggemgge1@",
        }
        
    });

    let mailOptions={
        to: emailId,
        subject: "Otp for registration is: ",
        html: "<h3>OTP for account verification is </h3>"  + "<h1 style='font-weight:bold;'>" + otp +"</h1>" // html body
    };


    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            throw new Error(error);
        }
    });
    return otp;
}


module.exports = otplogin;













 

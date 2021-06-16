var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

const sendEmail = async (name, subject, message, callback) => {
    let er = 'ali';
    var transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: 'blueflixpk@gmail.com',
            pass: 'blueflix299792458'
        }
    }));

    var mailOptions = {
        from: '',
        to: '',
        subject: name + ' ' + subject,
        text: message
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            er = error.message;

        } else {
            er = 'Message send succesfully';
        }
    });

};

module.exports = sendEmail;
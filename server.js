const dotenv = require('dotenv');
const express = require('express');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const port = process.env.PORT || 3000;




const app = express();
// Body parser
app.use(express.json());
// Load env vars
dotenv.config({
    path: './config/config.env'
});
// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 100
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());


app.get('/', (req, res) => {
    res.send('Email server is running ');
})

app.post('/sendemail', async (req, res) => {
    const name = req.body.name;
    const subject = req.body.subject;
    const message = req.body.message;
    const email = req.body.email;
    var transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        ignoreTLS: false,
        secure: false,
        auth: {
            user: process.env.USER,
            pass: process.env.PASS
        }
    }));

    var mailOptions = {
        from: email,
        to: process.env.TO,
        subject: name + ' ' + subject,
        text: message
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.json(error.message);

        } else {
            res.json('Email send succefully');
        }
    });

});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
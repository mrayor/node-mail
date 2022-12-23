const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config();

const mailer = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

exports.sendEmail = async (req, res) => {
    const { name, email, category, message } = req.body;

    const options = {
        from: process.env.SEND_FROM,
        to: process.env.SEND_TO,
        subject: "New Contact Email",
        html: `<div>
                <h3>New Email</h3>
                <p>Name:  <span style="font-weight:bold">${name || '-'}</span></p>
                <p>Email:  <span style="font-weight:bold">${email || '-'}</span></p>
                <p>Category:  <span style="font-weight:bold">${category || '-'}</span></p>
                <p>Message:  <span style="font-weight:bold">${message || '-'}</span></p>
                </div>
            `,
    };
    try {
        await mailer.sendMail(options);
        res.status(200).json({
            message: "success",
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: error.message,
        });
    }
};

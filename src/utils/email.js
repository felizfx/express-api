import nodemailer from "nodemailer";

export default async function sendEmail (options) {
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.EMAIL_FELIX,
			pass: process.env.PASSWORD_FELIX
		}
	});

	const mailOptions = {
		from: "ChatAPI using express",
		to: options.email,
		subject: options.subject,
		text: options.message
		// html:
	};

	await transporter.sendMail(mailOptions);
}
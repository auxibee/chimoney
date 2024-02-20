import { type EmailVerificationRequest } from "@prisma/client";

import { prisma } from "@/db/prisma";

import { randomStr } from "./random-str";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmailVerification(email: string) {
	const baseURl = "locchd";
	const existingVerification = await prisma.emailVerificationRequest.findFirst({
		where: { email },
	});

	if (!existingVerification) {
		const verification = await prisma.emailVerificationRequest.create({
			data: {
				token: randomStr(48),
				email,
			},
		});

		const link = [
			`https://${baseURl}/verify-email/?`,
			`email=${verification.email}`,
			`&token=${verification.token}`,
		].join("");

		resend.emails.send({
			from: "chimoney-do.not.reply@chimoney.com",
			to: verification.email,
			subject: "Hello World",
			text: `hi ${link}`,
		});
		//sendEmail(verification);
	}

	// [ ]: Resend email when verification is re-requested. But we should
	// make sure this is not spammed
}

async function sendEmail(verification: EmailVerificationRequest) {
	const { email, token } = verification;

	const link = [
		"https://fsfsd.compa.so/verify-email/?",
		`email=${email}`,
		`&token=${token}`,
	].join("");

	return resend.emails.send({
		to: "auxibee@gmail.com",
		from: "auxibee@gmail.com",
		subject: "Account verification | compa",
		text: `Hi and welcome to compa,\n\nClick the following link to verify your account: ${link}.\n\nSee you!\n\n\n(You cannot reply to this email.)`,
	});
}

export { sendEmailVerification };

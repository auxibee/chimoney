import { prisma } from "@/db/prisma";
import { unstable_noStore as no_store } from "next/cache";

export async function verifyEmail(email: string, token: string) {
	no_store();

	const verificationRequest = await prisma.emailVerificationRequest.findFirst({
		where: { email, token },
	});

	if (!verificationRequest) {
		return false;
	}

	await prisma.user.update({
		where: { email },
		data: { verified: true },
	});

	return true;
}

"use server";

import { prisma } from "@/db/prisma";
import { Prisma, User } from "@prisma/client";
import { z } from "zod";
import { hash } from "../password";
import { redirect } from "next/navigation";
import { sendEmailVerification } from "../send-email-verification";

const RegisterUserSchema = z
	.object({
		email: z.string().email({ message: "Add a valid email" }),
		password: z.string().min(8, { message: "Add a strong password" }),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Password should match",
		path: ["confirmPassword"],
	});

type RegisterFormStateType = {
	errors?: {
		email?: string[];
		password?: string[];
		confirmPassword?: string[];
	};
	message?: string;
};

export async function register(
	state: RegisterFormStateType,
	formData: FormData,
) {
	// Validate form using zod

	const validatedFields = RegisterUserSchema.safeParse({
		email: formData.get("email"),
		password: formData.get("password"),
		confirmPassword: formData.get("confirmPassword"),
	});

	// If validation fails
	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: "Please fix the errors",
		};
	}

	const { email, password } = validatedFields.data;

	let user: User;
	try {
		user = await prisma.user.create({ data: { email } });
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			console.log(error);

			const [field] = error.meta?.target as string[];
			return { message: `${field} already exists` };
		}
		return { message: "somethin went wrong" };
	}

	await prisma.authCredential.create({
		data: { password: await hash(password), userId: user.id },
	});

	await sendEmailVerification(user.email);

	redirect("/register-succes");
}

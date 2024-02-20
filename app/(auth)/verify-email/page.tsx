import { verifyEmail } from "@/lib/data/verify-email";
import { notFound, redirect } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const email = searchParams?.email;
  const token = searchParams?.token;
  if (!email || !token) {
    throw notFound();
  }

  const verified = await verifyEmail(email, token);
  if (!verified) {
    throw notFound();
  }

  redirect("/login");
}

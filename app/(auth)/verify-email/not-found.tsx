import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <h2 className="text-xl font-semibold">Email verification failed</h2>
      <p>Could not verify email.</p>
      <Input type="email" placeholder="email" />
      <Link
        href="/verify-email"
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
      >
        Resend verification
      </Link>
    </main>
  );
}

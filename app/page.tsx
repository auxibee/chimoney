import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Link href="/login">Login</Link>
      <Link href="/register">Register</Link>
    </main>
  );
}

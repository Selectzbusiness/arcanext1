import Navbar from "../components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-screen py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Secure Your Code with Arcanext
        </h1>
        <Link href="/dashboard" legacyBehavior>
          <a className="bg-blue-600 text-white px-6 py-3 rounded text-lg hover:bg-blue-700 transition">
            Go to Dashboard
          </a>
        </Link>
      </main>
    </div>
  );
}

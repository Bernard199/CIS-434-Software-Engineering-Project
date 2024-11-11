// src/components/NavBar.tsx

import Link from "next/link";

export default function NavBar() {
  return (
    <header className="w-full  bg-neutral-900 text-white py-4 px-6 flex justify-between items-center">
      <div className="text-2xl font-bold">Task Manager</div>
      <nav className="space-x-4">
        <Link href="/" className="hover:text-gray-300">Home</Link>
        <Link href="/tasks" className="hover:text-gray-300">Tasks</Link>
        <Link href="/projects" className="hover:text-gray-300">Projects</Link>
        <Link href="/calendar" className="hover:text-gray-300">Calendar</Link>
      </nav>
    </header>
  );
}

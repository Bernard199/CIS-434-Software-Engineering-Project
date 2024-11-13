import Link from "next/link";

// pages/HomePage.tsx

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center py-10">

      {/* Main Content */}
      <div className="bg-white text-gray-800 p-10 rounded-md shadow-lg max-w-4xl w-full">
        {/* Title */}
        <h1 className="text-4xl font-bold border-b border-gray-300 pb-4 mb-6">
          Task Management Software
        </h1>

        {/* Team and Project Information */}
        <div className="text-lg italic text-gray-600 mb-6">
          <p>Team: Chase Ivanicic, Bernard Schweter</p>
          <p>A software engineering project for the CIS 434 course at Cleveland State University.</p>
        </div>

        <hr className="border-gray-300 my-6" />

        {/* Overview Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">Overview</h2>
          <p className="text-base leading-relaxed pb-3">
            This project is aimed at developing a simple, easy-to-use task management software for individuals and small businesses.
            It allows users to create, organize, and manage tasks, assign priorities, set deadlines, and track progress.
          </p>
        </section>

            {/* GitHub Link */}
          <a
            href="https://github.com/Bernard199/CIS-434-Software-Engineering-Project"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline hover:text-blue-700"
          >
            Project GitHub Repository
          </a>
      </div>
    </div>
  );
}

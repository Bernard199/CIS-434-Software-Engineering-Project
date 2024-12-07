'use client';

export default function TasksPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      <p>This is a test page to verify that the Tasks page can be loaded correctly.</p>
      <ul className="list-disc pl-5">
        <li>Task 1: Example task description</li>
        <li>Task 2: Another example task description</li>
      </ul>
      <p>If you can see this content, the page is loading correctly.</p>
    </div>
  );
}

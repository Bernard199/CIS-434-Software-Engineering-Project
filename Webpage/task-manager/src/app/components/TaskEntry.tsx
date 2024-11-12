// pages/TaskEntry.tsx

import { useState, FormEvent } from 'react';

interface Task {
  title: string;
  description: string;
  completed: boolean;
}

export default function CreateTask() {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [message, setMessage] = useState<string>('');

  // Function to add the task to the local list
  const handleAddTask = (e: FormEvent) => {
    e.preventDefault();

    // Create a new task object
    const newTask: Task = {
      title,
      description,
      completed: false,
    };

    // Add the new task to the local list and reset the form fields
    setTasks([...tasks, newTask]);
    setTitle('');
    setDescription('');
    setMessage('Task added locally!');
  };

  return (
    <div className="px-8 pt-6">
      <h1 className="text-2xl font-bold mb-4">Create Tasks Locally</h1>
      <form onSubmit={handleAddTask}>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border border-gray-300 px-3 py-2 rounded-lg w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-lg w-full"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Add Task Locally
        </button>
      </form>

      <h2 className="text-xl font-bold mt-6">Local Task List</h2>
      <ul className="list-disc pl-5 mt-2">
        {tasks.map((task, index) => (
          <li key={index} className="py-1">
            <strong>{task.title}</strong>: {task.description}
          </li>
        ))}
      </ul>

      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
}

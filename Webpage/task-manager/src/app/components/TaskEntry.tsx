// pages/TaskEntry.tsx
'use client'

import { useState, FormEvent } from 'react';

interface Task {
  title: string;
  description: string;
  completed: boolean;
}

export default function CreateTask() {
  const [formFields, setFormFields] = useState<{ [key: string]: string }>({
    title: '',
    description: '',
  });
  const [tasks, setTasks] = useState<Task[]>([]);
  const [message, setMessage] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const fieldConfig = [
    { name: 'title', placeholder: 'Task Title', type: 'text' },
    { name: 'description', placeholder: 'Task Description', type: 'text' },
    { name: 'role', placeholder: 'Role', type: 'text' },
    { name: 'deadline', placeholder: 'Deadline', type: 'text' },
    { name: 'status', placeholder: 'Status', type: 'text' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleAddTask = (e: FormEvent) => {
    e.preventDefault();

    const newTask: Task = {
      title: formFields.title,
      description: formFields.description,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setFormFields({ title: '', description: '' });
    setMessage('Task added locally!');
    setIsModalOpen(false); // Close modal after adding task
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Add Task Button */}
      <button onClick={openModal} className='p-1 bg-blue-500 text-white rounded-md text-sm shadow-lg'>
        Add Task
      </button>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center transition-opacity duration-300">
          {/* Modal Content */}
          <div className="relative bg-white p-10 w-80 rounded-md shadow-lg transition-transform transform scale-100 opacity-100">
            {/* Close Button */}
            <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
              ✕
            </button>

            <form onSubmit={handleAddTask}>
              {fieldConfig.map((field) => (
                <div key={field.name} className='mb-4'>
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formFields[field.name]}
                    onChange={handleInputChange}
                    className='w-full p-2 border rounded-md'
                  />
                </div>
              ))}
              <button type="submit" className='w-full p-2 bg-blue-500 text-white rounded-md'>
                Add Task
              </button>
              {message && <p className='mt-4 text-green-500'>{message}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

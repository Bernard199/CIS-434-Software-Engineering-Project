// components/TaskEntry.tsx
'use client'

import { useState, FormEvent, useEffect } from 'react';

export interface Task {
  id: number;
  title: string;
  description: string;
  role: string;
  deadline: string;
  status: string;
  completed: boolean;
  category: string;
  priority: string;
}

interface TaskEntryProps {
  addTask: (task: Task) => void;
  editTask?: Task | null;
  updateTask: (task: Task) => void;
  resetEditTask: () => void;
}

const TaskEntry: React.FC<TaskEntryProps> = ({ addTask, editTask, updateTask, resetEditTask }) => {
  const [formFields, setFormFields] = useState<{ [key: string]: string }>({
    title: '',
    description: '',
    role: '',
    deadline: '',
    status: '',
    category: '',
    priority: '',
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (editTask) {
      setFormFields({
        title: editTask.title,
        description: editTask.description,
        role: editTask.role,
        deadline: editTask.deadline,
        status: editTask.status,
        category: editTask.category,
        priority: editTask.priority,
      });
      setIsModalOpen(true);
    }
  }, [editTask]);

  const fieldConfig = [
    { name: 'title', placeholder: 'Task Title', type: 'text' },
    { name: 'description', placeholder: 'Task Description', type: 'text' },
    { name: 'role', placeholder: 'Role', type: 'text' },
    { name: 'deadline', placeholder: 'Deadline', type: 'date' },
    { name: 'status', placeholder: 'Status', type: 'text' },
    { name: 'category', placeholder: 'Category', type: 'text' },
    { name: 'priority', placeholder: 'Priority', type: 'text' },
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

    const newErrors = [];
    if (!formFields.title) newErrors.push('Title is required');
    if (!formFields.priority) newErrors.push('Priority is required');

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      title: formFields.title,
      description: formFields.description,
      role: formFields.role,
      deadline: formFields.deadline,
      status: formFields.status,
      completed: false,
      category: formFields.category,
      priority: formFields.priority,
    };

    if (editTask) {
      updateTask({ ...newTask, id: editTask.id });
    } else {
      addTask(newTask);
    }

    setFormFields({ title: '', description: '', role: '', deadline: '', status: '', category: '', priority: '' });
    setErrors([]);
    setIsModalOpen(false);
    resetEditTask();
  };

  const handleOpenAddTaskModal = () => {
    setFormFields({ title: '', description: '', role: '', deadline: '', status: '', category: '', priority: '' });
    setIsModalOpen(true);
    resetEditTask();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetEditTask();
  };

  return (
    <div>
      <button onClick={handleOpenAddTaskModal} className="p-1 bg-blue-500 text-white rounded-md text-sm shadow-lg">
        Add Task
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center transition-opacity duration-300">
          <div className="relative bg-white p-10 w-80 rounded-md shadow-lg transition-transform transform scale-100 opacity-100">
            <button onClick={handleCloseModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
              ✕
            </button>

            <form onSubmit={handleAddTask} aria-labelledby="task-form-title">
              <h2 id="task-form-title" className="text-lg font-bold mb-4">
                {editTask ? 'Edit Task' : 'Add Task'}
              </h2>

              {errors.length > 0 && (
                <div className="mb-4 text-red-500">
                  {errors.map((error, idx) => (
                    <p key={idx}>{error}</p>
                  ))}
                </div>
              )}

              {fieldConfig.map((field) => (
                <div key={field.name} className="mb-4">
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formFields[field.name]}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              ))}
              <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md">
                {editTask ? 'Update Task' : 'Add Task'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskEntry;

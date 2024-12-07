'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export interface Task {
  taskId?: number;
  title: string;
  description?: string;
  category?: string;
  priority: number;
  deadline?: string;
  status?: string;
}

interface TaskEntryProps {
  addTaskToList: (task: Task) => void;
  editTask?: Task | null;
  updateTaskInList: (taskId: number, updatedTask: Task) => void;
  resetEditTask: () => void;
  currentUserId: number;
}

const TaskEntry: React.FC<TaskEntryProps> = ({ addTaskToList, editTask, updateTaskInList, resetEditTask, currentUserId }) => {
  const router = useRouter();
  const [formFields, setFormFields] = useState<Record<string, string>>({
    title: '',
    description: '',
    category: '',
    priority: '',
    deadline: '',
    status: '',
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (editTask) {
      setFormFields({
        title: editTask.title || '',
        description: editTask.description || '',
        category: editTask.category || '',
        priority: editTask.priority.toString() || '',
        deadline: editTask.deadline || '',
        status: editTask.status || '',
      });
      setIsModalOpen(true);
    }
  }, [editTask]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormFields({
      ...formFields,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newErrors = [];
    if (!formFields.title) newErrors.push('Title is required');
    if (!formFields.priority) newErrors.push('Priority is required');
    if (newErrors.length) {
      setErrors(newErrors);
      return;
    }

    const task: Task = {
      taskId: editTask?.taskId,
      title: formFields.title,
      description: formFields.description,
      category: formFields.category,
      priority: parseInt(formFields.priority, 10),
      deadline: formFields.deadline || undefined,
      status: formFields.status,
    };

    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (!token) {
        console.error('No token found. Please log in first.');
        return;
      }

      const response = await fetch('/api/task', {
        method: editTask ? 'PUT' : 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        throw new Error('Failed to save task');
      }

      const savedTask = await response.json();
      if (editTask) {
        updateTaskInList(task.taskId!, savedTask);
      } else {
        addTaskToList(savedTask);
      }

      resetEditTask();
      setIsModalOpen(false);
      setFormFields({
        title: '',
        description: '',
        category: '',
        priority: '',
        deadline: '',
        status: '',
      });
      setErrors([]);

      router.refresh();
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  return (
    <div>
      {/* Center the button using a wrapper with text-center or flex justify-center */}
      <div className="text-center my-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add Task
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96 relative">
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={() => {
                setIsModalOpen(false);
                resetEditTask();
              }}
            >
              ✕
            </button>
            <h2 className="text-lg font-bold mb-4">
              {editTask ? 'Edit Task' : 'Add Task'}
            </h2>
            <form onSubmit={handleSubmit}>
              {(Object.keys(formFields) as Array<keyof typeof formFields>).map((key) => (
                <div key={key} className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  <input
                    name={key}
                    type={key === 'priority' ? 'number' : key === 'deadline' ? 'date' : 'text'}
                    value={formFields[key]}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
              ))}
              {errors.length > 0 && (
                <div className="text-red-500 mb-4">
                  {errors.map((error, idx) => (
                    <p key={idx}>{error}</p>
                  ))}
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded"
              >
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

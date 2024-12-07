'use client';

import { useState, useEffect } from 'react';
import TaskList from '../components/TaskList';
import TaskEntry, { Task } from '../components/TaskEntry';

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]); // Store tasks
  const [editingTask, setEditingTask] = useState<Task | null>(null); // Track the task being edited
  const [error, setError] = useState<string | null>(null); // Store errors
  const [loading, setLoading] = useState<boolean>(true); // Show loading indicator

  // Fetch tasks from the server
  const fetchTasks = async () => {
    try {
      setLoading(true); // Show loading state
      const token = localStorage.getItem('token'); // Retrieve token
      if (!token) throw new Error('No token found. Please log in.');

      const response = await fetch('/api/task', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(errorDetails.error || 'Failed to fetch tasks.');
      }

      const fetchedTasks = await response.json();
      const transformedTasks: Task[] = fetchedTasks.map((t: any) => ({
        taskId: t.taskId || t.task_id,
        title: t.title,
        description: t.description,
        category: t.category,
        priority: t.priority,
        deadline: t.deadline,
        status: t.status,
      }));

      setTasks(transformedTasks);
    } catch (err: any) {
      console.error('Error fetching tasks:', err.message);
      setError(err.message);
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // Delete a task and refresh the list
  const deleteTask = async (taskId: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found. Please log in.');

      const response = await fetch('/api/task', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ task_id: taskId }),
      });

      if (!response.ok) throw new Error('Failed to delete task.');

      await fetchTasks(); // Refresh the task list after deleting
    } catch (err: any) {
      console.error('Error deleting task:', err.message);
      setError(err.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      {loading && <p>Loading tasks...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <TaskList
        tasks={tasks}
        deleteTask={deleteTask}
        editTask={setEditingTask}
      />
      <TaskEntry
        addTaskToList={(newTask: Task) => setTasks([...tasks, newTask])}
        editTask={editingTask}
        updateTaskInList={(id: number, updatedTask: Task) =>
          setTasks((prev) => prev.map((task) => (task.taskId === id ? updatedTask : task)))
        }
        resetEditTask={() => setEditingTask(null)}
      />
    </div>
  );
}

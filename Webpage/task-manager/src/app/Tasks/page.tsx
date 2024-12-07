'use sever';

import { useState, useEffect } from 'react';
import TaskList from '../components/TaskList';
import TaskEntry, { Task } from '../components/TaskEntry';

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // A reusable function to fetch tasks from the server
  const fetchTasks = async () => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (!token) {
        console.error('No token found. Please log in first.');
        return;
      }

      const response = await fetch('/api/task', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }

      const fetchedTasks = await response.json();

      const transformedTasks: Task[] = fetchedTasks.map((t: any) => ({
        taskId: t.taskId || t.task_id,
        title: t.title,
        description: t.description,
        category: t.category,
        priority: t.priority,
        deadline: t.deadline,
        status: t.status
      }));

      setTasks(transformedTasks);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Delete a task and refresh the list
  const deleteTask = async (taskId: number) => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (!token) {
        console.error('No token found. Please log in first.');
        return;
      }

      const response = await fetch('/api/task', {
        method: 'DELETE',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ task_id: taskId }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      // After deleting, re-fetch tasks
      await fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  // Handle adding a new task
  const handleAddTask = async (newTask: Task) => {
    // After adding, re-fetch tasks to ensure data is in sync
    await fetchTasks();
  };

  // Handle updating an existing task
  const handleUpdateTask = async (id: number, updatedTask: Task) => {
    // After updating, re-fetch tasks to ensure data is in sync
    await fetchTasks();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      <TaskList
        tasks={tasks}
        setTasks={setTasks}
        deleteTask={deleteTask}
        editTask={setEditingTask}
      />
      <TaskEntry
        addTaskToList={handleAddTask}
        editTask={editingTask}
        updateTaskInList={handleUpdateTask}
        resetEditTask={() => setEditingTask(null)}
        currentUserId={1} // Replace with actual user ID if needed
      />
    </div>
  );
}

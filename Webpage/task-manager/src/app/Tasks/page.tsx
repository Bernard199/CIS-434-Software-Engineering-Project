'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TaskList from '../components/TaskList';
import TaskEntry, { Task } from '../components/TaskEntry';

export default function TasksPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Fetch tasks from the API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('/api/task', { method: 'GET' });
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const fetchedTasks = await response.json();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTasks();
  }, []);

  // Delete a task
  const deleteTask = async (taskId: number) => {
    try {
      const response = await fetch('/api/task', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task_id: taskId }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      // Update local state and refresh page
      setTasks((prevTasks) => prevTasks.filter((task) => task.taskId !== taskId));
      router.refresh();
    } catch (error) {
      console.error(error);
    }
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
        addTaskToList={(task) => setTasks((prev) => [...prev, task])}
        editTask={editingTask}
        updateTaskInList={(id, updatedTask) =>
          setTasks((prev) =>
            prev.map((task) => (task.taskId === id ? updatedTask : task))
          )
        }
        resetEditTask={() => setEditingTask(null)}
        currentUserId={1}
      />
    </div>
  );
}

'use client';

import { deleteTask as deleteTaskApi, getTasks } from "../API/taskService";
import { useEffect, useState } from "react";
import BetterList from "../components/BetterList";
import { Task } from "../components/TaskEntry";

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  // Fetch tasks from backend when component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const deleteTask = async (id: number) => {
    try {
      await deleteTaskApi(id);
      setTasks(tasks.filter(task => task.taskId !== id));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const editTask = (task: Task) => {
    setTaskToEdit(task);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(tasks.map(task => (task.taskId === updatedTask.taskId ? updatedTask : task)));
    setTaskToEdit(null);
  };

  const resetEditTask = () => {
    setTaskToEdit(null);
  };

  return (
    <div className="px-40 pt-10">
      {/* Task List */}
      <div className="shadow-lg rounded-md">
        <BetterList
          tasks={tasks}
          setTasks={setTasks}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      </div>
    </div>
  );
}

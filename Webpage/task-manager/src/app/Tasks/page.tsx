'use client'

import { useState } from "react";
import BetterList from "../components/BetterList";
import TaskEntry, { Task } from "../components/TaskEntry";

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.taskId !== taskId));
  };

  const editTask = (task: Task) => {
    setTaskToEdit(task);
  };

  const updateTask = (taskId: number, updatedTask: Task) => {
    setTasks(tasks.map(task => (task.taskId === taskId ? updatedTask : task)));
    setTaskToEdit(null);
  };

  const resetEditTask = () => {
    setTaskToEdit(null);
  };

  return (
    <div>
      <div className="px-40 pt-10">
        {/* Task Entry */}
        <div className="shadow-lg rounded-md">
          <BetterList tasks={tasks} deleteTask={deleteTask} editTask={editTask} userId={1} />
          <div className="bg-neutral-100 p-1">
            <div className="flex items-center justify-center">
              <TaskEntry addTask={addTask} editTask={taskToEdit} updateTask={updateTask} resetEditTask={resetEditTask} currentUserId={1} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

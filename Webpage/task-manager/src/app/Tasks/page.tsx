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

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (task: Task) => {
    setTaskToEdit(task);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
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
          <BetterList tasks={tasks} deleteTask={deleteTask} editTask={editTask} />
          <div className="bg-neutral-100 p-1">
            <div className="flex items-center justify-center">
              <TaskEntry addTask={addTask} editTask={taskToEdit} updateTask={updateTask} resetEditTask={resetEditTask} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

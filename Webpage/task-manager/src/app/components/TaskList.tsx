import React from 'react';
import { Task } from './TaskEntry';

interface TaskListProps {
  tasks: Task[];
  deleteTask: (taskId: number) => Promise<void>;
  editTask: (task: Task) => void;
}

export default function TaskList({ tasks, deleteTask, editTask }: TaskListProps) {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.taskId} className="task-item">
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <button
            className="btn-edit"
            onClick={() => editTask(task)}
          >
            Edit
          </button>
          <button
            className="btn-delete"
            onClick={() => deleteTask(task.taskId)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

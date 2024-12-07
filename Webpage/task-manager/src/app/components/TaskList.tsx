import React, { useEffect, useState } from 'react';
import TaskEntry, { Task } from './TaskEntry';

interface TaskListProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  deleteTask: (taskId: number) => void;
  editTask: (task: Task) => void;
}

// Define table headers and corresponding keys for display
const headers = ["TaskName", "Description", "Category", "Priority", "Deadline", "Status", "Actions"];
const taskKeys = ["title", "description", "category", "priority", "deadline", "status"];

const TaskList: React.FC<TaskListProps> = ({ tasks, setTasks, deleteTask, editTask }) => {
  const [editTaskState, setEditTaskState] = useState<Task | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Prevent server-side rendering issues

  // Add a new task to the list
  const addTaskToList = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  // Update an existing task in the list
  const updateTaskInList = (taskId: number, updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.taskId === taskId ? updatedTask : t))
    );
  };

  return (
    <div className="font-sans overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 mb-4">
        <thead className="bg-gray-100">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="px-4 py-4 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider whitespace-nowrap"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tasks.length === 0 ? (
            <tr>
              <td colSpan={headers.length} className="px-4 py-4 text-center text-sm text-gray-800">
                No tasks available
              </td>
            </tr>
          ) : (
            tasks.map((task, index) => (
              <tr key={task.taskId ?? index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                {taskKeys.map((key) => (
                  <td key={key} className="px-4 py-4 text-sm text-gray-800">
                    {task[key as keyof Task] ?? '-'}
                  </td>
                ))}
                <td className="px-4 py-4 text-sm text-gray-800">
                  <button className="text-blue-600 mr-4" onClick={() => setEditTaskState(task)}>
                    Edit
                  </button>
                  <button
                    className="text-red-600"
                    onClick={() => task.taskId && deleteTask(task.taskId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;

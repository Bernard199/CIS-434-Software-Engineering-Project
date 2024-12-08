'use client';

import React, { useEffect, useState } from 'react';
import { Task } from './TaskEntry';

interface TaskListProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  deleteTask: (taskId: number) => void;
  editTask: (task: Task) => void;
}

// Table headers and corresponding keys
const headers = ["TaskName", "Description", "Category", "Priority", "Deadline", "Status", "Actions"];
const taskKeys = ["title", "description", "category", "priority", "deadline", "status"];

const TaskList: React.FC<TaskListProps> = ({ tasks, deleteTask, editTask }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Prevent server-side rendering issues

  return (
    <div className="font-sans">

      {/* Desktop Table View (visible on lg and above) */}
      <div className="hidden lg:block overflow-x-auto rounded-lg shadow-lg">
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
                  <td className="px-4 py-4 text-sm text-gray-800 whitespace-nowrap">
                    <button
                      className="text-blue-600 mr-4"
                      onClick={() => editTask(task)}
                    >
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

      {/* Mobile Card View (visible below lg breakpoint) */}
      <div className="block lg:hidden">
        {tasks.length === 0 ? (
          <div className="text-center text-sm text-gray-800 py-4">No tasks available</div>
        ) : (
          tasks.map((task) => (
            <div key={task.taskId} className="bg-white rounded-lg shadow p-4 mb-4">
              {/* Each field as a two-column row: FieldName | Value */}
              <div className="grid grid-cols-2 gap-2 border-b pb-1 mb-2">
                <span className="font-semibold">TaskName:</span>
                <span>{task.title || '-'}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 border-b pb-1 mb-2">
                <span className="font-semibold">Description:</span>
                <span>{task.description || '-'}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 border-b pb-1 mb-2">
                <span className="font-semibold">Category:</span>
                <span>{task.category || '-'}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 border-b pb-1 mb-2">
                <span className="font-semibold">Priority:</span>
                <span>{task.priority || '-'}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 border-b pb-1 mb-2">
                <span className="font-semibold">Deadline:</span>
                <span>{task.deadline || '-'}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 border-b pb-1 mb-2">
                <span className="font-semibold">Status:</span>
                <span>{task.status || '-'}</span>
              </div>
              <div className="flex space-x-4 mt-2">
                <button
                  className="text-blue-600"
                  onClick={() => editTask(task)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600"
                  onClick={() => task.taskId && deleteTask(task.taskId)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default TaskList;

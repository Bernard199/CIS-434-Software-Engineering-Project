// components/BetterList.tsx
import React from 'react';
import { Task } from './TaskEntry';

interface BetterListProps {
  tasks: Task[];
  deleteTask: (id: number) => void;
  editTask: (task: Task) => void;
}

const headers = ["TaskName", "Description", "Role", "Priority", "Deadline", "Status", "Actions"];
const taskKeys = ["title", "description", "role", "priority", "deadline", "status"];

const BetterList: React.FC<BetterListProps> = ({ tasks, deleteTask, editTask }) => {
  return (
    <div className="font-sans overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
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
              <tr key={task.id} className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                {taskKeys.map((key) => (
                  <td key={key} className="px-4 py-4 text-sm text-gray-800">
                    {task[key as keyof Task]}
                  </td>
                ))}
                <td className="px-4 py-4 text-sm text-gray-800">
                  <button className="text-blue-600 mr-4" onClick={() => editTask(task)}>Edit</button>
                  <button className="text-red-600" onClick={() => deleteTask(task.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BetterList;
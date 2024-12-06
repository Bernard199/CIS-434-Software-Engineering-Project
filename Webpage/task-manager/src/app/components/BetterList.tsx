import React, { useEffect, useState } from 'react';
import { getTasks } from '../API/taskService';
import TaskEntry, { Task } from './TaskEntry';

interface BetterListProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>; // Add setTasks prop type
  deleteTask: (taskId: number) => void;
  editTask: (task: Task) => void;
}

const headers = ["TaskName", "Description", "Category", "Priority", "Deadline", "Status", "Actions"];
const taskKeys = ["title", "description", "category", "priority", "deadline", "status"];

const BetterList: React.FC<BetterListProps> = ({ tasks, setTasks, deleteTask, editTask }) => {
  const [editTaskState, setEditTaskState] = useState<Task | null>(null);

  // Function to add a new task to the list
  const addTaskToList = (task: Task) => {
    console.log("Adding task to list:", task);
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  // Function to update a task in the list
  const updateTaskInList = (taskId: number, updatedTask: Task) => {
    console.log("Updating task in list with ID:", taskId, "Updated Task:", updatedTask);
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.taskId === taskId ? updatedTask : task))
    );
  };

  // Function to handle editing a task
  const handleEditTask = (task: Task) => {
    console.log("Editing task:", task);
    setEditTaskState(task);
  };

  // Function to reset the edit state
  const handleResetEditTask = () => {
    setEditTaskState(null);
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
                    {task[key as keyof Task] || '-'}
                  </td>
                ))}
                <td className="px-4 py-4 text-sm text-gray-800">
                  <button className="text-blue-600 mr-4" onClick={() => handleEditTask(task)}>Edit</button>
                  <button className="text-red-600" onClick={() => {
                    if (task.taskId) {
                      console.log("Deleting task with ID:", task.taskId);
                      deleteTask(task.taskId);
                    } else {
                      console.error("Task ID is undefined, cannot delete task:", task);
                    }
                  }}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Include the TaskEntry component below the task table */}
      <div className="mt-4">
        <TaskEntry
          addTaskToList={addTaskToList}
          editTask={editTaskState}
          updateTask={updateTaskInList}
          resetEditTask={handleResetEditTask}
          currentUserId={1} // Use the appropriate current user ID here
        />
      </div>
    </div>
  );
};

export default BetterList;
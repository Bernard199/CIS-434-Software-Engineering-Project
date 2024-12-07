import React, { useState, useEffect } from 'react';

export interface Task {
  taskId: number;
  title: string;
  description: string;
  category: string;
  priority: number;
  deadline: string | null;
  status: string;
}

interface TaskEntryProps {
  addTaskToList: (newTask: Task) => void;
  editTask: Task | null;
  updateTaskInList: (id: number, updatedTask: Task) => void;
  resetEditTask: () => void;
}

export default function TaskEntry({
  addTaskToList,
  editTask,
  updateTaskInList,
  resetEditTask,
}: TaskEntryProps) {
  const [task, setTask] = useState<Task>({
    taskId: 0,
    title: '',
    description: '',
    category: '',
    priority: 1,
    deadline: null,
    status: 'Pending',
  });

  useEffect(() => {
    if (editTask) {
      setTask(editTask);
    } else {
      setTask({
        taskId: 0,
        title: '',
        description: '',
        category: '',
        priority: 1,
        deadline: null,
        status: 'Pending',
      });
    }
  }, [editTask]);

  const handleSubmit = async () => {
    if (editTask) {
      updateTaskInList(editTask.taskId, task);
    } else {
      addTaskToList(task);
    }
    resetEditTask();
  };

  return (
    <div className="task-entry">
      <input
        type="text"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
        placeholder="Title"
      />
      <textarea
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
        placeholder="Description"
      />
      <button onClick={handleSubmit}>
        {editTask ? 'Update Task' : 'Add Task'}
      </button>
      {editTask && (
        <button onClick={resetEditTask}>
          Cancel
        </button>
      )}
    </div>
  );
}

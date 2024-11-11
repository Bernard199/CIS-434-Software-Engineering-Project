// src/components/TaskItem.tsx

interface Task {
    id: number;
    title: string;
    description: string;
  }
  
  interface TaskItemProps {
    task: Task;
  }
  
  export default function TaskItem({ task }: TaskItemProps) {
    return (
      <div className="p-4 w-96 bg-gray-100 rounded shadow">
        <h2 className="text-xl font-semibold">{task.title}</h2>
        <p className="text-gray-700">{task.description}</p>
      </div>
    );
  }
  
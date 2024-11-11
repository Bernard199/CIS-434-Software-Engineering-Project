interface Task {
    id: number;
    title: string;
    description: string;
    category: string;
    priority: string;
    deadline: string;
    status: string;
  }
  
  interface TaskListProps {
    tasks: Task[];
  }
  
  const headers = ["TaskName", "Description", "Role", "Priority", "Deadline", "Status", "Actions"];
  const taskKeys = ["title", "description", "category", "priority", "deadline", "status"];
  
  export default function TaskTable({ tasks }: TaskListProps) {
    return (
      <div className="font-sans overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tasks.length === 0 ? (
              <tr>
                <td colSpan={headers.length} className="px-4 py-4 text-center text-sm text-gray-500">
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
                    <button className="text-blue-600 mr-4">Edit</button>
                    <button className="text-red-600">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    );
  }
  
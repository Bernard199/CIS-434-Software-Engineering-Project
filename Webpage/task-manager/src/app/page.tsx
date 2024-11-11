import TaskList from "./components/TaskList";

export default function Home() {
  return (
    <div className = "px-40 pt-10">
      <h1>Task Manager</h1>
      <p>Welcome to the Task Manager app!</p>
      <TaskList tasks = {[{id: 1, title: "Design Database Schema", description: "Create the initial database schema for the task manager app."},
                        {id: 2, title: "Create Components", description: "Create the Functional components"}]} /> 

    </div>
  );
}

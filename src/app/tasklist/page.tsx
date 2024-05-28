"use client";

import React, { useState, useEffect } from "react";
import { tasks as initialTasks } from "../../data/tasks";
import { useRouter } from "next/navigation";
// import ProtectedRoute from "../../components/ProtectedRoute";

interface Task {
  id: number;
  title: string;
  completed: boolean;
  email: string | null;
}

interface TaskListProps {
  tasks: Task[];
  onUpdateTask: (id: number) => void;
  onDeleteTask: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onUpdateTask,
  onDeleteTask,
}) => {
  return (
    <div className="w-full">
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`py-2 px-4 mb-2 rounded cursor-pointer flex justify-between`}
            onClick={() => onUpdateTask(task.id)}
          >
            <span
              className={`${
                task.completed ? "bg-gray-200 line-through" : "bg-white"
              }`}
            >
              {task.title}
            </span>
            <button
              className={`ml-2 text-red-500`}
              onClick={(e) => {
                e.stopPropagation();
                onDeleteTask(task.id);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Tasks: React.FC = () => {
  const [taskList, setTaskList] = useState<Task[]>(initialTasks);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const router = useRouter();

  const loggedIn = localStorage.getItem("email");

  console.log(loggedIn);

  useEffect(() => {
    if (!loggedIn) {
      router.push("/login");
    }
  }, []);

  const handleUpdateTask = (taskId: number) => {
    const updatedTaskList = taskList.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTaskList(updatedTaskList);
  };

  const handleDeleteTask = (taskId: number) => {
    const updatedTaskList = taskList.filter((task) => task.id !== taskId);
    setTaskList(updatedTaskList);
  };

  const handleAddTask = () => {
    if (newTaskTitle.trim() === "") return;
    const newTask: Task = {
      id: Date.now(),
      title: newTaskTitle,
      completed: false,
      email: loggedIn,
    };
    setTaskList([...taskList, newTask]);
    setNewTaskTitle("");
  };

  const userTasks = taskList.filter((task) => task.email === loggedIn);

  const handleLogout = () => {
    localStorage.removeItem("email");
    router.push("/login");
  };

  return (
    <div className="p-4 border rounded-lg flex items-center flex-col w-1/3 m-auto my-8">
      <h2 className="text-xl font-semibold mb-4">Task List</h2>
      <div className="mb-4">
        <input
          type="text"
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Enter task title"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />

        <button
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleAddTask}
        >
          Add Task
        </button>
      </div>
      <TaskList
        tasks={userTasks}
        onUpdateTask={handleUpdateTask}
        onDeleteTask={handleDeleteTask}
      />
      <div className="">
        <button
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded mt-4"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Tasks;

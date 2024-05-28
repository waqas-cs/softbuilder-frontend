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

export const TaskList: React.FC<TaskListProps> = ({
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

interface TaskProps {
  id: number;
  title: string;
  completed: boolean;
  email: string;
}
export const tasks: TaskProps[] = [
  { id: 1, title: "Task 1", completed: false, email: "waqas@gmail.com" },
  { id: 2, title: "Task 2", completed: true, email: "waqas@gmail.com" },
  { id: 3, title: "Task 3", completed: false, email: "ali@gmail.com" },
];

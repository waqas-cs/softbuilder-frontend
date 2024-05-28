"use client";

import { users } from "@/data/users";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Input = ({
  name,
  type,
  value,
  onChange,
}: {
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="mb-4">
      <input
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        name={name}
        id={name}
        type={type}
        placeholder={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

const Registration = () => {
  const [formState, setFormState] = useState({
    username: "",
    password: "",
    email: "",
  });

  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem("email");
    if (loggedIn) {
      router.push("/tasklist");
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    users.push(formState);
    console.log(users);
    router.push("/login");
    setFormState({ username: "", password: "", email: "" });
  };

  return (
    <div className="p-4 border rounded-lg  flex items-center flex-col w-1/3 m-auto my-8">
      <div className="my-4">Create New User</div>
      <form onSubmit={handleSubmit}>
        <Input
          name="username"
          type="text"
          value={formState.username}
          onChange={handleChange}
        />
        <Input
          name="email"
          type="email"
          value={formState.email}
          onChange={handleChange}
        />
        <Input
          name="password"
          type="password"
          value={formState.password}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-4"
        >
          Create User
        </button>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-4 mx-2"
        >
          <Link href="/login">Login</Link>
        </button>
      </form>
    </div>
  );
};

export default Registration;

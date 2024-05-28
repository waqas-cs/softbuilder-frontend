"use client";

import { users } from "@/data/users";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
// import { useAuth } from "../../context/ AuthContext";

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

const Login = () => {
  const [loginState, setLoginState] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  // const { login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem("email");
    if (loggedIn) {
      router.push("/tasklist");
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // await login(loginState.email, loginState.password);
    const user = users.find(
      (user) =>
        user.email === loginState.email && user.password === loginState.password
    );
    if (user) {
      console.log("Login successful!");
      setLoginError("");
      const email = loginState.email;
      localStorage.setItem("email", email);
      router.push("/tasklist");
    } else {
      setLoginError("Invalid email or password");
    }
  };

  return (
    <div className="py-8 px-1 border my-8 rounded-lg shadow-md flex items-center flex-col w-1/3 mx-auto">
      <div className="my-4">Login</div>
      <form onSubmit={handleLogin}>
        <Input
          name="email"
          type="email"
          value={loginState.email}
          onChange={handleChange}
        />
        <Input
          name="password"
          type="password"
          value={loginState.password}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-4"
        >
          Login
        </button>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-4 mx-2"
        >
          <Link href="/registeration">Register</Link>
        </button>
        {loginError && <div className="text-red-500">{loginError}</div>}
      </form>
    </div>
  );
};

export default Login;

import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const payload = {
      username: inputValue.username,
      email: inputValue.email,
      password: inputValue.password,
    };

    try {
      await axios.post(`${API_URL}/api/auth/register/`, payload);
      toast.success("Account created!");
      setInputValue({ username: "", email: "", password: "" });
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="flex justify-center items-center h-screen">
      <article className="border sm:px-8 px-4 py-5 mx-3">
        <h1 className="font-bold text-4xl my-5 text-center">
          Create an Account
        </h1>
        <form onSubmit={(e) => handleSubmit(e)} method="post">
          <div>
            <label htmlFor="username">Username:</label>
            <input
              className="border p-2 text-sm w-full my-2"
              value={inputValue.username}
              onChange={(e) =>
                setInputValue({ ...inputValue, username: e.target.value })
              }
              type="text"
              name="username"
              placeholder="Enter username"
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              className="border p-2 text-sm w-full my-2"
              type="email"
              value={inputValue.email}
              onChange={(e) =>
                setInputValue({ ...inputValue, email: e.target.value })
              }
              name="email"
              placeholder="Enter email"
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              className="border p-2 text-sm w-full my-2"
              type="password"
              value={inputValue.password}
              onChange={(e) =>
                setInputValue({ ...inputValue, password: e.target.value })
              }
              name="password"
              placeholder="Enter password"
            />
          </div>
          <input
            type="submit"
            className="bg-amber-700 w-full p-2 text-white my-2 text-sm cursor-pointer"
            value={isLoading ? "Signing up..." : "Signup"}
          />
          <p className="text-sm">
            Have an account?{" "}
            <Link to={"/"} className="underline text-blue-400">
              Click here to login.
            </Link>
          </p>
        </form>
      </article>
    </section>
  );
};

export default Signup;

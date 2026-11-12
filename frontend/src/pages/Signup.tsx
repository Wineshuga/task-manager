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
    <section className="flex justify-center items-center min-h-screen px-4 py-10">
      <article className="card w-full max-w-sm sm:p-10 p-6 shadow-sm">
        <h1 className="font-bold text-3xl text-center">
          Create an Account
        </h1>
        <p className="text-sm text-muted text-center mt-2">
          Start organising your projects in minutes.
        </p>
        <form className="mt-8" onSubmit={(e) => handleSubmit(e)} method="post">
          <div className="mb-4">
            <label htmlFor="username" className="label">Username</label>
            <input
              className="input"
              value={inputValue.username}
              onChange={(e) =>
                setInputValue({ ...inputValue, username: e.target.value })
              }
              type="text"
              id="username"
              name="username"
              placeholder="Enter username"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="label">Email</label>
            <input
              className="input"
              type="email"
              value={inputValue.email}
              onChange={(e) =>
                setInputValue({ ...inputValue, email: e.target.value })
              }
              id="email"
              name="email"
              placeholder="Enter email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="label">Password</label>
            <input
              className="input"
              type="password"
              value={inputValue.password}
              onChange={(e) =>
                setInputValue({ ...inputValue, password: e.target.value })
              }
              id="password"
              name="password"
              placeholder="Enter password"
            />
          </div>
          <input
            type="submit"
            className="btn btn-primary w-full mt-2"
            disabled={isLoading}
            value={isLoading ? "Signing up..." : "Signup"}
          />
          <p className="text-sm text-muted text-center mt-6">
            Have an account?{" "}
            <Link to={"/"} className="link">
              Log in
            </Link>
          </p>
        </form>
      </article>
    </section>
  );
};

export default Signup;

import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Logo from "../components/Logo";

const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    username: "",
    password: "",
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const payload = {
      username: inputValue.username,
      password: inputValue.password,
    };

    try {
      const res = await axios.post(`${API_URL}/api/auth/login/`, payload);
      const { access, refresh } = res.data;
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: inputValue.username,
          accessToken: access,
          refreshToken: refresh,
        }),
      );
      toast.success("Welcome friend!");
      setInputValue({ username: "", password: "" });
      navigate("/projects");
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
        <div className="flex justify-center mb-6">
          <Logo />
        </div>
        <h1 className="font-bold text-3xl text-center">Welcome Back!</h1>
        <p className="text-sm text-muted text-center mt-2">
          Log in to manage your projects and tasks.
        </p>
        <form className="mt-8" onSubmit={(e) => handleSubmit(e)} method="post">
          <div className="mb-4">
            <label htmlFor="username" className="label">Username</label>
            <input
              className="input"
              type="text"
              value={inputValue.username}
              onChange={(e) =>
                setInputValue({ ...inputValue, username: e.target.value })
              }
              id="username"
              name="username"
              placeholder="Enter username"
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
            value={isLoading ? "Logging in..." : "Login"}
          />
          <p className="text-sm text-muted text-center mt-6">
            No account?{" "}
            <Link to={"/signup"} className="link">
              Sign up
            </Link>
          </p>
        </form>
      </article>
    </section>
  );
};

export default Login;

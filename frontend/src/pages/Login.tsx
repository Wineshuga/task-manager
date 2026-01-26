import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
    <section className="flex justify-center items-center h-screen">
      <article className="border sm:px-8 px-4 py-5 mx-3">
        <h1 className="font-bold text-4xl my-5 text-center">Welcome Back!</h1>
        <form onSubmit={(e) => handleSubmit(e)} method="post">
          <div>
            <label htmlFor="username">Username:</label>
            <input
              className="border p-2 text-sm w-full my-2"
              type="text"
              value={inputValue.username}
              onChange={(e) =>
                setInputValue({ ...inputValue, username: e.target.value })
              }
              name="username"
              placeholder="Enter username"
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
            value={isLoading ? "Logging in..." : "Login"}
          />
          <p className="text-sm">
            No account?{" "}
            <Link to={"signup"} className="underline text-blue-400">
              Create an account
            </Link>
          </p>
        </form>
      </article>
    </section>
  );
};

export default Login;

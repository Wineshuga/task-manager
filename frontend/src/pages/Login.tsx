import { Link } from "react-router-dom";

const Login = () => {
  return (
    <section className="flex justify-center items-center h-screen">
      <article className="border sm:px-8 px-4 py-5 mx-3">
        <h1 className="font-bold text-4xl my-5 text-center">Welcome Back!</h1>
        <form action="" method="post">
          <div>
            <label htmlFor="username">Username:</label>
            <input
              className="border p-2 text-sm w-full my-2"
              type="text"
              name="username"
              placeholder="Enter username"
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              className="border p-2 text-sm w-full my-2"
              type="password"
              name="password"
              placeholder="Enter password"
            />
          </div>
          <input
            type="submit"
            className="bg-amber-700 w-full p-2 text-white my-2 text-sm cursor-pointer"
            value={"Login"}
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

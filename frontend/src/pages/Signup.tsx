const Signup = () => {
  return (
    <section>
      <article className="border p-4">
        <h1>Create an Account</h1>
        <form action="" method="post">
          <div>
            <label htmlFor="username">Username:</label>
            <input type="text" name="username" placeholder="Enter username" />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" placeholder="Enter email" />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
            />
          </div>
        </form>
      </article>
    </section>
  );
};

export default Signup;

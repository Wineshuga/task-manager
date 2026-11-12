import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import mobileDemo from "../assets/demo-mobile.gif";

const FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      </svg>
    ),
    title: "Projects in one place",
    description:
      "Group your work into projects so every goal has a clear home.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18M9 15l2 2 4-4" />
      </svg>
    ),
    title: "Tasks with due dates",
    description:
      "Break projects into tasks and set due dates so nothing slips.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" />
      </svg>
    ),
    title: "Status at a glance",
    description:
      "Move tasks from To Do to In Progress to Done and see progress instantly.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <rect x="7" y="2" width="10" height="20" rx="2" />
        <path d="M11 18h2" />
      </svg>
    ),
    title: "Works on any device",
    description:
      "A clean, responsive layout that feels just as good on your phone.",
  },
];

const STEPS = [
  {
    title: "Create an account",
    description: "Sign up in seconds with just a username, email and password.",
  },
  {
    title: "Add a project",
    description: "Give it a title and a short description of what it's for.",
  },
  {
    title: "Track your tasks",
    description: "Add tasks, update their status and clear them when done.",
  },
];

const Landing = () => {
  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* Navigation */}
      <header className="max-w-6xl mx-auto flex justify-between items-center px-5 py-5">
        <Logo />
        <nav className="flex items-center gap-2 sm:gap-3">
          <Link to="/login" className="btn btn-outline">
            Log in
          </Link>
          <Link to="/signup" className="btn btn-primary hidden sm:inline-flex">
            Get started
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-5 pt-10 sm:pt-16 pb-16 sm:pb-24 grid gap-14 lg:gap-10 lg:grid-cols-[1.15fr_1fr] items-center">
        <div className="text-center lg:text-left">
          <span className="inline-block animate-fade-up rounded-full bg-cream border border-line px-4 py-1.5 text-xs font-medium text-primary-dark">
            Simple project &amp; task management
          </span>
          <h1
            className="animate-fade-up mt-6 text-4xl sm:text-6xl font-bold leading-tight"
            style={{ animationDelay: "100ms" }}
          >
            Organise your projects.{" "}
            <span className="text-primary">Finish your tasks.</span>
          </h1>
          <p
            className="animate-fade-up mt-5 text-base sm:text-lg text-muted max-w-xl mx-auto lg:mx-0"
            style={{ animationDelay: "200ms" }}
          >
            Tasky keeps your work tidy. Create projects, add tasks with due
            dates and track every step from to-do to done.
          </p>
          <div
            className="animate-fade-up mt-8 flex flex-wrap justify-center lg:justify-start gap-3"
            style={{ animationDelay: "300ms" }}
          >
            <Link to="/signup" className="btn btn-primary px-6 py-3">
              Get started for free
            </Link>
            <Link to="/login" className="btn btn-outline px-6 py-3">
              I already have an account
            </Link>
          </div>
        </div>

        {/* Product demo */}
        <div
          className="animate-fade-up relative flex justify-center"
          style={{ animationDelay: "450ms" }}
        >
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[85%] aspect-square rounded-full bg-cream -z-10"
          />
          <figure className="animate-float w-60 sm:w-64 rounded-[2rem] border-[7px] border-primary-dark bg-primary-dark shadow-2xl shadow-primary-dark/30 overflow-hidden">
            <img
              src={mobileDemo}
              width={390}
              height={844}
              alt="Demo of Tasky on a phone: logging in, creating a project, adding a task, updating its status and deleting a task"
              className="block w-full h-auto rounded-[1.5rem]"
            />
          </figure>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-5 py-16 sm:py-24">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Everything you need, nothing you don't
          </h2>
          <p className="mt-4 text-muted">
            A focused set of tools that helps you plan, act and finish.
          </p>
        </div>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <li
              key={feature.title}
              className="card p-6 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-dark/5 hover:border-secondary"
            >
              <span className="h-11 w-11 rounded-xl bg-cream text-primary flex items-center justify-center">
                {feature.icon}
              </span>
              <h3 className="mt-5 font-semibold text-lg">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted">{feature.description}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* How it works */}
      <section className="bg-surface border-y border-line">
        <div className="max-w-6xl mx-auto px-5 py-16 sm:py-24">
          <h2 className="text-3xl sm:text-4xl font-bold text-center">
            Up and running in three steps
          </h2>
          <ol className="mt-12 grid gap-8 md:grid-cols-3">
            {STEPS.map((step, index) => (
              <li key={step.title} className="text-center md:text-left">
                <span className="inline-flex h-10 w-10 rounded-full bg-primary text-white font-heading font-bold items-center justify-center">
                  {index + 1}
                </span>
                <h3 className="mt-4 font-semibold text-lg">{step.title}</h3>
                <p className="mt-2 text-sm text-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Call to action */}
      <section className="max-w-6xl mx-auto px-5 py-16 sm:py-24">
        <div className="rounded-3xl bg-primary-dark px-6 py-14 sm:px-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-cream">
            Ready to get organised?
          </h2>
          <p className="mt-4 text-cream/80 max-w-lg mx-auto">
            Create your free account and start your first project today.
          </p>
          <Link
            to="/signup"
            className="btn mt-8 px-6 py-3 bg-cream text-primary-dark hover:bg-white"
          >
            Create your account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-line">
        <div className="max-w-6xl mx-auto px-5 py-8 flex flex-wrap gap-4 justify-between items-center">
          <Logo />
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} Tasky. All rights
            reserved.
          </p>
        </div>
      </footer>
    </main>
  );
};

export default Landing;

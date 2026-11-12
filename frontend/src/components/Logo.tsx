import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
}

const Logo = ({ className = "" }: LogoProps) => {
  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-2 font-heading font-bold text-lg text-primary-dark ${className}`}
    >
      <span className="h-7 w-7 rounded-lg bg-primary text-white text-sm flex items-center justify-center">
        ✓
      </span>
      Tasky
    </Link>
  );
};

export default Logo;

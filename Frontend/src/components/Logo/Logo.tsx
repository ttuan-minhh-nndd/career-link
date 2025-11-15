import { Link } from "react-router-dom";
import logo from "../../assets/CAREERLINK.svg";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className="flex items-center gap-2">
      <img
        src={logo}
        alt="CareerLink — Your link to career clarity"
        className={`h-9 w-auto select-none ${className}`}
        loading="eager"
        decoding="async"
      />
      {/* Optional accessible text (hidden visually) */}
      <span className="sr-only">CareerLink</span>
    </Link>
  );
}

import { Link } from "react-router-dom";

const CTAButton = ({ children, active, linkto, variant }) => {
  let buttonStyle = "bg-white text-black hover:bg-neutral-200 shadow-[0_4px_20px_rgba(255,255,255,0.15)]";

  if (variant === "white" || (active && !variant)) {
    buttonStyle = "bg-white text-gray-950 font-bold hover:bg-gray-100 shadow-[0_0_20px_rgba(255,255,255,0.2)]";
  } else if (variant === "amber") {
    buttonStyle = "bg-gradient-to-r from-white via-neutral-100 to-neutral-300 text-gray-950 font-bold hover:from-neutral-100 hover:to-neutral-400 shadow-[0_0_20px_rgba(255,255,255,0.2)]";
  } else if (variant === "dark" || (!active && !variant)) {
    buttonStyle = "bg-[#161618] border border-[#2a2a2e] text-gray-200 hover:border-gray-500 hover:bg-[#1f1f23]";
  }

  return (
    <Link to={linkto || "#"}>
      <div
        className={`rounded-full px-6 py-2.5 text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer inline-flex items-center justify-center gap-2 ${buttonStyle}`}
      >
        {children}
      </div>
    </Link>
  );
};

export default CTAButton;
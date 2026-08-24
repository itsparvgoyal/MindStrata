import { Link } from "react-router-dom";
import { HiOutlineHome } from "react-icons/hi";
import { IoArrowBackOutline } from "react-icons/io5";
import { BsLightbulb } from "react-icons/bs";
import errorImg from "../assets/images/error.png";

const Error = () => {
  return (
    <div className="min-h-screen bg-[#09090b] text-gray-100 overflow-hidden relative flex items-center justify-center">

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-gradient-to-tr from-indigo-600/10 via-emerald-500/10 to-purple-500/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="max-w-7xl mx-auto w-full px-6 py-12 relative z-10">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <div>

            <div className="flex items-center gap-2 mb-10">
               <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
                 MindStrata
               </span>
            </div>

            <h1 className="text-7xl sm:text-8xl font-black tracking-tight bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent leading-none">
              404
            </h1>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight">
              Page Not Found
            </h2>

            <p className="text-gray-400 text-base sm:text-lg mt-4 max-w-md leading-relaxed">
              The page you are looking for doesn't exist or has been moved to another location.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-8">

              <Link to="/">
                <button
                  className="
                    flex items-center gap-2
                    px-6 py-3
                    rounded-full
                    bg-white
                    text-gray-950
                    font-bold
                    text-sm
                    hover:bg-gray-100
                    shadow-[0_0_20px_rgba(255,255,255,0.2)]
                    transition-all
                    duration-200
                  "
                >
                  <HiOutlineHome size={18} />
                  Go to Home
                </button>
              </Link>

              <button
                onClick={() => window.history.back()}
                className="
                  flex items-center gap-2
                  px-6 py-3
                  rounded-full
                  bg-[#161618]
                  border
                  border-[#2a2a2e]
                  text-gray-200
                  font-semibold
                  text-sm
                  hover:border-gray-500
                  hover:bg-[#1f1f23]
                  transition-all
                  duration-200
                "
              >
                <IoArrowBackOutline size={18} />
                Go Back
              </button>
            </div>

            <div className="flex items-center gap-2.5 mt-8 text-xs sm:text-sm text-gray-500">
               <BsLightbulb className="text-white shrink-0" size={16} />
              <p>
                Need help?{" "}
                <Link to="/courses" className="text-indigo-400 hover:underline font-medium">
                  Explore Courses
                </Link>
              </p>
            </div>

          </div>

          <div className="flex justify-center">
            <div className="relative p-4 rounded-3xl bg-[#121217] border border-[#22222a] shadow-2xl overflow-hidden max-w-md w-full">
              <img
                src={errorImg}
                alt="404 Error"
                className="
                  w-full
                  h-auto
                  object-contain
                  rounded-2xl
                  opacity-90
                  hover:opacity-100
                  transition-opacity
                "
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Error;
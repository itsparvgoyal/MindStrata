import { BsCheckCircle } from "react-icons/bs";
import { buyCourse } from "../../services/operations/payment";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const PurchaseCard = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const course = useSelector((state) => state.rootReducer.allCourse?.course);
  const role = useSelector((state) => state.rootReducer.allCourse.role);
  const enrolledCoursesByUser = useSelector((state) => state.rootReducer.allCourse.enrolledCoursesByUser);

  const totalDuration = useSelector((state) => state.rootReducer.allCourse.duration);
  const [isDisabled, setIsDisabled] = useState(false);
  
  useEffect(() => {
    if(role === "Instructor"){
      setIsDisabled(true);
    }
    if(enrolledCoursesByUser?.includes(course?._id)){
      setIsDisabled(true);
    }
  }, [role , enrolledCoursesByUser , course])

  const user = useSelector((state) => state.rootReducer.auth.user)


  const handleBuyCourse = () => {
    const courseIDs = [course._id]
    buyCourse({ courseIDs, userDetails: user, navigate, dispatch });
  }

  return (
    <div className="lg:sticky lg:top-24 lg:-mt-28">

      <div className="bg-[#121217] border border-[#22222c] rounded-3xl p-6 shadow-2xl overflow-hidden">

        <div className="relative rounded-2xl overflow-hidden border border-[#242430] bg-[#181820]">
          <img
            src={course?.thumbnail}
            alt={course?.courseName}
            className="w-full h-52 object-cover"
          />
        </div>

        <div className="mt-6 flex items-baseline gap-3">
          <span className="text-3xl sm:text-4xl font-black text-white">
            ₹{course?.price}
          </span>

          <span className="text-gray-500 text-xl sm:text-2xl line-through">
            ₹{(course?.price * 1.5)}
          </span>
        </div>

        <h3 className="text-white font-bold text-lg mt-6 mb-4">
          This Course Includes:
        </h3>

        <div className="space-y-3.5 text-sm">

          <div className="flex items-center gap-3">
            <BsCheckCircle className="text-emerald-400 shrink-0" size={16} />
            <p className="text-gray-300">
              No Pre-requisite Required
            </p>
          </div>

          <div className="flex items-center gap-3">
            <BsCheckCircle className="text-indigo-400 shrink-0" size={16} />
            <p className="text-gray-300">
              {totalDuration} + of Content
            </p>
          </div>

          <div className="flex items-center gap-3">
            <BsCheckCircle className="text-cyan-400 shrink-0" size={16} />
            <p className="text-gray-300">
              Topic-wise quiz & project tasks
            </p>
          </div>

        </div>

        <button
          className={`w-full font-bold py-3.5 rounded-full mt-6 text-sm transition-all duration-200 ${
            isDisabled
              ? "bg-[#1a1a22] border border-[#2a2a34] text-gray-500 cursor-not-allowed"
              : "bg-white text-gray-950 hover:bg-gray-100 shadow-[0_0_20px_rgba(255,255,255,0.2)] cursor-pointer"
          }`}
          onClick={() => handleBuyCourse()}
          disabled={isDisabled}>
          {(role === 'Student' && isDisabled) ? "Enrolled" : (role !== 'Student' && isDisabled) ? "Not Eligible" : "Buy Now"}
        </button>

      </div>
    </div>
  );
};

export default PurchaseCard;
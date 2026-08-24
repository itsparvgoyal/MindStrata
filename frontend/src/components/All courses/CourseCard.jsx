import { FaClock } from "react-icons/fa";
import { PiStackSimpleBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import { VscTriangleRight } from "react-icons/vsc";
import { useState, useEffect } from "react";
import api from "../../services/service";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CourseCard = ({ course }) => {
  const [totalDuration, setTotalDuration] = useState(0);
  const user = useSelector((state) => state.rootReducer?.auth?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isDisableBtn, setIsDisableBtn] = useState(false);
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    if (user?.accountType === "Instructor") {
      setIsDisableBtn(true);
    }
    if (user?.courses?.includes(course?._id)) {
      setIsDisableBtn(true);
    }
  }, [user, inCart, user?.courses]);

  useEffect(() => {
    const getCourseDuration = async () => {
      try {
        const res = await api.get(`/course/getCourseDuration/${course._id}`);
        setTotalDuration(res.data.courseDuration);
      } catch (error) {
        console.log("error when getting course duration", error);
      }
    };
    getCourseDuration();
  }, []);

  const handleAddToCart = () => {
    dispatch(addToCart(course));
    setInCart(true);
  };

  return (
    <div className="w-full max-w-[350px] mx-auto bg-[#0f0f13] border border-[#1e1e26] rounded-2xl overflow-hidden flex flex-col justify-between min-h-[420px] shadow-xl">

      <div className="relative h-44 w-full overflow-hidden bg-[#14141a]">
        <img
          src={course.thumbnail}
          alt={course.courseName}
          className="h-full w-full object-cover"
        />
        {course.price && (
          <div className="absolute top-3 right-3 bg-[#0d2217] border border-emerald-500/40 text-emerald-400 font-extrabold text-xs px-3 py-1 rounded-full shadow-lg">
            ₹{course.price}
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        <div>
          <h2 className="text-white text-base font-extrabold leading-snug line-clamp-1">
            {course.courseName}
          </h2>

          <p className="text-gray-400 text-xs mt-1.5 font-medium">
            By {course.instructor?.firstName} {course.instructor?.lastName}
          </p>

          <div className="flex items-center gap-4 mt-3.5 text-xs font-semibold">
            <div className="flex items-center gap-1.5 text-gray-300">
              <PiStackSimpleBold size={15} className="text-indigo-400 shrink-0" />
              <span>{course.courseContent?.length || 0} Modules</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-300">
              <FaClock size={13} className="text-indigo-400 shrink-0" />
              <span>{totalDuration || "—"}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-3 border-t border-[#1e1e26]">
          <Link
            to={`/courseDetails/${course._id}`}
            className="flex justify-center items-center gap-1.5 bg-[#14141a] border border-[#262630] text-gray-300 hover:text-white py-2.5 px-4 rounded-xl text-xs font-bold transition-colors"
          >
            <VscTriangleRight size={14} className="text-indigo-400" />
            View Course Details
          </Link>

          <button
            className={`py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              inCart || isDisableBtn
                ? "bg-[#181820] border border-[#2a2a34] text-gray-500 cursor-not-allowed"
                : "bg-white text-gray-950 hover:bg-gray-100 shadow-[0_2px_10px_rgba(255,255,255,0.15)]"
            }`}
            onClick={handleAddToCart}
            disabled={inCart || isDisableBtn}
          >
            {inCart
              ? "In Cart ✓"
              : isDisableBtn
                ? user?.accountType === "Instructor"
                  ? "Not Eligible"
                  : "Enrolled"
                : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
import { Link } from "react-router-dom";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { IoLanguage } from "react-icons/io5";
import { Rating } from "react-simple-star-rating";
import { useState } from "react";
import { useSelector } from "react-redux";

const CourseDetailsHero = () => {
  const course = useSelector((state) => state?.rootReducer?.allCourse?.course);
  const [rating] = useState(4.3);

  const totalLectures = course?.courseContent?.reduce(
    (count, section) => count + section?.subsection.length,
    0
  );

  return (
    <div className="bg-[#0c0c0f] border-b border-[#1e1e26] text-white relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[400px] h-[250px] bg-gradient-to-tr from-indigo-600/10 via-emerald-500/10 to-amber-500/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="w-11/12 max-w-7xl mx-auto py-12 px-4 relative z-10">

        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-500 mb-6 font-medium">
          <Link to="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/courses" className="hover:text-white transition-colors">
            Courses
          </Link>
          <span>/</span>
          <span className="text-gray-300 truncate max-w-[240px]">
            {course?.courseName}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white max-w-4xl leading-tight tracking-tight">
          {course?.courseName || "Course Name"}
        </h1>

        <div className="flex flex-wrap items-center gap-6 mt-6">

          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <MdOutlineOndemandVideo size={18} className="text-indigo-400" />
            <span className="font-semibold text-white">{totalLectures}</span>
            <span>Lectures</span>
          </div>

          <div className="w-px h-4 bg-[#262630]" />

          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <IoLanguage size={18} className="text-emerald-400" />
            <span className="font-semibold text-white">Hindi / English</span>
          </div>

          <div className="w-px h-4 bg-[#262630]" />

          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-bold text-sm">{rating}</span>
            <div className="-translate-y-[2px]">
              <Rating
                readonly
                initialValue={rating}
                size={16}
                allowFraction
                iconsCount={5}
                SVGstyle={{ display: "inline-block" }}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CourseDetailsHero;
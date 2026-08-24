import { useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import Loader from "../common/Loader";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { useSelector } from "react-redux";


const CourseModules = () => {
   

  const courseContent = useSelector((state)=> state.rootReducer?.allCourse?.course?.courseContent);  
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (sectionId) => {
    setOpenSection(
      openSection === sectionId ? null : sectionId
    );
  };

  return (
    <div className="mt-12 w-full max-w-4xl mx-auto">
      <h2 className="text-3xl font-extrabold text-white">
        Comprehensive Course Modules
      </h2>

      <p className="text-gray-400 mt-2 mb-8 text-sm sm:text-base">
        Explore all sections and lectures included in this course.
      </p>

      <div className="bg-[#121217] border border-[#22222c] rounded-2xl overflow-hidden shadow-2xl">

        {courseContent?.map((section) => (
          <div
            key={section._id}
            className="border-b border-[#20202a] last:border-none"
          >
            <button
              onClick={() => toggleSection(section._id)}
              className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
            >
              <div>
                <p className="text-white text-base font-bold">
                  {section.sectionName}
                </p>

                <p className="text-gray-400 text-xs mt-1">
                   {section.subsection.length} Lectures
                </p>
              </div>

              <IoChevronDown
                className={`text-xl text-gray-400 transition-transform duration-300 ${
                  openSection === section._id
                    ? "rotate-180 text-indigo-400"
                    : ""
                }`}
              />
            </button>

            {openSection === section._id && (
              <div className="w-[96%] border border-[#20202a] mx-auto my-3 rounded-xl overflow-hidden bg-[#0d0d12]">
                {section.subsection.map((sub) => (
                  <div
                    key={sub._id}
                    className="px-6 py-3.5 border-t border-[#1e1e28] first:border-none flex justify-between items-center text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <MdOutlineOndemandVideo className="text-indigo-400 shrink-0" size={16} />
                      <p className="font-medium">
                        {sub.title}
                      </p>
                    </div>

                    {sub.timeDuration && (
                      <p className="text-xs text-gray-500 font-mono">
                        {sub.timeDuration}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

      </div>
    </div>
  );
};

export default CourseModules;
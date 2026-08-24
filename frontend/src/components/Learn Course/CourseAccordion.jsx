import { useEffect, useState } from "react";
import { ChevronDown, PlayCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa"; 

const CourseAccordion = ({ course = [] }) => {
  const [openSection, setOpenSection] = useState(null);
  const navigate = useNavigate();
  const {currSubSecId , currSectionId , completedLectures } = useSelector((state) => state.rootReducer.learn);

  useEffect(() => {
    setOpenSection(currSectionId);
  }, [currSectionId]);

  const toggleSection = (sectionId) => {
    setOpenSection((prev) =>
      prev === sectionId ? null : sectionId
    );
  };
  
  console.log(course)

  return (
    <div className="w-full text-white">
      {course?.courseContent.map((section) => {
        const isOpen = openSection === section._id;

        return (
          <div
            key={section._id}
            className="border-b border-[#22222a]"
          >
            <button
              onClick={() => toggleSection(section._id)}
              className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/5 transition-all duration-200 cursor-pointer"
            >
              <div className="text-left">
                <p className="font-semibold text-sm text-white">
                  {section.sectionName}
                </p>

                <p className="text-[11px] text-gray-400 mt-1 font-medium">
                  {section?.subsection?.length || 0} Lectures
                </p>
              </div>

              <ChevronDown
                size={16}
                className={`text-gray-400 transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-white" : ""
                }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                isOpen ? "h-auto py-1 bg-[#09090b]/50" : "max-h-0"
              }`}
            >
              {section?.subsection?.map((subSection) => {
                const isActive = currSubSecId === subSection._id;
                const isCompleted = completedLectures?.includes(subSection._id);

                return (
                  <div
                    key={subSection._id}
                    onClick={() => {
                      navigate(`/learnCourse/${course._id}/section/${section._id}/subsection/${subSection._id}`);
                    }}
                    className={`flex items-center gap-3 px-6 py-3 justify-between cursor-pointer border-l-2 transition-all duration-200 group
                      ${isActive 
                        ? "bg-indigo-500/10 text-indigo-300 border-indigo-500" 
                        : "text-gray-400 border-transparent hover:bg-white/5 hover:text-white"
                      }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <PlayCircle 
                        size={14} 
                        className={`shrink-0 transition-colors duration-200 ${
                          isActive 
                            ? "text-indigo-400" 
                            : "text-gray-500 group-hover:text-gray-300"
                        }`}
                      /> 

                      <div className="min-w-0">
                        <p className={`text-xs font-semibold truncate ${isActive ? "text-white" : ""}`}>
                          {subSection.title}
                        </p>

                        {subSection.timeDuration && (
                          <p className="text-[10px] text-gray-500 mt-0.5 font-medium">
                            {subSection.timeDuration}
                          </p>
                        )}
                      </div>
                    </div>

                    {isCompleted && (
                      <FaCheck className="text-emerald-400 shrink-0" size={12}/>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CourseAccordion;
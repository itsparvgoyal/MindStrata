import { HiUsers } from "react-icons/hi";
import { FaCodeBranch } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";

const CourseCard = ({
  heading,
  description,
  level,
  lessonNumber,
  currentCard,
  cardData,
  setCurrentCard,
}) => {
  const active = currentCard === cardData.heading;

  return (
    <div
      onClick={() => setCurrentCard(cardData.heading)}
      className={`w-full md:w-[320px] lg:w-[340px] cursor-pointer rounded-2xl border p-6 flex flex-col justify-between transition-colors
      ${
        active
          ? "bg-[#14141a] border-white/25 text-white"
          : "bg-[#0f0f13] border-[#1e1e26] text-gray-400 hover:bg-[#121217]"
      }`}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <h3 className="text-base font-bold text-white tracking-tight">
            {heading}
          </h3>
          {active && (
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-white/10 text-white border border-white/15 flex items-center gap-1 shrink-0">
              Active <FiChevronRight size={12} />
            </span>
          )}
        </div>

        <p className="text-xs text-gray-400 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mt-6 pt-3.5 border-t border-[#1e1e26] flex justify-between items-center text-xs text-gray-400">
        <div className="flex items-center gap-1.5">
          <HiUsers size={14} className="text-gray-400" />
          <span>{level}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <FaCodeBranch size={13} className="text-gray-400" />
          <span>{lessonNumber} Lessons</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
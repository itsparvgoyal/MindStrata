import { MdOutlineVideoLibrary, MdOutlineCalendarToday} from "react-icons/md";
import { PiExamBold } from "react-icons/pi";
import { useSelector } from "react-redux";

const AboutCourse = () => {
  const course = useSelector((state) => state.rootReducer?.allCourse?.course);
  const totalLectures = course?.courseContent?.reduce(
    (count, section) => count + (section?.subsection?.length || 0),
    0
  );

  return (
    <div className="py-2">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
        About this course
      </h2>

      <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-4xl mb-6">
        {course?.courseDescription}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 bg-[#0f0f13] border border-[#1e1e26] p-5 sm:p-6 rounded-2xl">
        <FeatureCard
          icon={<MdOutlineVideoLibrary size={20} />}
          text="Mode of Course: Recorded & Interactive"
        />

        <FeatureCard
          icon={<PiExamBold size={20} />}
          text={`Total Lectures: ${totalLectures || 0}`}
        />

        <FeatureCard
          icon={<MdOutlineCalendarToday size={20} />}
          text="Course Validity: 1.5 Years Access"
        />

        <FeatureCard
          icon={<MdOutlineVideoLibrary size={20} />}
          text="Class Recordings: Included"
        />
      </div>
    </div>
  );
};

export default AboutCourse;

const FeatureCard = ({ icon, text }) => {
  return (
    <div className="bg-[#14141a] border border-[#22222a] rounded-xl p-4 flex items-center gap-3.5">
      <div className="h-10 w-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-200 shrink-0">
        {icon}
      </div>
      <p className="text-gray-200 text-sm font-medium">{text}</p>
    </div>
  );
};
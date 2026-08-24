import { CalendarDays } from "lucide-react";
import { data, useNavigate } from "react-router-dom";
import api from "../../services/service";
import { useEffect , useState } from "react";


const EnrolledCourseCard = ({ course }) => {
  const [completedLectures , setCompletedLectures] = useState([]); 
  const [totalLectures , setTotalLectures] = useState(0);

  const navigate = useNavigate(); 
  
  const fetchProgress = async () => {

     try {
      // get req me kabhi data nhi jata body me 
      // param me bhejo 
        const response = await api.get(`/courseProgress/getCourseProgress/${course?._id}`);
        if(response?.data?.success){
          if(response?.data?.data?.completedLectures?.length > 0){
            setCompletedLectures(response?.data?.data?.completedLectures?.length);
          }
        }
     } catch (error) {
        console.log("Error fetching enrolled courses progress : " , error);
     }
    
  }

  useEffect(() => {
    fetchProgress();
     const totalLectures = course?.courseContent?.reduce(
      (total, section) => total + (section?.subsection?.length || 0),
      0
     );
    setTotalLectures(totalLectures);
  }, [])
  

  const getValidityDate = (date) => {
    const validity = new Date(date);
    validity.setMonth(validity.getMonth() + 18);

    return validity.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
  };  

  const completedCount = typeof completedLectures === 'number' ? completedLectures : (Array.isArray(completedLectures) ? completedLectures.length : 0);
  const progressPercentage = totalLectures > 0 ? Math.round((completedCount / totalLectures) * 100) : 0;

  return (
    <div className="bg-[#121217] rounded-2xl overflow-hidden border border-[#22222a] shadow-md flex flex-col justify-between">
      
      <div className="relative overflow-hidden w-full h-48">
        <img
          src={course?.thumbnail}
          alt={course?.courseName}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-white line-clamp-2 tracking-tight">
            {course?.courseName}
          </h3>

          <p className="text-sm text-gray-400 mt-1.5 font-medium">
            By {course?.instructorName || "Instructor"}
          </p>
        </div>

        <div className="mt-6">
          <div className="flex justify-between items-center text-xs font-semibold mb-2">
            <span className="text-gray-400">Progress</span>
            <span className="text-indigo-400 font-mono">{progressPercentage}%</span>
          </div>
          <div className="w-full h-2 bg-[#1c1c24] rounded-full overflow-hidden border border-[#22222a]">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 mt-6 pt-4 border-t border-[#20202a]">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <CalendarDays size={14} className="text-indigo-400" />
            <span>Valid till: {getValidityDate(course?.createdAt)}</span>
          </div>

          <button
            onClick={() => navigate(`/learnCourse/${course._id}`)}
            className="bg-white text-gray-950 font-bold px-4 py-2 rounded-full text-xs hover:bg-gray-100 hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-all duration-200 cursor-pointer"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnrolledCourseCard;
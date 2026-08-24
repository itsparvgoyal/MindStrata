import CourseAccordion from './CourseAccordion';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AiOutlineArrowLeft } from "react-icons/ai";
import { X } from "lucide-react";

const CourseSidebar = ({course, setIsSidebarOpen}) => {

  const {completedLectures , totalLectures} = useSelector((state) => state.rootReducer.learn);
  const navigate = useNavigate();
  
  return (
    <div className='h-full w-full flex flex-col justify-between bg-[#0c0c0f] select-none'>
        <div>
          <div className='border-b border-[#22222a] p-5'>
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-bold tracking-tight text-white">Course Content</h1>
              {setIsSidebarOpen && (
                <button 
                  onClick={() => setIsSidebarOpen(false)}
                  className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              )}
            </div>
            <div className='flex flex-wrap gap-2 mt-3'>
              <span className='text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/15'>
                Lectures: {totalLectures}
              </span>
              <span className='text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/15'>
                Completed: {completedLectures.length}/{totalLectures}
              </span>
            </div>
          </div>
          <div className='w-full'>
            <CourseAccordion course={course} />
          </div>
        </div>

        <div className='p-4 border-t border-[#22222a] bg-[#09090b]'>
          <button 
            onClick={() => navigate(`/dashboard/enrolledCourses`)} 
            className='w-full font-bold flex justify-center items-center gap-2 py-2.5 rounded-full text-xs text-gray-400 hover:text-white hover:bg-white/5 border border-[#2a2a34] transition-all duration-200 cursor-pointer hover:border-indigo-500/40'
          >
            <AiOutlineArrowLeft size={14} />
            Back to Dashboard
          </button>
        </div>
    </div>
  )
}

export default CourseSidebar
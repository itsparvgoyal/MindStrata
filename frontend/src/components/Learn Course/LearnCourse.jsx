import { useEffect, useState } from "react";
import CourseSidebar from "./CourseSidebar";
import VideoSection from "./VideoSection";
import { useDispatch, useSelector } from "react-redux";
import { setCompletedLectures, setCourseEnrolledData , setCourseSectionData, setTotalLectures , setCurrSubSecId , setCurrSectionId} from "../../redux/slices/LearnCourseSlice";
import api from "../../services/service";
import { useParams, useLocation, useOutlet } from "react-router-dom";
import Loader from "../common/Loader";
import { Menu, X } from "lucide-react";

const LearnCourse = () => {
  const {courseID} = useParams();
  const dispatch = useDispatch();
  const [course , setCourse] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const path = useLocation().pathname;
  const outlet = useOutlet();


  const fetchCourseData = async () => {
    try{
      const result = await api.get(`/course/getCourseDetails/${courseID}`);
      if(result.data.success){
        setCourse(result.data.course);
        dispatch(setCourseEnrolledData(result.data.course));
        dispatch(setCourseSectionData(result.data.course.courseContent));
        const totalVideos = result?.data?.course?.courseContent?.reduce(
          (acc, section) => acc + section?.subsection?.length,
          0
        );
        dispatch(setTotalLectures(totalVideos));
      }
    }catch(error){
      console.log("Error fetching course data:", error);
    }
  };

  const fetchCourseProgress = async () => {
    try{
      const result = await api.get(`/profile/getUserDetails`);
      const Courseprogress = result?.data?.user?.courseProgress?.filter((item) => item?.courseID === courseID);
      const completedVideos = Courseprogress?.length ? Courseprogress[0].completedLectures : [];

      if(result.data.success){
        dispatch(setCompletedLectures(completedVideos));
      }
      }catch(error){
       console.log("Error fetching course progress:", error);
     }
  };

  useEffect(() => {
    fetchCourseData();
    fetchCourseProgress();
    dispatch(setCurrSubSecId(null));
    dispatch(setCurrSectionId(null));
  }, [courseID , path]);

  // Close sidebar on route path change (mobile menu auto-close)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [path]);

  if(!course){
    return (
      <Loader/>
    )
  }

  return (
    <div className="h-[calc(100vh-64px)] flex text-white overflow-hidden w-full bg-[#09090b] relative">
      
      <div 
        className={`fixed top-16 bottom-0 left-0 z-40 w-72 sm:w-80 bg-[#0c0c0f] border-r border-[#22222a] transform transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto lg:w-80 lg:shrink-0
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto">
            <CourseSidebar course={course} setIsSidebarOpen={setIsSidebarOpen}/>
          </div>
        </div>
      </div>

      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="fixed top-16 inset-x-0 bottom-0 z-35 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity duration-300"
        />
      )}

      <div className="flex-1 flex flex-col h-full bg-[#09090b] overflow-y-auto p-4 sm:p-6 lg:p-8 relative">
        
        <div className="flex lg:hidden items-center justify-between mb-4 bg-[#121217] border border-[#22222a] p-3 rounded-xl">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
          >
            <Menu size={18} />
            <span>Course Outline</span>
          </button>
          <span className="text-[10px] text-gray-500 font-mono">MindStrata Player</span>
        </div>

        <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col justify-center">
          {
            outlet ? 
            <VideoSection/> : 
            (
              <div className="text-center flex flex-col items-center justify-center py-20 bg-[#121217] border border-[#22222a] rounded-2xl p-8 shadow-xl">
                <p className="text-xl font-bold text-gray-200 mb-2">No lecture is selected</p>
                <p className="text-sm text-gray-400 max-w-sm">
                  Choose a chapter and lecture from the outline sidebar to begin your journey.
                </p>
              </div>
            )
          }
        </div>
      </div>

    </div>
  );
};

export default LearnCourse;
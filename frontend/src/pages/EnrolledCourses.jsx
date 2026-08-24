import { useEffect, useState } from "react";
import api from "../services/service";
import EnrolledCourseCard from "../components/Enrolled Courses/EnrolledCourseCard";
import Loader from "../components/common/Loader";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

const EnrolledCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEnrolledCourses = async () => {
    try {
      setLoading(true);

      const response = await api.get(
        "/course/getEnrolledCourses",
      );
      // console.log(response)
      setCourses(response.data.enrolledCourses);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  if (loading) {
    return (
      <Loader/>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-8">
        My Learning
      </h1>

      {courses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-[#121217] border border-[#22222a] rounded-2xl p-8 max-w-md mx-auto shadow-xl">
          <div className="w-12 h-12 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
            <BookOpen size={24} />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">No Enrolled Courses</h3>
          <p className="text-gray-400 text-sm max-w-xs mb-6 leading-relaxed">
            You haven't enrolled in any courses yet. Start exploring our premium developer tracks now!
          </p>
          <Link
            to="/courses"
            className="bg-white text-gray-950 font-bold px-6 py-2.5 rounded-full text-xs hover:bg-gray-100 hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-all duration-200"
          >
            Explore Courses
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {courses.map((course) => (
            <EnrolledCourseCard
              key={course._id}
              course={course}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
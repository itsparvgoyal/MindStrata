import { useEffect, useState } from "react";
import api from "../services/service";
import Loader from "../components/common/Loader";
import CourseCard from "../components/All courses/CourseCard";

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await api.get("/course/getAllCourses");
      if (response.data.success) {
        setCourses(response.data.courses);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090909]">
      <div className="w-11/12 max-w-7xl mx-auto py-14 px-4">

        {/* Header */}
        <div className="mb-12">
          <p className="text-xs text-[#555555] uppercase tracking-widest font-semibold mb-3">
            Browse All
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Explore Courses
          </h1>
          <p className="text-[#666666] mt-3 text-base">
            {courses.length > 0 ? `${courses.length} courses available` : ""}
          </p>
          <div className="mt-6 h-px bg-[#1a1a1a]" />
        </div>

        {courses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <p className="text-5xl">📭</p>
            <p className="text-[#555555] text-lg">No courses available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {courses.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCourses;
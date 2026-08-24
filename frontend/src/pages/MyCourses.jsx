import { useEffect, useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import api from "../services/service"
import { useSelector } from "react-redux";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import Loader from "../components/common/Loader";
import { toast } from "react-hot-toast";
import ConfirmModal from "../components/common/ConfirmModal";
import { FaBook } from "react-icons/fa6";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.rootReducer.auth.user);
  const [modalData, setModalData] = useState(null);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const data = {
        user
      }
      const response = await api.get("/profile/getUserDetails", data);
      setCourses(response.data.user.courses)

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
      <Loader/>
    );
  }

  const handleDelete = (courseId) => {
    setModalData({
        text1: "Are you sure you want to delete this course?",
        text2: "This action cannot be undone.",
        btn1Text: "Delete",
        btn2Text: "Cancel",
        btn1Handler: () => handleCourseDelete(courseId),
        btn2Handler: () => setModalData(null),
    });
  }

  const handleCourseDelete = async (courseId) => {
    try {  
      setLoading(true);
      const response = await api.delete(`/course/deleteCourse/${courseId}`);
      if(response.data.success){
        toast.success("Course deleted successfully");
        setModalData(null);
      }
      fetchCourses();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setModalData(null);

    }
  };

  return (
    <div className="text-white py-6 sm:py-10 px-0 sm:px-4">
      
      <div className="flex justify-between items-center mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            My Courses
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Manage your created courses, track their status, and edit curriculum details.
          </p>
        </div>

        <Link 
          to="/dashboard/addCourse" 
          className="bg-white text-gray-950 font-bold px-5 py-2.5 rounded-full text-xs hover:bg-gray-100 hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-all duration-200 cursor-pointer"
        >
          Add Course +
        </Link>
      </div>

      {courses?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-[#121217] border border-[#22222a] rounded-2xl p-8 max-w-md mx-auto shadow-xl">
          <div className="w-12 h-12 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
            <FaBook size={20} className="text-indigo-400" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">No Courses Created</h3>
          <p className="text-gray-400 text-sm max-w-xs mb-6 leading-relaxed">
            You haven't created any courses yet. Get started by creating your first premium course now!
          </p>
          <Link
            to="/dashboard/addCourse"
            className="bg-white text-gray-950 font-bold px-6 py-2.5 rounded-full text-xs hover:bg-gray-100 hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-all duration-200 cursor-pointer"
          >
            Create A Course
          </Link>
        </div>
      ) : (
        <div className="bg-[#121217] border border-[#22222a] rounded-2xl overflow-hidden shadow-xl">
          <Table>
            <Thead>
              <Tr className="border-b border-[#22222a] bg-[#0c0c0f]/40">
                <Th className="text-left text-[10px] font-bold text-gray-500 uppercase tracking-widest p-4">COURSES</Th>
                <Th className="text-left text-[10px] font-bold text-gray-500 uppercase tracking-widest p-4">CATEGORY</Th>
                <Th className="text-left text-[10px] font-bold text-gray-500 uppercase tracking-widest p-4">PRICE</Th>
                <Th className="text-left text-[10px] font-bold text-gray-500 uppercase tracking-widest p-4">ACTIONS</Th>
              </Tr>
            </Thead>

            <Tbody>
              {courses?.map((course) => (
                <Tr
                  key={course._id}
                  className="border-b border-[#202028] last:border-b-0 hover:bg-white/1 transition-all duration-200"
                >
                  <Td className="p-5 align-middle">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <img
                        src={course.thumbnail}
                        alt=""
                        className="w-40 h-24 rounded-xl object-cover border border-[#22222a] shrink-0"
                      />

                      <div className="min-w-0">
                        <h2 className="font-bold text-base text-white tracking-tight truncate">
                          {course.courseName}
                        </h2>

                        <p className="text-gray-400 text-xs mt-1 leading-relaxed max-w-sm line-clamp-2">
                          {course.courseDescription}
                        </p>

                        <p className="text-gray-500 text-[10px] mt-2 font-mono">
                          Created: {new Date(course.createdAt).toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" })}
                        </p>

                        <span
                          className={`inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                            course.status === "Published"
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/25"
                              : "bg-pink-500/10 text-pink-400 border-pink-500/25"
                          }`}
                        >
                          {course.status}
                        </span>
                      </div>
                    </div>
                  </Td>

                  <Td className="p-5 align-middle">
                    <span className="text-xs text-gray-300 font-semibold bg-[#16161a]/60 px-3 py-1 rounded-full border border-[#242430]">
                      {course.category.name || "General"}
                    </span>
                  </Td>

                  <Td className="p-5 align-middle font-mono text-sm font-bold text-indigo-400">
                    ₹{course.price}
                  </Td>

                  <Td className="p-5 align-middle">
                    <div className="flex gap-2">
                      <Link 
                        className="text-gray-400 hover:text-white bg-[#181820] hover:bg-[#20202a] border border-[#2a2a34] hover:border-gray-500 p-2.5 rounded-xl transition-all duration-200 flex items-center justify-center cursor-pointer" 
                        to={`/dashboard/editCourse/${course._id}`}
                        title="Edit Course"
                      >
                        <FiEdit2 size={16}/>
                      </Link>

                      <button 
                        className="text-gray-400 hover:text-red-400 bg-[#181820] hover:bg-red-500/10 border border-[#2a2a34] hover:border-red-500/25 p-2.5 rounded-xl transition-all duration-200 flex items-center justify-center cursor-pointer" 
                        onClick={() => handleDelete(course._id)}
                        title="Delete Course"
                      >
                        <FiTrash2 size={16}/>
                      </button>
                    </div>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </div>
      )}

      {modalData && <ConfirmModal modalData={modalData}/>}
    </div>
  );

};

export default MyCourses;
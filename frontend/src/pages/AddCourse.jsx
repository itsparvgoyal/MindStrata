import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetCourseState } from "../redux/slices/courseSlice";
import { resetSectionState } from "../redux/slices/sectionSlice";
import HightlightText from "../components/common/HightlightText";
import CourseBuilder from "../components/course/CourseBuilder";


const AddCourse = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetCourseState());
    dispatch(resetSectionState());
  }, [dispatch]);

  return (
    <div className="text-white flex flex-col items-center py-6 sm:py-10 px-0 sm:px-4">
      <div className="w-full max-w-3xl">
        <h1 className="mb-10 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold">
          <HightlightText text="Add Course" />
        </h1>
        <CourseBuilder />
      </div>

    </div>
  )
}

export default AddCourse
import {useParams} from "react-router-dom"
import CourseBuilder from "../components/course/CourseBuilder"
import { useEffect, useState } from "react";
import api from "../services/service";
import { useDispatch } from "react-redux";
import { setCourse, setEditCourse } from "../redux/slices/courseSlice";
import { setSection } from "../redux/slices/sectionSlice";
import HightlightText from "../components/common/HightlightText";

const EditCourse = () => {

  const courseId = useParams().courseID;
  const [courseDetails, setCourseDetails] = useState(null);
  const dispatch = useDispatch();

  const fetchCourseDetails = async () => {
    try{
      const response = await api.get(`/course/getCourseDetails/${courseId}`);
      if(response.data.success){
        dispatch(setCourse(response.data.course));
        dispatch(setSection(response.data.course.courseContent));
        dispatch(setEditCourse(true));
      }

    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    fetchCourseDetails();
  }, []);


  
  return (
    <div className="text-white py-6 sm:py-10 px-0 sm:px-4">
        <h1 className="mb-10 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold">
          <HightlightText text="Edit Course" />
        </h1>
        <CourseBuilder/>
    </div>
  )
}

export default EditCourse;
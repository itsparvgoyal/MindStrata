import CourseDetailsHero from './CourseDetailsHero'
import api from '../../services/service';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AboutCourse from './AboutCourse'
import PurchaseCard from './PurchaseCard'
import CourseModules from './CourseModules';
import Accordion from './Accordion';
import faqData from "../../data/faqData";
import { useSelector, useDispatch } from 'react-redux';
import {setCourse , setDuration , setRole , setEnrolledCourses} from "../../redux/slices/AllCourseSlice"
import Mentor from '../common/Mentor';


const CourseDetails = () => {
    const dispatch = useDispatch();
    const {courseID} = useParams();
    const {user} = useSelector((state) => state.rootReducer.auth);


    const getCourseDuration = async () => {
      try {
        const res = await api.get(`/course/getCourseDuration/${courseID}`);
        dispatch(setDuration(res.data.courseDuration));
      }
      catch (error) {
        console.log("error when getting course duration", error);
      }
    }

    const fetchCourseDetails = async () => {
        try {
            const response = await api.get(`/course/getCourseDetails/${courseID}`);
            if(response.data.success){
              dispatch(setCourse(response.data.course));
            }
        } catch (error) {
            console.log("error in fetching course details", error);
        }
    }

    useEffect(()=>{
        dispatch(setRole(user?.accountType));
        dispatch(setEnrolledCourses(user?.courses));
        fetchCourseDetails();
        getCourseDuration();
    }, [courseID])
    
 
  return (
    <div className="bg-[#09090b] text-gray-100 min-h-screen">
        <CourseDetailsHero/>   
       <div className="w-full max-w-7xl mx-auto flex justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className="w-full flex flex-col lg:flex-row gap-12 relative py-8">

            <div className="flex-1">
            <AboutCourse/>
            </div>

            <div className="lg:w-[400px] shrink-0">
            <PurchaseCard/>
            </div>

        </div>
       </div>
       
       <div className="border-t border-[#1e1e26] my-8" />
        
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CourseModules/>
        </div>
        
        <div className="mt-16">
            <Mentor/>
        </div>

        <div className="mt-20 mb-16 px-4">
          <h2 className="text-center text-3xl sm:text-4xl font-extrabold text-white">
              Frequently Asked Questions
          </h2>

          <p className="text-center text-gray-400 mt-3 text-sm sm:text-base">
              Have a question that is not answered? Contact us at <span className="text-indigo-400 font-medium">support.mindstrata@gmail.com</span>
          </p>

          <div className="mt-10 flex justify-center">
              <Accordion items={faqData} />
          </div>
        </div>
    </div>
  )
}

export default CourseDetails

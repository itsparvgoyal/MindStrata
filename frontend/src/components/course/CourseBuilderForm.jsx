import { useDispatch } from "react-redux";
import { setStep } from "../../redux/slices/courseSlice";
import { useForm } from "react-hook-form";
import api from "../../services/service";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import {addSection} from "../../redux/slices/sectionSlice";
import NestedView from "./NestedView";
import {updateSection} from "../../redux/slices/sectionSlice";
import { useState } from "react";
import {FaPlusCircle , FaSave} from "react-icons/fa"

const CourseBuilder = () => {
  const dispatch = useDispatch();

  const {register , reset, handleSubmit ,setValue , formState: {errors}} = useForm();
  const {course} = useSelector((state) => state.rootReducer.course);
  const {section} = useSelector((state)=> state.rootReducer.section);

  const [isUpdating , setIsUpdating] = useState(false);
  const [editingSectionId, setEditingSectionId] = useState(null);

  const submitHandler = async (data) => {
  // console.log("sections ", section);
    
    const reqData = {
      ...data,
      courseId: course._id
    }
    

    if(!isUpdating){

      try {
        const response = await api.post(
          `/course/createSection`,
          reqData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          reset();
          dispatch(addSection(response.data.section));
          toast.success("Section Added");
          dispatch(setStep(2));
        }
      } catch (error) {
        console.log(error);
        toast.error("Section update failed");
      }

    }else{
        const reqData = {
          sectionId: editingSectionId,
          sectionName: data.sectionName,
        };

        const currSection = section.find((s) => s._id === editingSectionId);

        if(data.sectionName === currSection.sectionName) {
            toast.error("No change");
            reset();
            setIsUpdating(false);
            setEditingSectionId(null);
            return;
        }

        try {
          const response = await api.put(
            "/course/updateSection",
            reqData
          );

          if(response.status === 200){
            dispatch(updateSection({
                sectionId: editingSectionId,
                sectionName: data.sectionName
            }));
            reset();
            setIsUpdating(false);
            setEditingSectionId(null);
            toast.success("Section Updated");
          }

        }
        catch(error){
          console.log(error);
          toast.error("Section update failed");
        }
    }

  }

  return (
    <div className="flex flex-col gap-6">
        
        <form 
          onSubmit={handleSubmit(submitHandler)}
          className="bg-[#121217] border border-[#22222a] p-8 rounded-2xl shadow-xl"
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs text-gray-300 font-semibold uppercase tracking-wider">
                Section Name <span className="text-red-500">*</span>
              </label>  
              <input 
                className="w-full px-4 py-3 rounded-xl bg-[#16161a] border border-[#242430] text-white text-sm outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-colors" 
                type="text" 
                placeholder="Enter section name" 
                {...register("sectionName", {required: "Section name is required"})} 
              />
              {errors.sectionName && <p className="text-xs text-red-500 font-medium">{errors.sectionName.message}</p>}
            </div>

            <div className="flex gap-3">
              <button 
                className="bg-white hover:bg-gray-100 text-gray-950 font-bold py-2.5 px-5 rounded-xl hover:scale-[1.01] active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-all duration-200 cursor-pointer text-xs flex items-center justify-center" 
                type="submit" 
              >
                {
                  isUpdating ? 
                  <div className="flex items-center gap-2">
                    <span>Save Changes</span>
                     <FaSave size={14}/>
                  </div> 
                  :
                  <div className="flex items-center gap-2">
                    <span>Add Section</span>
                    <FaPlusCircle size={14} />
                  </div>
                } 
              </button>

              {isUpdating && (
                <button 
                  type="button"
                  className="bg-[#16161a] border border-[#242430] hover:border-gray-500 text-gray-200 font-semibold py-2.5 px-5 rounded-xl transition-all duration-200 cursor-pointer text-xs" 
                  onClick={()=>{
                    setIsUpdating(false);
                    setEditingSectionId(null);
                    reset();
                  }}
                >
                   Cancel
                </button>
              )} 
            </div> 
          </div>
        </form>
        
        {
          section.length > 0 && (
            <NestedView setIsUpdating={setIsUpdating} setEditingSectionId={setEditingSectionId} setValue={setValue}/>
          )
        }

        <div className="flex gap-4 justify-end pt-4">
          <button 
            className="bg-[#16161a] border border-[#242430] hover:border-gray-500 text-gray-200 font-semibold py-2.5 px-6 rounded-xl transition-all duration-200 cursor-pointer text-sm" 
            onClick={() => {
              dispatch(setStep(1));
            }}
          >
            Back
          </button>
          
          <button 
            className="bg-white hover:bg-gray-100 text-gray-950 font-bold py-2.5 px-6 rounded-xl hover:scale-[1.01] active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-all duration-200 cursor-pointer text-sm" 
            onClick={() => {
              dispatch(setStep(3));
            }}
          >
            Next Step
          </button>
        </div>

    </div>
  );
};

export default CourseBuilder;
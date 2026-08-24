import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../services/service";
import { useDispatch } from "react-redux";
import { setLoading, setStep } from "../../redux/slices/courseSlice";
import Loader from "../common/Loader";
import { resetCourseState } from "../../redux/slices/courseSlice";
import { resetSectionState } from "../../redux/slices/sectionSlice";

const Publish = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { course } = useSelector(
    (state) => state.rootReducer.course
  );

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      status: course?.status || "Draft",
    },
  });

  const submitHandler = async (data) => {
     dispatch(setLoading(true));
    try {
     const response =  await api.put(`/course/updateCourse/${course._id}`, 
      {
        status: data.status,
      } ,   
      {
        headers:{
          "Content-Type": "application/json",
        }
      }
      );

      if(response.status === 200){
        dispatch(setLoading(false));
        toast.success("Course status updated");
        navigate('/dashboard/profile' , {replace : true});
        dispatch(resetCourseState());
        dispatch(resetSectionState());
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update status");
      dispatch(setLoading(false));
    }
  };

  const isLoading = useSelector((state) => state.rootReducer.course.loading);

  return (
    isLoading ? (
      <Loader/>
    ) : (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="bg-[#121217] border border-[#22222a] p-8 rounded-2xl shadow-xl space-y-6"
    >
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-white">
          Publish Course
        </h2>
        <p className="text-xs text-gray-400 mt-1 leading-relaxed">
          Finalize your course status. Saving as a draft hides it from the marketplace, while publishing makes it live instantly.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs text-gray-300 font-semibold uppercase tracking-wider block">
          Course Status
        </label>

        <select
          {...register("status")}
          className="w-full px-4 py-3 rounded-xl bg-[#16161a] border border-[#242430] text-white text-sm outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-colors cursor-pointer"
        >
          <option value="Draft" className="bg-[#121217] text-white">Save as Draft</option>
          <option value="Published" className="bg-[#121217] text-white">Publish live</option>
        </select>
      </div>

      <div className="flex gap-4 justify-end pt-4">
        <button
          type="button"
          onClick={() => dispatch(setStep(2))}
          className="bg-[#16161a] border border-[#242430] hover:border-gray-500 text-gray-200 font-semibold py-2.5 px-6 rounded-xl transition-all duration-200 cursor-pointer text-sm"
        >
          Back
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-white hover:bg-gray-100 text-gray-950 font-bold py-2.5 px-6 rounded-xl hover:scale-[1.01] active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-all duration-200 cursor-pointer text-sm disabled:opacity-40"
        >
          {isSubmitting ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </form>
    )

  );
};

export default Publish;
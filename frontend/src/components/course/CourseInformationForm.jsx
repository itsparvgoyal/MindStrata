import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import api from "../../services/service";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { setCourse, setStep , setEditCourse , setLoading} from "../../redux/slices/courseSlice";
import Loader from "../common/Loader";

const CourseInformationForm = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState([]);

  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const {course} = useSelector((state)=> state.rootReducer.course);
  const editCourse = useSelector((state)=> state.rootReducer.course.editCourse);

  async function fetchCategories() {
    try {
      const response = await api.get("/course/getAllCategories");
      setCategory(response.data.categories);
    } catch (error) {
      console.log(error);
    }
  }

  
  useEffect(() => {
    if(editCourse){
      dispatch(setLoading(true));
      setValue("courseName", course.courseName);
      setValue("courseDescription", course.courseDescription);
      setValue("price", course.price);
      setValue("whatYouWillLearn", course.whatYouWillLearn);
      setValue("tag", course.tag);
      setThumbnailPreview(course.thumbnail);
      dispatch(setLoading(false));
    }
  }, [editCourse]);

  useEffect(() => {
    fetchCategories();
  }, []);
  

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues:{
      courseName : "",
      courseDescription : "",
      price : 0,
      category : "",
      whatYouWillLearn : "",
      tag : "",
      thumbnail : ""
    }
  });

  const isLoading = useSelector((state)=> state.rootReducer.course.loading);

  const submitHandler = async (data) => {

    dispatch(setLoading(true));

    const formData = new FormData();

    formData.append("courseName", data.courseName);
    formData.append("courseDescription", data.courseDescription);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("whatYouWillLearn", data.whatYouWillLearn);
    formData.append("tag", data.tag);
    if(data.thumbnail){
      formData.append("thumbnail", data.thumbnail[0]);
    }

    if(editCourse){
      try {
        const response = await api.put(
          `/course/updateCourse/${course._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          reset();
          toast.success("Course edited successfully");
          dispatch(setCourse(response.data.course));
          dispatch(setStep(2));
          dispatch(setLoading(false));
        }
      } catch (error) {
        console.log(error);
        toast.error("Course editing failed");
        dispatch(setLoading(false));
      }
    }else{
      try {
        const response = await api.post(
          "/course/createCourse",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          reset();
          toast.success("Course created successfully");
          dispatch(setCourse(response.data.course));
          dispatch(setStep(2));
          dispatch(setLoading(false));
        }
      } catch (error) {
        console.log(error);
        toast.error("Course creation failed");
        dispatch(setLoading(false));
      }
    }


  };

  useEffect(() => {
    if(course){
      setValue("courseName", course.courseName);
      setValue("courseDescription", course.courseDescription);
      setValue("price", course.price);
      setValue("whatYouWillLearn", course.whatYouWillLearn);
      setValue("tag", course.tag);

      setThumbnailPreview(course.thumbnail);

      dispatch(setEditCourse(true));
    }
  }, [course]);


  return (
    isLoading ? (
      <Loader/>
    ) : (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="space-y-6 rounded-2xl border border-[#22222a] bg-[#121217] p-8 shadow-xl"
    >
      <div className="flex flex-col gap-2">
        <label className="text-xs text-gray-300 font-semibold uppercase tracking-wider">
          Course Title <span className="text-red-500">*</span>
        </label>

        <input
          type="text"
          placeholder="Enter course name"
          {...register("courseName", {
            required: "Course name is required",
          })}
          className="w-full px-4 py-3 rounded-xl bg-[#16161a] border border-[#242430] text-white text-sm outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-colors"
        />

        {errors.courseName && (
          <p className="text-xs text-red-500 font-medium">
            {errors.courseName.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs text-gray-300 font-semibold uppercase tracking-wider">
          Course Description <span className="text-red-500">*</span>
        </label>

        <textarea
          placeholder="Write a detailed description of your course"
          {...register("courseDescription", {
            required: "Course description is required",
          })}
          className="min-h-[140px] w-full px-4 py-3 rounded-xl bg-[#16161a] border border-[#242430] text-white text-sm outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-colors resize-y"
        />

        {errors.courseDescription && (
          <p className="text-xs text-red-500 font-medium">
            {errors.courseDescription.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs text-gray-300 font-semibold uppercase tracking-wider">
          Price (₹) <span className="text-red-500">*</span>
        </label>

        <input
          type="number"
          placeholder="Enter course price"
          {...register("price", {
            required: "Price is required",
            min: {
              value: 1,
              message: "Price must be greater than 0",
            },
          })}
          className="w-full px-4 py-3 rounded-xl bg-[#16161a] border border-[#242430] text-white text-sm outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-colors"
        />

        {errors.price && (
          <p className="text-xs text-red-500 font-medium">
            {errors.price.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs text-gray-300 font-semibold uppercase tracking-wider">
          Category <span className="text-red-500">*</span>
        </label>

        <select
          {...register("category", {
            required: "Please select a category",
          })}
          className="w-full px-4 py-3 rounded-xl bg-[#16161a] border border-[#242430] text-white text-sm outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-colors cursor-pointer"
        >
          <option value="" className="bg-[#121217] text-white">Choose Category</option>

          {category.map((item) => (
            <option
              key={item._id}
              value={item._id}
              className="bg-[#121217] text-white"
            >
              {item.name}
            </option>
          ))}
        </select>

        {errors.category && (
          <p className="text-xs text-red-500 font-medium">
            {errors.category.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs text-gray-300 font-semibold uppercase tracking-wider">
          What You Will Learn <span className="text-red-500">*</span>
        </label>

        <textarea
          placeholder="What skills or knowledge will students gain?"
          {...register("whatYouWillLearn", {
            required: "This field is required",
          })}
          className="min-h-[120px] w-full px-4 py-3 rounded-xl bg-[#16161a] border border-[#242430] text-white text-sm outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-colors resize-y"
        />

        {errors.whatYouWillLearn && (
          <p className="text-xs text-red-500 font-medium">
            {errors.whatYouWillLearn.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs text-gray-300 font-semibold uppercase tracking-wider">
          Tags <span className="text-red-500">*</span>
        </label>

        <input
          type="text"
          placeholder="React, NodeJS, MongoDB"
          {...register("tag", {
            required: "At least one tag is required",
          })}
          className="w-full px-4 py-3 rounded-xl bg-[#16161a] border border-[#242430] text-white text-sm outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-colors"
        />

        {errors.tag && (
          <p className="text-xs text-red-500 font-medium">
            {errors.tag.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs text-gray-300 font-semibold uppercase tracking-wider">
          Course Thumbnail <span className="text-red-500">*</span>
        </label>

        {
          thumbnailPreview ? (
            <div className="flex flex-col gap-4">
              <img
                src={thumbnailPreview}
                alt="Thumbnail Preview"
                className="w-full h-[250px] object-cover rounded-xl border border-[#22222a]"
              />

              <button
                type="button"
                onClick={() => {
                  setThumbnailPreview("");
                  setValue("thumbnail", null);
                }}
                className="w-fit bg-[#16161a] border border-[#242430] hover:border-gray-500 text-gray-200 font-semibold py-2 px-4 rounded-xl text-xs transition-all duration-200 cursor-pointer"
              >
                Change Thumbnail
              </button>
            </div>
          ) : (
            <label className="flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#242430] hover:border-indigo-500/50 bg-[#16161a]/40 hover:bg-[#16161a]/80 transition-all duration-200 p-6 text-center">
              <div className="text-center">
                <p className="text-indigo-400 font-bold text-sm">
                  Click to upload thumbnail image
                </p>
                <p className="text-gray-500 text-[10px] mt-1">
                  Supports PNG, JPG, or WEBP (16:9 ratio recommended)
                </p>

                <input
                  type="file"
                  accept="image/*"
                  hidden
                  {...register("thumbnail", {
                    required: !course
                      ? "Thumbnail is required"
                      : false,
                    onChange: (e) => {
                      const file = e.target.files[0];

                      if (file) {
                        setThumbnailPreview(
                          URL.createObjectURL(file)
                        );
                      }
                    },
                  })}
                />
              </div>
            </label>
          )
        }

        {errors.thumbnail && (
          <p className="text-xs text-red-500 font-medium">
            {errors.thumbnail.message}
          </p>
        )}
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          className="bg-white hover:bg-gray-100 text-gray-950 font-bold py-3 px-8 rounded-xl hover:scale-[1.01] active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-all duration-200 cursor-pointer text-sm"
        >
          {course ? "Update Details" : "Next Step"}
        </button>
      </div>
    </form>
    )
  )
};

export default CourseInformationForm;
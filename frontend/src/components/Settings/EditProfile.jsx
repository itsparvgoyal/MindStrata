import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import  api  from "../../services/service";
import toast from "react-hot-toast";
import { setUser } from "../../redux/slices/authSlice";

const EditProfile = () => {

  const { user } = useSelector((state) => state.rootReducer.auth);
  const [previewImage, setPreviewImage] = useState(user?.additionalDetails?.image);
  const dispatch = useDispatch();

  useEffect(()=>{

    reset({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      contactNumber: user?.additionalDetails?.contactNumber || "",
      gender: user?.additionalDetails?.gender || "",
      dateOfBirth: user?.additionalDetails?.dateOfBirth?.split("T")[0] || "",
      about: user?.additionalDetails?.about || "",
    });

    setPreviewImage(
      user?.additionalDetails?.image
    );


  },[user])

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      contactNumber: user?.additionalDetails?.contactNumber || "",
      gender: user?.additionalDetails?.gender || "",
      dateOfBirth: user?.additionalDetails?.dateOfBirth || "",
      about: user?.additionalDetails?.about || "",
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setPreviewImage(URL.createObjectURL(file));

    setValue("profileImage", file);
  };

  const submitHandler = async (data) => {

    const formData = new FormData();

    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("contactNumber", data.contactNumber);
    formData.append("gender", data.gender);
    formData.append("dateOfBirth", data.dateOfBirth);
    formData.append("about", data.about);

    if(data.profileImage){
      formData.append("profileImage", data.profileImage);
    }
  

    try{ 
      const response = await api.put('/profile/updateProfile',formData ,{
         headers:{
          "Content-Type": "multipart/form-data",
         },
         withCredentials:true,
      } )

      if(response.data.success){
        toast.success(response.data.message);
        dispatch(setUser(response.data.user));
        // console.log(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }else{
        toast.error(response.data.message);
      }
    }catch(error){
      console.log("ERROR IN EDITPROFILE");
      console.log(error);
    }

  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="max-w-4xl mx-auto text-white space-y-6"
    >
      <div className="bg-[#121217] border border-[#22222c] rounded-2xl p-4 sm:p-8">
        <h2 className="text-lg font-bold text-white border-b border-[#1e1e26] pb-3 mb-6">
          Profile Picture
        </h2>

        <div className="flex items-center gap-5">
          <div className="relative group w-24 h-24">
            <img
              src={previewImage}
              alt="profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-[#2a2a34]"
            />

            <label
              htmlFor="profileImage"
              className="
                absolute inset-0
                rounded-full
                bg-black/70
                opacity-0
                group-hover:opacity-100
                flex items-center justify-center
                cursor-pointer
                transition-opacity duration-200
                flex flex-col gap-1
              "
            >
              <FaCamera className="text-white text-lg" />
              <p className="text-[10px] text-gray-300 font-medium">Change</p>
            </label>

            <input
              id="profileImage"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                handleImageChange(e);
              }}
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Upload New Photo</p>
            <p className="text-xs text-gray-400 mt-0.5">Supports JPG, PNG or JPEG files.</p>
          </div>
        </div>
      </div>

      <div className="bg-[#121217] border border-[#22222c] rounded-2xl p-4 sm:p-8">
        <h2 className="text-lg font-bold text-white border-b border-[#1e1e26] pb-3 mb-6">
          Personal Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">First Name</label>
            <input
              type="text"
              {...register("firstName")}
              className="w-full bg-[#181820] border border-[#2a2a34] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gray-400 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Last Name</label>
            <input
              type="text"
              {...register("lastName")}
              className="w-full bg-[#181820] border border-[#2a2a34] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gray-400 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Email Address</label>
            <input
              type="email"
              disabled
              {...register("email")}
              className="w-full bg-[#14141a] border border-[#22222a] text-gray-500 rounded-xl px-4 py-3 text-sm cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Phone Number</label>
            <input
              type="text"
              {...register("contactNumber",{
                minLength:{
                  value:10,
                  message:"Phone number must be 10 digits"
                },
                maxLength:{
                  value:10,
                  message:"Phone number must be 10 digits"
                }
              })}
              className="w-full bg-[#181820] border border-[#2a2a34] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gray-400 transition-colors"
            />
            {errors.contactNumber && (
              <span className="text-red-400 text-xs mt-1.5 block">{errors.contactNumber.message}</span>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Gender</label>
            <select
              {...register("gender")}
              className="w-full bg-[#181820] border border-[#2a2a34] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gray-400 transition-colors"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Date Of Birth</label>
            <input
              type="date"
              {...register("dateOfBirth")}
              className="w-full bg-[#181820] border border-[#2a2a34] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gray-400 transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="bg-[#121217] border border-[#22222c] rounded-2xl p-4 sm:p-8">
        <h2 className="text-lg font-bold text-white border-b border-[#1e1e26] pb-3 mb-4">
          About Me
        </h2>

        <textarea
          rows={4}
          {...register("about")}
          className="w-full bg-[#181820] border border-[#2a2a34] rounded-xl p-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-400 transition-colors resize-none"
          placeholder="Write something about yourself..."
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={() => reset()}
          className="px-6 py-2.5 rounded-full bg-[#181820] border border-[#2a2a34] hover:border-gray-500 text-gray-300 text-sm font-semibold transition-colors cursor-pointer"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-6 py-2.5 rounded-full bg-white text-gray-950 text-sm font-bold hover:bg-gray-100 transition-colors cursor-pointer shadow-[0_2px_10px_rgba(255,255,255,0.15)]"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default EditProfile;
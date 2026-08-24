import { useForm } from "react-hook-form";
import HightlightText from "../components/common/HightlightText";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; 
import api from "../services/service";  
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";  
import changePassImg from "../assets/images/changePass.png";

const ChangePassword = () => {

    const navigate = useNavigate(); 
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {register , handleSubmit , reset ,  formState: { errors } } = useForm({
        defaultValues:{
            email:"",
            oldPassword:"",
            newPassword:"",
            confirmPassword:""
        }
    });

    const submitHandler = async (data) => {
        // fetch data 
        try{
            const response = await api.post("/auth/changepassword", data);
            if(response.data.success){
                toast.success("Password changed successfully");
                // navigate("/");
                reset();
            }
        }
        catch (error){
            toast.error("Error in changing password");
            console.error( "error in changing password" , error)
        }
    }


  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#09090b] flex text-white relative overflow-hidden select-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-[#0d0d11] relative z-10">
        <div className="w-full max-w-md bg-[#121217] border border-[#22222a] p-8 rounded-2xl shadow-xl flex flex-col gap-5">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              <HightlightText text="Change Password"/>
            </h1>
            <p className="mt-2 text-gray-400 text-xs leading-relaxed">
              Update your account password securely. Make sure your new password is strong and different from the old one.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(submitHandler)}>
            <div className="flex flex-col gap-2">
              <label className="text-xs text-gray-300 font-semibold uppercase tracking-wider block">
                Email Address <sup className="text-pink-500">*</sup>
              </label>

              <input
                type="email"
                {...register("email", {
                    required: "Email is required",
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Invalid email address",
                    },
                })}
                placeholder="Enter email address"
                className="w-full px-4 py-3 rounded-xl bg-[#16161a] border border-[#242430] text-white text-sm outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-colors"
              />
              {errors.email && <p className="text-xs text-red-500 font-medium">{errors.email.message}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs text-gray-300 font-semibold uppercase tracking-wider block">
                Old Password <sup className="text-pink-500">*</sup>
              </label>

              <div className="relative">
                <input
                  type={showOldPassword ? "text" : "password"}
                  {...register("oldPassword", {
                    required: "Old password is required",
                  })}
                  placeholder="Enter old password"
                  className="w-full px-4 py-3 rounded-xl bg-[#16161a] border border-[#242430] text-white text-sm outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-colors"
                />
                <span onClick={() => setShowOldPassword(!showOldPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-white transition-colors">
                  {showOldPassword ? (
                    <AiOutlineEye size={18}/>
                  ) : (
                    <AiOutlineEyeInvisible size={18}/>
                  )}
                </span>
              </div>
              {errors.oldPassword && <p className="text-xs text-red-500 font-medium">{errors.oldPassword.message}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs text-gray-300 font-semibold uppercase tracking-wider block">
                New Password <sup className="text-pink-500">*</sup>
              </label>

              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  {...register("newPassword", {
                    required: "New password is required",
                  })}
                  placeholder="Enter new password"
                  className="w-full px-4 py-3 rounded-xl bg-[#16161a] border border-[#242430] text-white text-sm outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-colors"
                />
                <span onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-white transition-colors">
                  {showNewPassword ? (
                    <AiOutlineEye size={18}/>
                  ) : (
                    <AiOutlineEyeInvisible size={18}/>
                  )}
                </span>
              </div>
              {errors.newPassword && <p className="text-xs text-red-500 font-medium">{errors.newPassword.message}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs text-gray-300 font-semibold uppercase tracking-wider block">
                Confirm New Password <sup className="text-pink-500">*</sup>
              </label>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: "Confirm password is required",
                  })}
                  placeholder="Confirm new password"
                  className="w-full px-4 py-3 rounded-xl bg-[#16161a] border border-[#242430] text-white text-sm outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-colors"
                />
                <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-white transition-colors">
                  {showConfirmPassword ? (
                    <AiOutlineEye size={18}/>
                  ) : (
                    <AiOutlineEyeInvisible size={18}/>
                  )}
                </span>
              </div>
              {errors.confirmPassword && <p className="text-xs text-red-500 font-medium">{errors.confirmPassword.message}</p>}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-white hover:bg-gray-100 text-gray-950 font-bold py-3 rounded-xl hover:scale-[1.01] active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-all duration-200 cursor-pointer text-sm"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="hidden lg:flex w-1/2 items-center justify-center p-12 relative">
        <div className="absolute -top-10 -left-10 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl pointer-events-none"></div>

        <img
          src={changePassImg}
          alt="Reset Password"
          className="w-[80%] object-contain rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-[#22222a] relative z-10"
        />
      </div>
    </div>
  );
};

export default ChangePassword;
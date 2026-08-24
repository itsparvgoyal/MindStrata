import { useState } from "react";
import api from "../../services/service"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import HightlightText from "../common/HightlightText";
import Stepper from "../ResetPassword Page/Steeper";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const NewPasswordForm = ({ email }) => {

  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading , setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    if(password !== confirmPassword){
        toast.error("Passwords do not match");
        setLoading(false);
        setPassword("");
        setConfirmPassword("");
        return;
    }

    const payload = {
      password,
      confirmPassword,
    };

    // console.log(payload);

    try {
    // console.log(" verify reset token -> " , localStorage.getItem("resetToken"))
    const response = await api.post("/auth/resetpassword", payload , {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("resetToken")}`
      }
    });
      
      if(response.data.success){
        toast.success("Password reset successfully");
        localStorage.removeItem("resetToken");
        setPassword("");
        setConfirmPassword("");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    }
    catch(err){
      console.log("error in reset password " , err)
      toast.error(err.response.data.message);
    }
    finally{
      setLoading(false);
    }

  };

  return (
    <div className="w-full max-w-md bg-[#121217] border border-[#22222a] p-8 rounded-2xl shadow-xl flex flex-col gap-5">

      <Stepper currentStep={3}/>

      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          Set New Password
        </h1>
        <p className="mt-2 text-gray-400 text-xs leading-relaxed">
          Choose a secure password. Make sure it is at least 8 characters long and contains symbols.
        </p>
      </div>

      <div className="flex flex-col gap-4 mt-2">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#16161a] border border-[#242430] text-white text-sm outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-colors"
              disabled={loading}
            />

            <span 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-white transition-colors"
            >
                {
                    !showPassword ? (
                        <AiOutlineEyeInvisible size={18}/>
                    ) : (
                        <AiOutlineEye size={18}/>
                    )
                }
            </span>  

          </div>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              className="w-full px-4 py-3 rounded-xl bg-[#16161a] border border-[#242430] text-white text-sm outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-colors"
              disabled={loading}
            />

            <span 
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-white transition-colors"
            >
                {
                    !showConfirmPassword ? (
                        <AiOutlineEyeInvisible size={18}/>
                    ) : (
                        <AiOutlineEye size={18}/>
                    )
                }
            </span>  

          </div>
      </div>
      

      <button
        onClick={handleSubmit}
        className="w-full bg-white hover:bg-gray-100 text-gray-950 font-bold py-3 rounded-xl hover:scale-[1.01] active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-all duration-200 cursor-pointer text-sm disabled:opacity-40 disabled:cursor-not-allowed"
        disabled={loading}
      >
        {loading ? "Resetting..." : "Reset Password"}
      </button>

    </div>
  );
};

export default NewPasswordForm;
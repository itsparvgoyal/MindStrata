import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import OTPInput from "react-otp-input";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import api from "../../services/service";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [accountType, setAccountType] = useState("Student");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [sendingOtp, setSendingOtp] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let timer;

    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [countdown]);

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
     defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      contactNumber: "",
    }
 });

  const sendOtpHandler = async () => {

    if(sendingOtp){
      return;
    }
    
    const email = getValues("email");
    // console.log(email)
    
    if (!email) {
      toast.error("Enter Email First");
      return;
    }
        
    try{
      setSendingOtp(true);
      const response =  await api.post("/auth/sendotp", {
        email: email
      })
      
      // console.log("otp response", response)
      
      if(response.data.success){
        toast.success("OTP sent successfully");
        setCountdown(50);
      }
      setOtp("");
    }
    catch(err){
      console.log("error in send otp " , err)
      toast.error(err.response.data.message);
    }finally{
      setSendingOtp(false);
    }

  };

  const submitHandler = async (data) => {
    const payload = {
      ...data,
      accountType,
      otp,
    };


    try {
      const response = await api.post("/auth/signup", payload);
      // console.log("response" , response);

      if(response.data.success){
        toast.success("Account Created Successfully");
        // set token and user data 
        dispatch(setToken(response.data.token));
        dispatch(setUser(response.data.user));
        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("refreshToken", JSON.stringify(response.data.refreshToken));

        navigate("/dashboard/profile");
      }
      // stop timer also 
      reset();
      setCountdown(0);
      setOtp("");
      
    } catch (error) {
        toast.error(error.response.data.message);
        console.log("error in sigup " , error)

    }
  };


  return (
    <div className="rounded-2xl bg-[#121217] p-8 shadow-xl border border-[#22222a]">

      <form
        onSubmit={handleSubmit(submitHandler)}
        className="space-y-5"
      >

        <div className="grid grid-cols-2 gap-4">

          <div>
            <input
              type="text"
              placeholder="First Name"
              {...register("firstName", {
                required: true,
              })}
              className="w-full rounded-xl bg-[#16161a] border border-[#242430] p-3 text-white text-sm outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-colors"
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Last Name"
              {...register("lastName", {
                required: true,
              })}
              className="w-full rounded-xl bg-[#16161a] border border-[#242430] p-3 text-white text-sm outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-colors"
            />
          </div>

        </div>

        <input
          type="email"
          placeholder="Email Address"
          {...register("email", {
            required: true,
          })}
          className="w-full rounded-xl bg-[#16161a] border border-[#242430] p-3 text-white text-sm outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-colors"
        />


        <input
          type="number"
          placeholder="Contact Number"
          {...register("contactNumber", {
            required: true,
          })}
          className="w-full rounded-xl bg-[#16161a] border border-[#242430] p-3 text-white text-sm outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-colors"
        />


        <div className="relative">

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password", {
              required: true,
            })}
            className="w-full rounded-xl bg-[#16161a] border border-[#242430] p-3 text-white text-sm outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-colors"
          />

          <button
            type="button"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors cursor-pointer"
            onClick={() =>
              setShowPassword(!showPassword)
            }
          >
            {showPassword ? (
              <Eye size={18} />
            ) : (
              <EyeOff size={18} />
            )}
          </button>

        </div>


        <div className="relative">

          <input
            type={
              showConfirmPassword
                ? "text"
                : "password"
            }
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              required: true,
            })}
            className="w-full rounded-xl bg-[#16161a] border border-[#242430] p-3 text-white text-sm outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-colors"
          />

          <button
            type="button"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors cursor-pointer"
            onClick={() =>
              setShowConfirmPassword(
                !showConfirmPassword
              )
            }
          >
            {showConfirmPassword ? (
              <Eye size={18} />
            ) : (
              <EyeOff size={18} />
            )}
          </button>

        </div>


        <div>

          <label className="mb-3 block text-xs text-gray-300 font-medium">
            Verification OTP
          </label>

          <div className="flex flex-col gap-4 md:flex-row md:items-center">

            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span></span>}
              renderInput={(props) => (
                <input
                  {...props}
                  className="!h-12 !w-12 rounded-xl bg-[#16161a] border border-[#242430] text-center text-white font-bold ml-2 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 focus:outline-none outline-none"
                />
              )}
            />


            <div className="flex flex-col items-center gap-2">
                <button
                  type="button"
                  disabled={sendingOtp ||  countdown > 0}
                  onClick={sendOtpHandler}
                  className={`rounded-xl px-5 py-3 font-semibold text-xs text-white transition-all duration-300 cursor-pointer
                    ${
                      countdown > 0
                        ? "cursor-not-allowed bg-gray-800 text-gray-500 border border-[#242430]"
                        : "bg-indigo-600 hover:bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.25)]"
                    }
                  `}
                >
                  {countdown > 0 ? "OTP Sent ✓" : "Send OTP"}
                </button>

                {countdown > 0 && (
                  <p className="text-[10px] text-gray-400 font-medium">
                    Resend OTP in {countdown}s
                  </p>
                )}
            </div>

          </div>

        </div>


        <button
          type="submit"
          className="w-full rounded-xl bg-white hover:bg-gray-100 text-gray-950 font-bold py-3 shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all hover:scale-[1.01] active:scale-95 cursor-pointer text-sm"
        >
          Create Account
        </button>

        <p className="text-center text-xs text-gray-400">
          Already have an account?{" "}
          <Link to={"/login"} className="font-bold text-indigo-400 hover:underline">
            Login
          </Link>
        </p>

      </form>

    </div>
  );
};

export default SignupForm;
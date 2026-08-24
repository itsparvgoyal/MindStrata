import React, { useState } from "react";
import {Link} from "react-router-dom";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import api from "../services/service";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../redux/slices/authSlice";
import {useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";

const Login = () => {
  // set token in redux store
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {    
      const response = await  api.post("/auth/login", formData);
      // console.log("response",response.data);
      if(response.data.success){
        // console.log("data set" , response.data.user);
        dispatch(setToken(response.data.token));
        dispatch(setUser(response.data.user));
        localStorage.setItem("token", JSON.stringify(response.data.token));  
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("refreshToken", JSON.stringify(response.data.refreshToken));
        navigate("/dashboard/profile")
      }
      setFormData({
        email: "",
        password: "",
      });
      toast.success("Login Successfully");

    } catch (error) {
      console.log("Error in Login: ", error);
      toast.error("Invalid Credentials");
    }

  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#09090b] flex items-center justify-center px-4 py-12 relative overflow-hidden select-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-5xl bg-[#121217] border border-[#22222a] rounded-3xl overflow-hidden shadow-2xl grid md:grid-cols-2 relative z-10">
                <div className="relative hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
            alt="login"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/45 to-transparent flex flex-col justify-end p-10">
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Welcome Back 👋
            </h2>

            <p className="text-gray-300 text-sm mt-3 leading-relaxed">
              Continue your learning journey and access all your courses.
            </p>
          </div>
        </div>

        <div className="p-8 md:p-12 flex flex-col justify-center bg-[#0d0d11]">
          <div className="max-w-md mx-auto w-full">
            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              Login
            </h1>

            <p className="text-gray-400 mt-2 text-xs sm:text-sm">
              Enter your credentials to continue
            </p>

            <form
              onSubmit={submitHandler}
              className="mt-8 space-y-5"
            >
              <div>
                <label className="text-xs text-gray-300 block mb-2 font-medium">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={changeHandler}
                  placeholder="gmail@gmail.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#16161a] border border-[#242430] text-white text-sm outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-colors"
                />
              </div>

              <div>
                <label className="text-xs text-gray-300 block mb-2 font-medium">
                  Password
                </label>
                
                <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={changeHandler}    
                      placeholder={showPassword ? `${formData.password}` : `${".".repeat(formData.password.length)}`}
                      className="w-full px-4 py-3 rounded-xl bg-[#16161a] border border-[#242430] text-white text-sm outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-colors"
                    />

                    {/* eye button to see password */}
                    <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-white transition-colors" onClick={() => setShowPassword(!showPassword)}>
                        {
                            !showPassword 
                            ? (
                                <AiOutlineEyeInvisible
                                fontSize={20}
                                />
                            ) 
                            : (
                                <AiOutlineEye
                                fontSize={20}
                                />
                            )
                        }   
                    </button>
                </div>
              </div>

              <div className="flex justify-end">
                <Link
                  to="/resetpassword"
                  className="text-indigo-400 text-xs hover:text-indigo-350 font-bold transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-white hover:bg-gray-100 text-gray-950 font-bold py-3 rounded-xl hover:scale-[1.01] active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-all duration-200 cursor-pointer text-sm"
                onClick={submitHandler}
              >
                Sign In
              </button>
            </form>

            <p className="text-center text-xs text-gray-400 mt-6">
              Don't have an account?{" "}
              <Link to="/signup" className="text-indigo-400 font-bold hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
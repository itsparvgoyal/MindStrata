import { useState , useEffect } from "react";
import api from "../../services/service";
import toast from "react-hot-toast";
import OtpInput from "react-otp-input";
import Stepper from "../ResetPassword Page/Steeper";

const EmailOtpForm = ({
  step,
  setStep,
  email,
  setEmail,
}) => {

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [timer, setTimer] = useState(0);

  //  start timer 
  useEffect(() => {
    if(timer > 0){
        const interval = setInterval(() => {
            setTimer((prevTimer) => prevTimer - 1);
        }, 1000);
        return () => clearInterval(interval);
    }
  }, [timer]);

  const isValidEmail = (email) => {
     // check email 
    if(!email){
      toast.error("Please enter email");
      setLoading(false);
      return false;
    }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
      toast.error("Please enter valid email");
      setLoading(false);
      return false;
    }
    if(email.length > 255){
      toast.error("Email is too long");
      setLoading(false);
      return false;
    }
    if(email.length < 3){
      toast.error("Email is too short");
      setLoading(false);
      return false;
    }

    return true;
  }

  const sendOTP = async () => {
    setSendingOtp(true);

    // check email 
    if(!isValidEmail(email)){
      setSendingOtp(false);
      return;
    }

    try {
      const response = await api.post("/auth/resetpasswordotp", { email });
    //   console.log("send otp " , response.data)
      if(response.data.success){
        toast.success("OTP sent successfully");
        setTimeout(() => {
          setSendingOtp(false);
          setStep(2);
        }, 2000);
      }
    } catch (error) {
      console.log("Error in sendOTP : ", error);
      toast.error("Invalid Email");
      setSendingOtp(false);
    }
  };

  const verifyOTP = async () => {
    setLoading(true);

    try{
      const response = await api.post("/auth/verifyresetotp", { email, otp });
    //   console.log("verify otp" , response.data)
      if(response.data.success){
          toast.success("OTP verified successfully");
        //   console.log("setting localstorage resetToken" , response.data.resetToken)
          localStorage.setItem("resetToken" , response.data.resetToken);
          setTimeout(() => {
            setLoading(false);
            setStep(3);
          }, 2000);
      }
    }catch(error){
      console.log("Error in verifyOTP : ", error);
      toast.error("Invalid OTP");
      setLoading(false);
    }

  };

  return (
    <div className="w-full max-w-md bg-[#121217] border border-[#22222a] p-8 rounded-2xl shadow-xl flex flex-col gap-5">
      
      <Stepper currentStep={step}/>

      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          Reset Password
        </h1>
        <p className="mt-2 text-gray-400 text-xs leading-relaxed">
          Enter the email address associated with your account. We’ll send you a verification code to verify your identity.
        </p>
      </div>

      {step === 1 && (
        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Enter Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#16161a] border border-[#242430] text-white text-sm outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-colors"
            disabled={sendingOtp || loading}
          />

          <button
            onClick={sendOTP}
            className="w-full bg-white hover:bg-gray-100 text-gray-950 font-bold py-3 rounded-xl hover:scale-[1.01] active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-all duration-200 cursor-pointer text-sm"
            disabled={sendingOtp || loading}
          >
            {(sendingOtp) ? "Sending..." : "Send OTP" }
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-5">
          <p className="text-xs text-gray-400">
            OTP sent to <span className="text-indigo-400 font-semibold">{email}</span>
          </p>

          <OtpInput
            numInputs={4}
            onChange={setOtp}
            value={otp}
            renderSeparator={<span></span>}
            renderInput={(props) => <input {...props} disabled={sendingOtp || loading}/>}
            inputStyle={{width: "48px", height: "48px", fontSize: "18px", borderRadius: "12px", border: "1px solid #242430", backgroundColor: "#16161a" , color: "white", outline: "none"}}
            containerStyle={{gap: "12px", display: "flex", justifyContent: "start", marginTop: "4px"}}
          />

          <button
            onClick={verifyOTP}
            className="w-full bg-white hover:bg-gray-100 text-gray-950 font-bold py-3 rounded-xl hover:scale-[1.01] active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-all duration-200 cursor-pointer text-sm"
            disabled={loading || sendingOtp}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          <button
            onClick={() => {
              setTimer(60);
              sendOTP();
            }}
            className="w-full bg-[#16161a] border border-[#242430] hover:border-gray-500 text-gray-200 font-semibold py-3 rounded-xl transition-all duration-200 cursor-pointer text-sm disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={sendingOtp || loading || timer > 0}
          >
            {(sendingOtp || timer > 0 ) ? `Resend OTP (${timer}s)` : "Resend OTP"}
          </button>
        </div>
      )}
    </div>
  );
};

export default EmailOtpForm;
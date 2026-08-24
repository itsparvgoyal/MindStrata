import { useState } from "react";
import EmailOtpForm from "../components/Auth/EmailOtpForm";
import NewPasswordForm from "../components/Auth/NewPasswordForm";
import resetPassword from "../assets/images/resetPassword.png"

const ResetPassword = () => {
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#09090b] flex text-white relative overflow-hidden select-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="hidden lg:flex w-1/2 items-center justify-center p-12 relative">
        <div className="absolute -top-10 -left-10 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl pointer-events-none"></div>

        <img
          src={resetPassword}
          alt="reset"
          className="w-[80%] object-contain rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-[#22222a] relative z-10"
        />
      </div>

      <div className="flex w-full lg:w-1/2 items-center justify-center p-6 bg-[#0d0d11] relative z-10">
        {step < 3 ? (
          <EmailOtpForm
            step={step}
            setStep={setStep}
            email={email}
            setEmail={setEmail}
          />
        ) : (
          <NewPasswordForm email={email} />
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
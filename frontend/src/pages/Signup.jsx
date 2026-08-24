import  SignupForm from '../components/Auth/SignupForm.jsx';
import img from "../assets/images/signUp.png" 

const Signup = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#09090b] flex items-center justify-center py-12 px-4 select-none relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/5 blur-[130px] rounded-full pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">

        <div className="hidden lg:block w-[50%] relative">
          <div className="absolute -top-10 -left-10 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl"></div>

          <img
            src={img}
            alt="signup"
            className="relative z-10 w-full rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-[#22222a]"
          />
        </div>

        <div className="w-full lg:w-[45%]">
          <SignupForm />
        </div>

      </div>
    </div>
  );
};

export default Signup;
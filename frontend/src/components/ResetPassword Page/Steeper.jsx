const Stepper = ({ currentStep }) => {
  const steps = [
    "Email Address",
    "Verify OTP",
    "New Password",
  ];

  return (
    <div className="flex items-center justify-center w-full mb-8">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300
            ${
              currentStep > index + 1
                ? "bg-emerald-500 text-white"
                : currentStep === index + 1
                ? "bg-white text-gray-950 border border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                : "bg-[#16161a] text-gray-500 border border-[#242430]"
            }`}
          >
            {currentStep > index + 1 ? "✓" : index + 1}
          </div>

          {index < steps.length - 1 && (
            <div
              className={`w-14 h-0.5 transition-all duration-300
              ${
                currentStep > index + 1
                  ? "bg-emerald-500"
                  : "bg-[#242430]"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
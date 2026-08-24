import { useSelector } from "react-redux";

const RenderSteps = () => {
  const { step } = useSelector((state) => state.rootReducer.course);

  const steps = [
    "Course Information",
    "Course Builder",
    "Publish",
  ];

  return (
    <div className="w-full py-4 select-none">
      <div className="flex items-center justify-between">
        {steps.map((item, index) => (
          <div
            key={index}
            className="relative flex flex-1 flex-col items-center"
          >
            {index !== steps.length - 1 && (
              <div
                className={`absolute top-[18px] left-1/2 h-[2px] w-full transition-all duration-300
                  ${
                    step > index + 1
                      ? "bg-emerald-500"
                      : "bg-[#242430]"
                  }
                `}
              />
            )}

            <div
              className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full border text-xs font-bold transition-all duration-300
              
              ${
                step > index + 1
                  ? "border-emerald-500 bg-emerald-500 text-white"
                  : step === index + 1
                  ? "border-white bg-[#121217] text-white shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                  : "border-[#242430] bg-[#16161a] text-gray-500"
              }
              `}
            >
              {step > index + 1 ? "✓" : index + 1}
            </div>

            <p
              className={`mt-2.5 text-center text-[10px] sm:text-xs font-semibold tracking-wide transition-colors duration-305
              
              ${
                step >= index + 1
                  ? "text-white"
                  : "text-gray-500"
              }
              `}
            >
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RenderSteps;
import { useState } from "react";
import { IoChevronDown } from "react-icons/io5";

const Accordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-3 text-white w-full max-w-4xl py-6">
      {items.map((item, index) => (
        <div
          key={index}
          className="border border-[#20202a] bg-[#121217] rounded-2xl overflow-hidden px-6 transition-colors"
        >
          <button
            onClick={() => toggleAccordion(index)}
            className="w-full flex items-center justify-between py-5 text-left font-medium text-white hover:text-indigo-400 transition-colors"
          >
            <p className="text-base sm:text-lg font-semibold pr-4">
              {item.question}
            </p>

            <IoChevronDown
              className={`text-gray-400 shrink-0 transition-transform duration-300 ${
                openIndex === index ? "rotate-180 text-indigo-400" : ""
              }`}
            />
          </button>

          {openIndex === index && (
            <div className="pb-5 pt-1 text-gray-400 text-sm sm:text-base leading-relaxed border-t border-[#1e1e28]">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
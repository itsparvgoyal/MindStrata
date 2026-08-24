import { FiCheckCircle } from "react-icons/fi";

const MentorCard = ({
  image,
  heading,
  description,
  quote,
  name,
  designation,
}) => {
  return (
    <div className="w-11/12 max-w-7xl mx-auto my-8 bg-[#0f0f13] border border-[#1e1e26] rounded-2xl p-6 sm:p-10 text-left">
      <div className="grid gap-8 lg:grid-cols-12 items-center">

        <div className="lg:col-span-4 flex justify-center">
          <div className="relative w-full max-w-[320px] aspect-[4/5] rounded-xl overflow-hidden bg-[#14141a] border border-[#22222a]">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="font-extrabold text-white text-lg">{name}</h3>
              <p className="text-xs text-gray-400">{designation}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 flex flex-col justify-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
            Instructor & Mentor
          </span>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
            {heading || "Learn from people who have built, shipped and solved real problems."}
          </h2>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
            {description}
          </p>

          <div className="space-y-2.5 mb-6 text-sm text-gray-300">
            <div className="flex items-center gap-2.5">
              <FiCheckCircle className="text-gray-400 shrink-0" size={16} />
              <span>Track record of top products & engineering systems</span>
            </div>
            <div className="flex items-center gap-2.5">
              <FiCheckCircle className="text-gray-400 shrink-0" size={16} />
              <span>Industry credentials & real-world building experience</span>
            </div>
            <div className="flex items-center gap-2.5">
              <FiCheckCircle className="text-gray-400 shrink-0" size={16} />
              <span>1-on-1 code reviews and personalized guidance</span>
            </div>
          </div>

          {quote && (
            <blockquote className="border-l-2 border-gray-600 pl-4 text-gray-400 italic text-sm">
              "{quote}"
            </blockquote>
          )}
        </div>

      </div>
    </div>
  );
};

export default MentorCard;
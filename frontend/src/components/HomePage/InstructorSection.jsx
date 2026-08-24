import instructorImg from "../../assets/images/instructor.png";
import { FaArrowRight } from "react-icons/fa";
import CTAButton from "../common/CTAButton";
import HightlightText from "../common/HightlightText";

const InstructorSection = () => {
  return (
    <div className="w-11/12 max-w-maxContent mx-auto py-24">

      <div className="flex flex-col lg:flex-row gap-16 items-center">

        <div className="lg:w-[50%] relative rounded-xl">
          <img
            src={instructorImg}
            alt="Instructor"
            className="relative z-10 shadow-[12px_12px_0px_rgba(255,255,255,0.2)] rounded-xl"
          />
        </div>

        <div className="lg:w-[45%] flex flex-col gap-6">

          <h2 className="text-6xl font-semibold text-white">
            Become an
            <br />
            <HightlightText text="instructor"/>
          </h2>

          <p className="text-white leading-7">
            Instructors from around the world teach millions of
            students on MindStrata. We provide the tools and
            skills to teach what you love.
          </p>

          <div className="w-fit">
            <CTAButton active={true} linkto={"/signup"}>
              <div className="flex items-center gap-2">
                Start Teaching Today
                <FaArrowRight />
              </div>
            </CTAButton>
          </div>

        </div>

      </div>
    </div>
  );
};

export default InstructorSection;
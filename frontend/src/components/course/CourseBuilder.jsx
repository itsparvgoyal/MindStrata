import { useSelector } from "react-redux"
import RenderSteps from "./RenderSteps"
import CourseInformationForm from "./CourseInformationForm"
import CourseBuilderForm from "./CourseBuilderForm"
import PublishCourse from "./PublishCourse"

const CourseBuilder = () => {

  const { step } = useSelector((state) => state.rootReducer.course)

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8">
      <RenderSteps />

      <div className="mt-8">
        {step === 1 && <CourseInformationForm />}
        {step === 2 && <CourseBuilderForm />}
        {step === 3 && <PublishCourse />}
      </div>
    </div>
  );
}

export default CourseBuilder
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';
import { setUpdatedCompletedLectures } from '../../redux/slices/LearnCourseSlice';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { useMemo } from 'react';
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import toast from 'react-hot-toast';
import api from '../../services/service';
import { BsCheckCircle } from "react-icons/bs";
import { setCurrSubSecId, setCurrSectionId } from '../../redux/slices/LearnCourseSlice';
import AboutSection from './AboutSection';
import QASection from './Q&ASection';
import NotesSection from './NotesSection';
import TestSection from './Test';


const VideoSection = () => {
  const { courseID, sectionID, subSectionID } = useParams();
  const dispatch = useDispatch();

  const { courseSectionData, completedLectures } = useSelector((state) => state.rootReducer.learn);

  const [sectionIndex, setSectionIndex] = useState(-1);
  const [subSectionIndex, setSubSectionIndex] = useState(-1);
  const [activeTab, setActiveTab] = useState("about");

  const [isLastVideo, setIsLastVideo] = useState(false);
  const [isFirstVideo, setIsFirstVideo] = useState(false);

  const isMarkedCompleted = useMemo(() => {
    return completedLectures.includes(subSectionID);
  }, [completedLectures, subSectionID]);

  const playerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const sIndex = courseSectionData.findIndex(
      (section) => section._id === sectionID
    );

    if (sIndex === -1) return;

    setSectionIndex(sIndex);
    //! ye fucn asycn hota hai isliye state variable turant update nho hoga isliye local variabale use kiya

    const ssIndex = courseSectionData[sIndex]?.subsection.findIndex(
      (subsection) => subsection._id === subSectionID
    );

    setSubSectionIndex(ssIndex);


    if (sIndex === 0 && ssIndex === 0) {
      setIsFirstVideo(true);
    } else {
      setIsFirstVideo(false);
    }

    if ((sIndex === courseSectionData.length - 1) && (ssIndex === courseSectionData[sIndex].subsection.length - 1)) {
      setIsLastVideo(true);
    } else {
      setIsLastVideo(false);
    }

    dispatch(setCurrSubSecId(subSectionID));
    dispatch(setCurrSectionId(sectionID));

  }, [courseSectionData, sectionID, subSectionID, completedLectures]);


  const goToNextVideo = () => {
    const currentSection =
      courseSectionData?.[sectionIndex];

    if (
      subSectionIndex <
      currentSection?.subsection.length - 1
    ) {
      const nextSubsection =
        currentSection.subsection[subSectionIndex + 1];

      navigate(
        `/learnCourse/${courseID}/section/${sectionID}/subsection/${nextSubsection._id}`
      );
    } else {
      const nextSection =
        courseSectionData?.[sectionIndex + 1];

      if (nextSection) {
        navigate(
          `/learnCourse/${courseID}/section/${nextSection._id}/subsection/${nextSection.subsection[0]._id}`
        );
      }
    }
  };

  const goToPrevVideo = () => {
    if (subSectionIndex > 0) {
      const prevSubsection =
        courseSectionData[sectionIndex].subsection[
        subSectionIndex - 1
        ];

      navigate(
        `/learnCourse/${courseID}/section/${sectionID}/subsection/${prevSubsection._id}`
      );
    } else if (sectionIndex > 0) {
      const prevSection =
        courseSectionData[sectionIndex - 1];

      const lastSubsection =
        prevSection.subsection[
        prevSection.subsection.length - 1
        ];

      navigate(
        `/learnCourse/${courseID}/section/${prevSection._id}/subsection/${lastSubsection._id}`
      );
    }

  };

  const markAsCompleted = async () => {
    const data = {
      courseId: courseID,
      subSectionId: subSectionID
    }
    try {
      const result = await api.put(`/courseProgress/updateCourseProgress`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (result.data.success) {
        dispatch(setUpdatedCompletedLectures(subSectionID));
        toast.success(result.data.message);
      }
    } catch (error) {
      console.log("Error marking as completed:", error);
      toast.error("Failed to mark lecture as completed");
    }
  }

  const currentVideo = useMemo(() => {
    return courseSectionData?.[sectionIndex]?.subsection?.[subSectionIndex]?.videoUrl;
  }, [courseSectionData, sectionIndex, subSectionIndex]);

  const currentLecture = useMemo(() => {
    return courseSectionData?.[sectionIndex]?.subsection?.[subSectionIndex];
  }, [courseSectionData, sectionIndex, subSectionIndex]);


  return (
    <div className="w-full flex flex-col gap-6 p-1 sm:p-2">
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-[#22222a] bg-black shadow-2xl" onContextMenu={(e) => e.preventDefault()}>
        <ReactPlayer
          ref={playerRef}
          url={currentVideo}
          src={currentVideo}
          controls
          width="100%"
          height="100%"
          style={{ position: 'absolute', top: 0, left: 0 }}
          config={{
            file: {
              attributes: {
                controlsList: 'nodownload'
              }
            }
          }}
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-2">
        <button
          onClick={markAsCompleted}
          disabled={isMarkedCompleted}
          className={`flex items-center justify-center gap-2 font-bold px-5 py-2.5 rounded-full text-xs transition-all duration-200 active:scale-95 cursor-pointer
            ${isMarkedCompleted
              ? "bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/25 cursor-not-allowed opacity-80"
              : "bg-emerald-400 hover:bg-emerald-300 text-gray-950 shadow-[0_0_15px_rgba(52,211,153,0.25)] hover:scale-105"
            }`}
        >
          <span>{isMarkedCompleted ? "Completed" : "Mark as Complete"}</span>
          <BsCheckCircle size={15} />
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={goToPrevVideo}
            disabled={isFirstVideo}
            className="flex items-center justify-center gap-1.5 font-semibold px-5 py-2.5 rounded-full text-xs text-gray-300 bg-[#16161a] border border-[#2a2a34] hover:border-gray-500 transition-all duration-200 cursor-pointer active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:hover:border-[#2a2a34]"
          >
            <GrFormPreviousLink size={16} className="text-gray-300" />
            <span>Prev</span>
          </button>

          <button
            onClick={goToNextVideo}
            disabled={isLastVideo}
            className="flex items-center justify-center gap-1.5 font-semibold px-5 py-2.5 rounded-full text-xs text-white bg-indigo-600 hover:bg-indigo-500 transition-all duration-200 cursor-pointer active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
          >
            <span>Next</span>
            <GrFormNextLink size={16} className="text-white" />
          </button>
        </div>
      </div>

      <div className="flex border-b border-[#22222a] mt-6">
        {[
          { id: "about", label: "About" },
          { id: "qa", label: "Q&A" },
          { id: "notes", label: "Notes" },
          { id: "test", label: "Test" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 text-sm font-semibold border-b-2 transition-all duration-200 cursor-pointer
              ${activeTab === tab.id
                ? "border-indigo-500 text-white"
                : "border-transparent text-gray-500 hover:text-gray-350"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-2 mb-10">
        {activeTab === "about" && (
          <AboutSection currentLecture={currentLecture} />
        )}
        {activeTab === "qa" && (
          <QASection />
        )}
        {activeTab === "notes" && (
          <NotesSection courseId={courseID} subSectionId={subSectionID} />
        )}
        {activeTab === "test" && (
          <TestSection currentLecture={currentLecture} />
        )}
      </div>
    </div>
  );
}

export default VideoSection
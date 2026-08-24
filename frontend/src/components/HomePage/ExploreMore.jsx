import { useState } from "react";
import CourseCard from "./CourseCard.jsx";
import { ExploreMoreData } from "../../data/exploreMoreData.js";

const tabsName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState("Free");

  const [courses, setCourses] = useState(
    ExploreMoreData[0].courses
  );

  const [currentCard, setCurrentCard] = useState(
    ExploreMoreData[0].courses[0].heading
  );

  const setMyCards = (value) => {
    setCurrentTab(value);

    const result = ExploreMoreData.find(
      (course) => course.tag === value
    );

    setCourses(result.courses);
    setCurrentCard(result.courses[0].heading);
  };

  return (
    <div className="w-11/12 max-w-7xl mx-auto py-20">

      <div className="text-left mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
          Course Discovery
        </h2>
        <p className="text-gray-400 mt-2 text-sm md:text-base">
          Explore structured pathways, interactive modules, and hands-on developer tracks.
        </p>
      </div>

      <div className="flex flex-wrap justify-start">
        <div className="flex flex-wrap gap-1.5 bg-[#121215] border border-[#222228] p-1.5 rounded-full">

          {tabsName.map((tab, index) => (
            <button
              key={index}
              onClick={() => setMyCards(tab)}
              className={`px-5 py-2 rounded-full transition-all duration-200 text-xs md:text-sm font-medium
                ${
                  currentTab === tab
                    ? "bg-white text-gray-950 font-bold shadow-[0_2px_10px_rgba(255,255,255,0.15)]"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {courses.map((course, index) => (
          <CourseCard
            key={index}
            index={index}
            {...course}
            cardData={course}
            currentCard={currentCard}
            setCurrentCard={setCurrentCard}
          />
        ))}
      </div>

    </div>
  );
};

export default ExploreMore;
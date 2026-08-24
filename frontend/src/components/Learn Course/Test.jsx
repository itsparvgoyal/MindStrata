import React, { useState, useMemo } from 'react';
import { ClipboardList, Sparkles, CheckCircle2, XCircle, ArrowRight, RotateCcw, Trophy } from 'lucide-react';

const parseBoldText = (str) => {
  if (!str) return "";
  const parts = str.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
};

const parseQuizMarkdown = (markdownText) => {
  if (!markdownText) return [];

  const rawQuestions = markdownText.split(/###\s*Q\d+\.?/i);
  const questionsList = [];

  for (let i = 1; i < rawQuestions.length; i++) {
    const block = rawQuestions[i].trim();
    if (!block) continue;

    const lines = block.split('\n').map(line => line.trim());
    
    let questionText = "";
    let options = {};
    let correctAnswer = "";
    let explanation = "";

    let readingQuestion = true;
    
    for (let line of lines) {
      if (!line) continue;

      if (/^[A-D]\.\s+/i.test(line)) {
        readingQuestion = false;
        const optionLetter = line[0].toUpperCase();
        const optionValue = line.replace(/^[A-D]\.\s+/i, "").trim();
        options[optionLetter] = optionValue;
      } else if (/^\**Correct Answer:\**/i.test(line)) {
        let cleanAns = line.replace(/^\**Correct Answer:\**\s*/i, "").replace(/[\*\[\]\.]/g, "").trim().toUpperCase();
        if (cleanAns && cleanAns.length > 0) {
          correctAnswer = cleanAns[0]; 
        }
      } else if (/^\**Explanation:\**/i.test(line)) {
        explanation = line.replace(/^\**Explanation:\**\s*/i, "").replace(/[\*\[\]]/g, "").trim();
      } else if (readingQuestion) {
        questionText += (questionText ? "\n" : "") + line;
      } else {
        if (explanation) {
          explanation += " " + line;
        }
      }
    }

    if (questionText && Object.keys(options).length === 4 && correctAnswer) {
      questionsList.push({
        id: i,
        question: questionText,
        options,
        correctAnswer,
        explanation: explanation || "No explanation provided."
      });
    }
  }

  return questionsList;
};

const TestSection = ({ currentLecture }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Parse questions from currentLecture.extractedQuestions whenever it changes
  const questions = useMemo(() => {
    return parseQuizMarkdown(currentLecture?.extractedQuestions);
  }, [currentLecture?.extractedQuestions]);

  const questionsStatus = currentLecture?.questionsStatus || "PENDING";

  const handleSubmitAnswer = () => {
    if (!selectedOption || isSubmitted) return;
    
    const correctOption = questions[currentQuestionIndex]?.correctAnswer;
    if (selectedOption === correctOption) {
      setScore(prev => prev + 1);
    }
    setIsSubmitted(true);
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRetryQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setQuizCompleted(false);
  };

  // failed
  if (questionsStatus === "FAILED") {
    return (
      <div className="bg-[#121217] border border-[#22222a] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <ClipboardList size={20} className="text-indigo-400" />
            Lecture Quiz & Practice
          </h2>
          <p className="text-sm text-gray-400 mt-2 leading-relaxed">
            Test your understanding of the core concepts covered in this lecture.
          </p>
        </div>
        <hr className="border-[#22222a]" />
        <div className="relative overflow-hidden bg-gradient-to-r from-red-500/5 to-amber-500/5 border border-red-500/20 rounded-xl p-6 flex flex-col sm:flex-row items-center gap-4">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-2xl rounded-full pointer-events-none" />
          <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 shrink-0">
            <XCircle size={20} />
          </div>
          <div className="text-center sm:text-left">
            <h4 className="text-sm font-bold text-white">Quiz Not Available</h4>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed max-w-md">
              Quiz is currently not available for this lecture. We will be working on it.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // agar db me abhi nhi aya hua data
  if (questionsStatus === "PENDING" || questionsStatus === "PROCESSING" || questions.length === 0) {
    return (
      <div className="bg-[#121217] border border-[#22222a] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <ClipboardList size={20} className="text-indigo-400" />
            Lecture Quiz & Practice
          </h2>
          <p className="text-sm text-gray-400 mt-2 leading-relaxed">
            Test your understanding of the core concepts covered in this lecture.
          </p>
        </div>
        <hr className="border-[#22222a]" />
        <div className="relative overflow-hidden bg-gradient-to-r from-indigo-500/5 to-purple-500/5 border border-indigo-500/20 rounded-xl p-6 flex flex-col sm:flex-row items-center gap-4">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-2xl rounded-full pointer-events-none" />
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
            <Sparkles size={20} />
          </div>
          <div className="text-center sm:text-left">
            <h4 className="text-sm font-bold text-white">Interactive MCQs Coming Soon</h4>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed max-w-md">
              We are working on it! Soon there will be AI-generated MCQs based on this lecture to help you practice and test your knowledge.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#121217] border border-[#22222a] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <ClipboardList size={20} className="text-indigo-400" />
          Lecture Quiz & Practice
        </h2>
        <p className="text-sm text-gray-400 mt-2 leading-relaxed">
          Test your understanding of the core concepts covered in this lecture.
        </p>
      </div>

      <hr className="border-[#22222a]" />

      {quizCompleted ? (
        /* results Screen */
        (() => {
          const percentage = Math.round((score / questions.length) * 100);
          let badgeColor = "";
          let badgeText = "";
          let badgeDescription = "";
          
          if (percentage >= 80) {
            badgeColor = "text-amber-400 bg-amber-400/5 border-amber-400/20";
            badgeText = "Excellent!";
            badgeDescription = "You've shown a great understanding of the concepts explained in this lecture.";
          } else if (percentage >= 50) {
            badgeColor = "text-indigo-400 bg-indigo-400/5 border-indigo-500/20";
            badgeText = "Good effort!";
            badgeDescription = "You've captured the core topics. Review the summary and retry to master it.";
          } else {
            badgeColor = "text-rose-400 bg-rose-400/5 border-rose-500/20";
            badgeText = "Keep practicing!";
            badgeDescription = "Go back through the video or the smart summary and try again to improve your score.";
          }

          return (
            <div className="flex flex-col items-center text-center py-6 sm:py-10 space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Trophy size={36} />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white">Quiz Completed!</h3>
                <p className="text-sm text-gray-400">Here's how you performed on this lecture quiz</p>
              </div>
              
              <div className="flex items-baseline gap-1 bg-[#161622]/50 border border-[#22222a] px-6 py-4 rounded-2xl">
                <span className="text-4xl font-extrabold text-indigo-400">{score}</span>
                <span className="text-gray-500 text-lg">/</span>
                <span className="text-xl text-gray-300">{questions.length}</span>
              </div>

              <div className={`p-4 rounded-xl border max-w-sm ${badgeColor}`}>
                <p className="font-bold text-sm uppercase tracking-wider">{badgeText}</p>
                <p className="text-xs text-gray-300 mt-1 leading-relaxed">{badgeDescription}</p>
              </div>

              <button
                onClick={handleRetryQuiz}
                className="px-6 py-2.5 rounded-full text-xs font-bold bg-white text-gray-950 hover:bg-gray-100 shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-200 flex items-center gap-1.5 active:scale-95 cursor-pointer"
              >
                <RotateCcw size={14} />
                <span>Retry Quiz</span>
              </button>
            </div>
          );
        })()
      ) : (
        <div className="space-y-6">
          {/* progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs text-gray-400">
              <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
              <span>Score: {score}/{questions.length}</span>
            </div>
            <div className="w-full bg-[#161622] h-1.5 rounded-full overflow-hidden border border-[#22222a]">
              <div 
                className="bg-indigo-500 h-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* question  */}
          <div className="bg-[#161622]/50 border border-indigo-500/10 rounded-xl p-5 sm:p-6">
            <p className="text-white text-base font-semibold leading-relaxed">
              {parseBoldText(questions[currentQuestionIndex].question)}
            </p>
          </div>

          {/* Options wala part */}
          <div className="grid gap-3">
            {Object.entries(questions[currentQuestionIndex].options).map(([key, value]) => {
              const isCurrentSelected = selectedOption === key;
              const isCorrect = questions[currentQuestionIndex].correctAnswer === key;
              
              let btnClass = "w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between text-sm cursor-pointer ";
              let optionMarkerClass = "flex items-center justify-center w-6 h-6 rounded-lg font-bold text-xs shrink-0 select-none transition-colors duration-200 ";
              let textClass = "flex-1 mr-3 leading-relaxed ";
              let icon = null;

              if (!isSubmitted) {
                if (isCurrentSelected) {
                  btnClass += "bg-indigo-500/10 border-indigo-500 text-white shadow-[0_0_12px_rgba(99,102,241,0.15)] scale-[1.01]";
                  optionMarkerClass += "bg-indigo-500 text-white";
                  textClass += "text-white font-medium";
                } else {
                  btnClass += "bg-[#161622]/30 border-[#22222a] text-gray-400 hover:border-gray-650 hover:bg-[#161622]/60 hover:scale-[1.005]";
                  optionMarkerClass += "bg-[#1c1c24] border border-[#2c2c38] text-gray-500";
                }
              } else {
                // submitted state
                if (isCorrect) {
                  btnClass += "bg-emerald-500/10 border-emerald-500 text-emerald-400 font-medium";
                  optionMarkerClass += "bg-emerald-500 text-gray-950";
                  icon = <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />;
                } else if (isCurrentSelected && !isCorrect) {
                  btnClass += "bg-rose-500/10 border-rose-500 text-rose-400 font-medium";
                  optionMarkerClass += "bg-rose-500 text-white";
                  icon = <XCircle size={16} className="text-rose-400 shrink-0" />;
                } else {
                  btnClass += "bg-[#161622]/10 border-[#22222a]/50 text-gray-600 cursor-not-allowed";
                  optionMarkerClass += "bg-[#1c1c24]/50 border border-[#2c2c38]/50 text-gray-700";
                }
              }

              return (
                <button
                  key={key}
                  onClick={() => !isSubmitted && setSelectedOption(key)}
                  disabled={isSubmitted}
                  className={btnClass}
                >
                  <div className="flex items-center gap-3 w-full">
                    <span className={optionMarkerClass}>{key}</span>
                    <span className={textClass}>{parseBoldText(value)}</span>
                  </div>
                  {icon}
                </button>
              );
            })}
          </div>

           {/*solution wala box  */}
          {isSubmitted && (
            <div className="bg-indigo-950/10 border border-indigo-500/10 rounded-xl p-4 sm:p-5 space-y-2 transition-all duration-200">
              <p className="text-indigo-400 text-xs font-bold uppercase tracking-wider">Explanation</p>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                {parseBoldText(questions[currentQuestionIndex].explanation)}
              </p>
            </div>
          )}

          <div className="flex justify-end pt-2">
            {!isSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={!selectedOption}
                className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-1.5 active:scale-95 cursor-pointer
                  ${selectedOption
                    ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:scale-105"
                    : "bg-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed"
                  }`}
              >
                <span>Submit Answer</span>
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-6 py-2.5 rounded-full text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:scale-105 transition-all duration-200 flex items-center gap-1.5 active:scale-95 cursor-pointer"
              >
                <span>{currentQuestionIndex === questions.length - 1 ? "Finish Quiz" : "Next Question"}</span>
                <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TestSection;

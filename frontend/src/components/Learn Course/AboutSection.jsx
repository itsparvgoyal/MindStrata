import React, { useMemo } from 'react';
import { BookOpen } from 'lucide-react';

const parseInlineMarkdown = (text) => {
  if (!text) return "";

  const parts = text.split(/(`[^`]+`)/g);

  return parts.map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      const codeText = part.slice(1, -1);
      return (
        <code key={`code-${i}`} className="bg-[#1c1c24] border border-[#2a2a35] px-1.5 py-0.5 rounded text-rose-400 font-mono text-xs mx-0.5">
          {codeText}
        </code>
      );
    }

    const boldParts = part.split(/(\*\*.*?\*\*)/g);
    return boldParts.map((subPart, j) => {
      if (subPart.startsWith("**") && subPart.endsWith("**")) {
        return (
          <strong key={`bold-${i}-${j}`} className="font-semibold text-white">
            {subPart.slice(2, -2)}
          </strong>
        );
      }
      return subPart;
    });
  });
};

const renderFormattedSummary = (text) => {
  if (!text) return null;

  const lines = text.split("\n");

  return lines.map((line, index) => {
    const trimmed = line.trim();

    if (trimmed === "") {
      return <div key={index} className="h-3.5" />;
    }

    if (/^[-_*]{2,}$/.test(trimmed)) {
      return <hr key={index} className="border-gray-800 my-4" />;
    }

    if (trimmed.startsWith("#")) {
      if (/^#+\s*PART\s*1/i.test(trimmed)) {
        return null;
      }

      const level = (trimmed.match(/^#+/) || ["#"])[0].length;
      const headingText = trimmed.replace(/^#+\s*/, "");

      let headingClass = "font-bold text-white tracking-tight ";
      if (level === 1) {
        headingClass += "text-2xl mt-6 mb-3";
      } else if (level === 2) {
        headingClass += "text-xl mt-5 mb-2.5";
      } else if (level === 3) {
        headingClass += "text-lg mt-4 mb-2";
      } else {
        headingClass += "text-base mt-3 mb-1.5";
      }

      return (
        <h3 key={index} className={headingClass}>
          {parseInlineMarkdown(headingText)}
        </h3>
      );
    }

    if (trimmed.startsWith("-") || trimmed.startsWith("*") || trimmed.startsWith("•")) {
      const bulletText = trimmed.replace(/^[-*•]\s*/, "");
      
      const isConcept = /^\*\*Concept:?\*\*[:\s]*/i.test(bulletText);
      const isExplanation = /^\*\*Explanation:?\*\*[:\s]*/i.test(bulletText);
      
      if (isConcept) {
        const valueText = bulletText.replace(/^\*\*Concept:?\*\*[:\s]*/i, "");
        return (
          <h4 key={index} className="font-bold text-indigo-400 text-base mt-5 mb-1.5">
            {parseInlineMarkdown(valueText)}
          </h4>
        );
      }
      
      if (isExplanation) {
        const valueText = bulletText.replace(/^\*\*Explanation:?\*\*[:\s]*/i, "");
        return (
          <p key={index} className="text-gray-300 text-sm sm:text-base leading-relaxed my-1">
            {parseInlineMarkdown(valueText)}
          </p>
        );
      }
      
      return (
        <div key={index} className="flex items-start gap-2 ml-4 my-1.5 text-gray-300 text-sm">
          <span className="text-indigo-400 mt-1 shrink-0 select-none">•</span>
          <span className="leading-relaxed">{parseInlineMarkdown(bulletText)}</span>
        </div>
      );
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      const itemText = trimmed.replace(/^\d+\.\s+/, "");
      const number = (trimmed.match(/^\d+/) || ["1"])[0];
      return (
        <div key={index} className="flex items-start gap-2.5 my-1.5 text-gray-300 text-sm">
          <span className="text-gray-500 font-mono text-xs shrink-0 mt-0.5 select-none">{number}.</span>
          <span className="leading-relaxed">{parseInlineMarkdown(itemText)}</span>
        </div>
      );
    }

    return (
      <p key={index} className="text-gray-300 text-sm sm:text-base leading-relaxed my-2.5">
        {parseInlineMarkdown(line)}
      </p>
    );
  });
};

const AboutSection = ({ currentLecture }) => {
  return (
    <div className="bg-[#121217] border border-[#22222a] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <BookOpen size={20} className="text-indigo-400" />
          {currentLecture?.title || "Lecture Details"}
        </h2>
        <p className="text-sm text-gray-400 mt-3 leading-relaxed">
          {currentLecture?.description || "No description provided for this lecture."}
        </p>
      </div>

      <hr className="border-[#22222a]" />

      {currentLecture?.summaryStatus === "COMPLETED" && currentLecture?.summary ? (
        <div className="space-y-4 pt-2">
          <h3 className="text-sm font-bold text-gray-400 tracking-wider uppercase">
            Lesson Summary
          </h3>
          <div className="text-gray-300 text-sm font-sans space-y-1">
            {renderFormattedSummary(currentLecture.summary)}
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-gray-500 pt-5 border-t border-[#22222a]/60 mt-6">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-600" />
            <span>AI can make mistakes. Please refer to the lecture video for proper details.</span>
          </div>
        </div>
      ) : (
        <div className="relative overflow-hidden bg-gradient-to-r from-indigo-500/5 to-purple-500/5 border border-indigo-500/20 rounded-xl p-6 flex flex-col sm:flex-row items-center gap-4">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-2xl rounded-full pointer-events-none" />

          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
            <BookOpen size={20} />
          </div>

          <div className="text-center sm:text-left">
            <h4 className="text-sm font-bold text-white">Smart Summary Generation</h4>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed max-w-md">
              We are working on bringing AI-powered lecture transcriptions and automatic smart summaries here soon!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutSection;

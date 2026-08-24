import React, { useState, useEffect } from 'react';
import { FileText, Save, RotateCcw } from 'lucide-react';
import toast from 'react-hot-toast';

const NotesSection = ({ courseId, subSectionId }) => {
  const [note, setNote] = useState("");

  // Load note when lecture changes
  useEffect(() => {
    if (courseId && subSectionId) {
      const savedNote = localStorage.getItem(`note_${courseId}_${subSectionId}`) || "";
      setNote(savedNote);
    }
  }, [courseId, subSectionId]);

  const handleSave = () => {
    if (!courseId || !subSectionId) return;
    localStorage.setItem(`note_${courseId}_${subSectionId}`, note);
    toast.success("Note saved successfully!");
  };

  const handleReset = () => {
    setNote("");
  };

  return (
    <div className="bg-[#121217] border border-[#22222a] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
      {/* Title */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <FileText size={20} className="text-indigo-400" />
            Lecture Notes
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Jot down key takeaways. Notes are saved automatically to your browser.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 font-semibold px-3 py-1.5 rounded-full text-[10px] text-gray-400 hover:text-white bg-white/5 border border-[#2a2a34] hover:border-gray-500 transition-all duration-200 cursor-pointer active:scale-95"
            title="Clear all text"
          >
            <RotateCcw size={12} />
            <span>Clear</span>
          </button>

          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 font-bold px-4 py-1.5 rounded-full text-[10px] text-gray-950 bg-white hover:bg-gray-100 transition-all duration-200 cursor-pointer active:scale-95 shadow-[0_0_10px_rgba(255,255,255,0.1)]"
          >
            <Save size={12} />
            <span>Save Note</span>
          </button>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-[#22222a]" />

      {/* Notepad Textarea */}
      <div className="relative">
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Start typing your notes for this lecture here..."
          className="w-full h-64 bg-[#09090b] border border-[#22222a] focus:border-indigo-500/40 rounded-xl p-4 text-sm text-gray-200 placeholder-gray-600 focus:outline-none resize-none transition-colors duration-200"
        />
        <div className="absolute bottom-3 right-3 text-[10px] text-gray-600 font-mono">
          {note.length} characters
        </div>
      </div>
    </div>
  );
};

export default NotesSection;

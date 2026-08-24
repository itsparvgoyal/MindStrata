import React from 'react';
import { MessageSquare, ShieldAlert } from 'lucide-react';

const QASection = () => {
  return (
    <div className="bg-[#121217] border border-[#22222a] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <MessageSquare size={20} className="text-indigo-400" />
          Discussion Board
        </h2>
        <p className="text-sm text-gray-400 mt-2">
          Ask questions, share thoughts, and learn together with fellow students.
        </p>
      </div>

      <hr className="border-[#22222a]" />

      <div className="space-y-4 opacity-50 select-none pointer-events-none">
        <div className="bg-[#1c1c24]/40 border border-[#2a2a34] p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold flex items-center justify-center">WW</div>
            <span className="text-xs font-semibold text-white">Wade Warren</span>
            <span className="text-[10px] text-gray-500">2 hours ago</span>
          </div>
          <p className="text-xs font-bold text-white mb-1">Is it better to use standard callbacks or async/await?</p>
          <p className="text-xs text-gray-400">Generally, async/await is cleaner and avoids callback hell...</p>
        </div>

        <div className="bg-[#1c1c24]/40 border border-[#2a2a34] p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold flex items-center justify-center">JC</div>
            <span className="text-xs font-semibold text-white">Jane Cooper</span>
            <span className="text-[10px] text-gray-500">Yesterday</span>
          </div>
          <p className="text-xs font-bold text-white mb-1">How can I debug state rendering in React 19?</p>
          <p className="text-xs text-gray-400">React DevTools supports React 19 rendering profiling...</p>
        </div>
      </div>

      <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-5 flex items-start gap-4">
        <ShieldAlert className="text-amber-500 shrink-0 mt-0.5" size={20} />
        <div>
          <h4 className="text-sm font-bold text-white">Discussion Board Coming Soon</h4>
          <p className="text-xs text-gray-400 mt-1 leading-relaxed">
            We are building a collaborative community forum. Once rolled out, you will be able to post queries directly to course mentors and interact with peers here!
          </p>
        </div>
      </div>
    </div>
  );
};

export default QASection;

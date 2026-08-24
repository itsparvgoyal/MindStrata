import React, { useState } from "react";
import ExploreMore from "../components/HomePage/ExploreMore";
import CTAButton from "../components/common/CTAButton";
import Mentor from "../components/common/Mentor";
import { FiClock, FiCode, FiTrendingUp, FiAward, FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import { FaBook, FaShoppingCart, FaUser, FaCog } from "react-icons/fa";

export const Home = () => {
  const [activeTab, setActiveTab] = useState("domain");
  const [challengeState, setChallengeState] = useState("idle"); // "idle", "running", "passed"
  const [consoleLogs, setConsoleLogs] = useState([]);

  const runChallengeTests = () => {
    if (challengeState === "passed") {
      setChallengeState("idle");
      setConsoleLogs([]);
      return;
    }

    setChallengeState("running");
    setConsoleLogs(["// Learning resources"]);

    setTimeout(() => {
      setConsoleLogs((prev) => [
        ...prev,
        "✓ Lecture ready",
      ]);
    }, 450);

    setTimeout(() => {
      setConsoleLogs((prev) => [
        ...prev,
        "✓ AI Summary ready",
      ]);
    }, 900);

    setTimeout(() => {
      setConsoleLogs((prev) => [
        ...prev,
        "✓ AI Test ready",
      ]);
    }, 1350);

    setTimeout(() => {
      setConsoleLogs((prev) => [
        ...prev,
        "DONE ☑️"
      ]);
      setChallengeState("passed");
    }, 1800);
  };

  return (
    <div className="bg-[#09090b] text-gray-100 min-h-screen font-sans selection:bg-indigo-500 selection:text-white">

      <div className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-600/15 via-emerald-500/10 to-purple-500/15 blur-[120px] pointer-events-none rounded-full" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#16161a] border border-[#2a2a34] mb-6">
          <span className="text-gray-300 text-xs font-semibold tracking-wider">
            Learn. Build. Get Better.
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.08]">
          Learn to code by <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            actually building.
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Learn platform's dynamic video lessons and hands-on approach and real-world project learning platform.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <CTAButton variant="white" linkto="/courses">
            Explore Courses
          </CTAButton>
          <CTAButton variant="dark" linkto="/signup">
            Start Learning Free →
          </CTAButton>
        </div>

        <div className="mt-14 max-w-5xl mx-auto text-left relative">
          <div className="relative rounded-2xl border border-[#22222a] bg-[#0d0d11] p-3 sm:p-5 shadow-[0_20px_80px_rgba(0,0,0,0.8)] overflow-hidden">

            <div className="flex items-center justify-between pb-4 border-b border-[#1c1c24] mb-4 px-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <div className="text-xs text-gray-500 font-mono">mindstrata.dev/workspace</div>
              <div className="w-12" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

              <div className="hidden md:block md:col-span-3 bg-[#13131a] border border-[#20202a] rounded-xl p-3 space-y-3">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2">Dashboard</div>

                <div className="space-y-1">
                  <button
                    type="button"
                    onClick={() => setActiveTab("domain")}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${activeTab === "domain"
                        ? "bg-indigo-500/10 border border-indigo-500/25 text-indigo-300"
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                      }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${activeTab === "domain" ? "bg-indigo-400" : "bg-gray-500"}`} />
                    <span>Domain</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("courses")}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${activeTab === "courses"
                        ? "bg-indigo-500/10 border border-indigo-500/25 text-indigo-300"
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                      }`}
                  >
                    <FaBook size={12} className={activeTab === "courses" ? "text-indigo-400" : "text-gray-500"} />
                    <span>Courses</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("cart")}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${activeTab === "cart"
                        ? "bg-indigo-500/10 border border-indigo-500/25 text-indigo-300"
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                      }`}
                  >
                    <FaShoppingCart size={12} className={activeTab === "cart" ? "text-indigo-400" : "text-gray-500"} />
                    <span>Cart</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("profile")}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${activeTab === "profile"
                        ? "bg-indigo-500/10 border border-indigo-500/25 text-indigo-300"
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                      }`}
                  >
                    <FaUser size={12} className={activeTab === "profile" ? "text-indigo-400" : "text-gray-500"} />
                    <span>Profile</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("settings")}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${activeTab === "settings"
                        ? "bg-indigo-500/10 border border-indigo-500/25 text-indigo-300"
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                      }`}
                  >
                    <FaCog size={12} className={activeTab === "settings" ? "text-indigo-400" : "text-gray-500"} />
                    <span>Settings</span>
                  </button>
                </div>
              </div>

              <div className="md:col-span-9 bg-[#121217] border border-[#20202a] rounded-xl p-4 sm:p-5 flex flex-col gap-4 min-h-[290px] justify-between">

                {activeTab === "domain" && (
                  <>
                    <div className="flex items-center justify-between border-b border-[#20202a] pb-3">
                      <div>
                        <h4 className="text-sm font-bold text-white">Project Dashboard</h4>
                        <p className="text-xs text-gray-400">Interactive workspace preview</p>
                      </div>
                      <span className="px-2.5 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[11px] font-medium animate-pulse">
                        Active Session
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="bg-[#181820] border border-[#282834] rounded-lg p-3">
                        <div className="flex justify-between items-center text-xs mb-2">
                          <span className="text-gray-300 font-medium">Data Structures & Algorithms</span>
                          <span className="text-emerald-400 font-mono">78%</span>
                        </div>
                        <div className="w-full bg-[#0a0a0d] h-2 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full w-[78%] rounded-full" />
                        </div>
                      </div>

                      <div className="bg-[#181820] border border-[#282834] rounded-lg p-3">
                        <div className="flex justify-between items-center text-xs mb-2">
                          <span className="text-gray-300 font-medium">Full Stack Web Dev</span>
                          <span className="text-cyan-400 font-mono">92%</span>
                        </div>
                        <div className="w-full bg-[#0a0a0d] h-2 rounded-full overflow-hidden">
                          <div className="bg-cyan-500 h-full w-[92%] rounded-full" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#0a0a0e] border border-[#1e1e28] rounded-lg p-3 font-mono text-xs text-gray-300 leading-relaxed overflow-x-auto">
                      <p className="text-indigo-400">// Real-world project learning</p>
                      <p><span className="text-purple-400">async function</span> <span className="text-blue-400">buildFuture</span>() &#123;</p>
                      <p className="pl-4"><span className="text-purple-400">const</span> skills = <span className="text-amber-300">await</span> MindStrata.<span className="text-emerald-400">master</span>();</p>
                      <p className="pl-4"><span className="text-purple-400">return</span> skills.<span className="text-cyan-400">deployProjects</span>();</p>
                      <p>&#125;</p>
                    </div>
                  </>
                )}

                {activeTab === "courses" && (
                  <>
                    <div className="flex items-center justify-between border-b border-[#20202a] pb-3">
                      <div>
                        <h4 className="text-sm font-bold text-white">Featured Courses</h4>
                        <p className="text-xs text-gray-400">Premium learning pathways</p>
                      </div>
                      <span className="px-2.5 py-1 rounded-md bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 text-[11px] font-medium">
                        Explore All
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-auto">
                      <div className="bg-[#181820] border border-[#282834] p-3 rounded-lg flex flex-col justify-between h-[110px]">
                        <div>
                          <span className="text-[9px] uppercase font-bold text-indigo-400 tracking-wider bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/15 w-fit">Development</span>
                          <h5 className="text-xs font-bold text-white mt-1.5">Advanced React & Redux Toolkit</h5>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs font-bold text-gray-200">₹1,499</span>
                          <span className="text-[10px] text-gray-500 font-medium">12 Lectures</span>
                        </div>
                      </div>

                      <div className="bg-[#181820] border border-[#282834] p-3 rounded-lg flex flex-col justify-between h-[110px]">
                        <div>
                          <span className="text-[9px] uppercase font-bold text-emerald-400 tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/15 w-fit">Data Science</span>
                          <h5 className="text-xs font-bold text-white mt-1.5">Machine Learning & Python AI</h5>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs font-bold text-gray-200">₹2,999</span>
                          <span className="text-[10px] text-gray-500 font-medium">18 Lectures</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {activeTab === "cart" && (
                  <>
                    <div className="flex items-center justify-between border-b border-[#20202a] pb-3">
                      <div>
                        <h4 className="text-sm font-bold text-white">Your Shopping Cart</h4>
                        <p className="text-xs text-gray-400">1 Course added to checkout</p>
                      </div>
                      <span className="px-2.5 py-1 rounded-md bg-white/10 border border-white/20 text-white text-[11px] font-medium">
                        Discount Active
                      </span>
                    </div>

                    <div className="bg-[#181820] border border-[#282834] rounded-lg p-4 flex flex-col gap-3 my-auto">
                      <div className="flex justify-between items-center gap-4 flex-wrap border-b border-[#242430] pb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-8 rounded bg-slate-800 border border-slate-700 overflow-hidden flex items-center justify-center text-[10px] text-gray-500 font-bold shrink-0">16:9</div>
                          <div>
                            <h5 className="text-xs font-bold text-white">UI/UX Design Masterclass</h5>
                            <p className="text-[10px] text-gray-500">By Sarah Connor</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-white">₹999</span>
                      </div>

                      <div className="flex justify-between items-center text-xs mt-1">
                        <div className="text-gray-400">Total Price: <span className="text-white font-bold ml-1">₹899</span> <span className="line-through text-gray-600 text-[10px] ml-1">₹999</span></div>
                        <button className="bg-white hover:bg-gray-100 text-gray-950 font-bold px-4 py-1.5 rounded-lg text-[10px] shadow-[0_0_10px_rgba(255,255,255,0.15)] transition-all cursor-pointer">
                          Checkout
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {activeTab === "profile" && (
                  <>
                    <div className="flex items-center justify-between border-b border-[#20202a] pb-3">
                      <div>
                        <h4 className="text-sm font-bold text-white">Your Profile</h4>
                        <p className="text-xs text-gray-400">Student overview</p>
                      </div>
                      <span className="px-2.5 py-1 rounded-md bg-purple-500/15 border border-purple-500/30 text-purple-400 text-[11px] font-medium">
                        Level 4
                      </span>
                    </div>

                    <div className="bg-[#181820] border border-[#282834] rounded-lg p-4 flex flex-col gap-4 my-auto">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white text-xs shadow-md">
                          AM
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-white">Alex Mercer</h5>
                          <p className="text-[10px] text-gray-400">alex.mercer@gmail.com</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-center">
                        <div className="bg-[#13131a] border border-[#20202a] p-2 rounded-lg">
                          <div className="text-sm font-bold text-white">4</div>
                          <div className="text-[9px] uppercase font-bold text-gray-500 tracking-wider">Enrolled</div>
                        </div>
                        <div className="bg-[#13131a] border border-[#20202a] p-2 rounded-lg">
                          <div className="text-sm font-bold text-white">2</div>
                          <div className="text-[9px] uppercase font-bold text-gray-500 tracking-wider">Completed</div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {activeTab === "settings" && (
                  <>
                    <div className="flex items-center justify-between border-b border-[#20202a] pb-3">
                      <div>
                        <h4 className="text-sm font-bold text-white">Account Settings</h4>
                        <p className="text-xs text-gray-400">Preferences & settings</p>
                      </div>
                      <span className="px-2.5 py-1 rounded-md bg-gray-800 border border-[#242430] text-gray-300 text-[11px] font-medium">
                        Active
                      </span>
                    </div>

                    <div className="bg-[#181820] border border-[#282834] rounded-lg p-4 flex flex-col gap-3 my-auto">
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-gray-300">Email Notifications</span>
                        <div className="w-7 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-end p-0.5 cursor-pointer">
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-gray-300">Dark Mode Workspace</span>
                        <div className="w-7 h-4 rounded-full bg-[#1c1c24] border border-[#2c2c36] flex items-center justify-start p-0.5 cursor-pointer">
                          <div className="w-2.5 h-2.5 rounded-full bg-gray-500" />
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-gray-300">Auto-Save Notepad</span>
                        <div className="w-7 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-end p-0.5 cursor-pointer">
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                        </div>
                      </div>
                    </div>
                  </>
                )}

              </div>

            </div>
          </div>
        </div>
      </div>

      <div className="border-y border-[#1e1e26] bg-[#0c0c0f] py-10">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 text-center mb-8">
            Trust / Social Proof
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-[#20202a]">
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-white">10K+</div>
              <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">learners</div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-white">200+</div>
              <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">courses</div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-white">50+</div>
              <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">mentors</div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-white">4.8/5</div>
              <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">rating</div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-2">
          Learn by Building
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          <div className="lg:col-span-5">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-6">
              Don't just watch. <br />
              <span className="bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">Build.</span>
            </h2>
            <p className="text-gray-400 text-base leading-relaxed mb-6">
              MindStrata connects a logical learning process with hands-on project creation. Move from basic syntax directly into production-ready software.
            </p>
            <CTAButton variant="dark" linkto="/courses">
              Explore Pathway →
            </CTAButton>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-[#121217] border border-[#22222c] rounded-2xl p-6 sm:p-8 shadow-2xl relative">
              <div className="flex items-center gap-2 mb-6 border-b border-[#20202a] pb-4">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                <span className="text-xs text-gray-400 font-mono ml-2">learning-process.workflow</span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 py-6">
                <div className="px-4 py-2 rounded-xl bg-[#1c1c26] border border-indigo-500/40 text-indigo-300 text-xs sm:text-sm font-semibold shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                  Course
                </div>
                <FiArrowRight className="text-gray-600" />
                <div className="px-4 py-2 rounded-xl bg-[#1c1c26] border border-cyan-500/40 text-cyan-300 text-xs sm:text-sm font-semibold shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                  Lesson
                </div>
                <FiArrowRight className="text-gray-600" />
                <div className="px-4 py-2 rounded-xl bg-[#1c1c26] border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-semibold shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                  Code
                </div>
                <FiArrowRight className="text-gray-600" />
                <div className="px-4 py-2 rounded-xl bg-[#1c1c26] border border-white/20 text-white text-xs sm:text-sm font-semibold shadow-[0_0_15px_rgba(255,255,255,0.08)]">
                  Project
                </div>
                <FiArrowRight className="text-gray-600" />
                <div className="px-4 py-2 rounded-xl bg-[#1c1c26] border border-purple-500/40 text-purple-300 text-xs sm:text-sm font-semibold shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                  Progress
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      <ExploreMore />

      <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-2">
          Product / Learning Experience
        </p>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-10">
          Built for real developers
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-[#121217] border border-[#22222a] rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                <HiSparkles size={20} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Learn to choose MindStrata
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Learn from people who have built, shipped and joined real products. Accelerate your career with guided practice.
              </p>
            </div>
            <div className="mt-8">
              <CTAButton variant="dark" linkto="/signup">
                Get Started →
              </CTAButton>
            </div>
          </div>

          <div className="bg-[#121217] border border-[#22222a] hover:border-cyan-500/40 rounded-2xl p-6 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
              <FiClock size={20} />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Learn at your pace</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Learn at your pace with structured modules, on-demand video lessons, and personalized practice tasks.
            </p>
          </div>

          <div className="bg-[#121217] border border-[#22222a] hover:border-emerald-500/40 rounded-2xl p-6 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
              <FiCode size={20} />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Build real projects</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Build top projects that showcase real solution architecture and industry-standard developer tools.
            </p>
          </div>

          <div className="bg-[#121217] border border-[#22222a] hover:border-indigo-500/40 rounded-2xl p-6 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
              <FiTrendingUp size={20} />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Track your progress</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Detailed analytics on your skill retention, completed modules, and code review feedback.
            </p>
          </div>

          <div className="bg-[#121217] border border-[#22222a] hover:border-white/30 rounded-2xl p-6 transition-all duration-300 group md:col-span-2 lg:col-span-1">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
              <FiAward size={20} />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Learn from experienced mentors</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Direct guidance from senior engineers who have built, scaled, and deployed production systems.
            </p>
          </div>

        </div>
      </div>

      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-2">
            Mentor / Instructor
          </p>
        </div>
        <Mentor />
      </div>

      <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative overflow-hidden bg-gradient-to-b from-[#14141a] to-[#0d0d12] border border-[#242430] rounded-3xl p-8 sm:p-14 shadow-2xl flex flex-col lg:flex-row items-center gap-10">

          <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

          <div className="w-full lg:w-1/2 flex flex-col text-left relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">
              Turn Your Curiosity <br />
              Into Real Skills.
            </h2>

            <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-8 max-w-lg">
              Learn at your own pace with high-quality courses, engaging lectures, progress tracking, and everything you need to keep moving forward.
            </p>

            <div className="flex flex-wrap gap-4">
              <CTAButton variant="white" linkto="/courses">
                Explore Courses
              </CTAButton>
              <CTAButton variant="dark" linkto="/signup">
                Create Free Account
              </CTAButton>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="w-full max-w-md bg-[#0a0a0f] border border-[#242430] rounded-2xl overflow-hidden shadow-2xl flex flex-col text-left font-mono text-xs relative z-10">

              <div className="flex items-center justify-between bg-[#111116] px-4 py-3 border-b border-[#242430] select-none">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                  <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                  <div className="w-2 h-2 rounded-full bg-[#27c93f]" />
                  <span className="text-[10px] text-gray-500 ml-2">learningPath.cpp</span>
                </div>

                <span className="text-[10px] text-gray-400 font-semibold mr-2 font-mono">
                  {challengeState === "idle" && "Ready"}
                  {challengeState === "running" && "Processing.."}
                  {challengeState === "passed" && "Done"}
                </span>
              </div>

              <div className="p-4 bg-[#0a0a0f] text-gray-300 leading-relaxed overflow-x-auto min-h-[140px] flex flex-col justify-center font-mono text-xs">
                <p className="text-gray-500">// Your path to mastery</p>
                <p className="mt-2"><span className="text-purple-400">class</span> <span className="text-blue-400">Lecture</span> &#123;</p>
                <p><span className="text-purple-400">public</span>:</p>
                <p className="pl-4"><span className="text-purple-400">void</span> <span className="text-blue-300">learn</span>() &#123;</p>
                <p className="pl-8">watch();</p>
                <p className="pl-8">reviewSummary();</p>
                <p className="pl-8">practice();</p>
                <p className="pl-4">&#125;</p>
                <p>&#125;;</p>
              </div>

              <div className="bg-[#050508] border-t border-[#202028] p-4 min-h-[120px] flex flex-col gap-1 text-[11px] font-mono select-none">
                {consoleLogs.length === 0 ? (
                  <>
                    <p className="text-gray-500">// Learning resources</p>
                    <p className="text-gray-700 mt-1">// Click "Start Learning" below to execute your path...</p>
                  </>
                ) : (
                  consoleLogs.map((log, index) => {
                    const isCheck = log.startsWith("✓") || log.startsWith("✔");
                    const isGrad = log.startsWith("🎓");
                    const isComment = log.startsWith("//");
                    const isIndented = log.startsWith("   ");

                    let textColor = "text-gray-400";
                    if (isCheck) textColor = "text-emerald-400 font-semibold";
                    else if (isGrad || isIndented) textColor = "text-indigo-300 font-bold mt-1";
                    else if (isComment) textColor = "text-gray-500";

                    return (
                      <p key={index} className={`${textColor} animate-fade-in`}>
                        {log}
                      </p>
                    );
                  })
                )}
              </div>

              <div className="bg-[#0c0c12] border-t border-[#242430] px-4 py-2.5 flex justify-between items-center select-none">
                <span className="text-[10px] text-gray-500 font-sans tracking-wide">MindStrata + AI</span>
                <button
                  type="button"
                  onClick={runChallengeTests}
                  disabled={challengeState === "running"}
                  className={`px-3.5 py-1.5 rounded-lg text-[10px] font-bold font-sans cursor-pointer transition-all duration-200 ${challengeState === "passed"
                      ? "bg-white hover:bg-neutral-100 text-black shadow-[0_0_10px_rgba(255,255,255,0.15)]"
                      : "bg-white hover:bg-gray-100 text-gray-950 shadow-[0_0_10px_rgba(255,255,255,0.15)] disabled:opacity-50"
                    }`}
                >
                  {challengeState === "passed"
                    ? "Reset Path"
                    : challengeState === "running"
                      ? "Processing..."
                      : "Start Learning"}
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

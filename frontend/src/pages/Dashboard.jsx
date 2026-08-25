import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar.jsx";
import { useState } from "react";
import CollapsedSidebar from "../components/Dashboard/CollapsedSidebar.jsx";
import { HiMenu, HiX } from "react-icons/hi";

const Dashboard = () => {
    const [menu, setMenu] = useState(true);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    return (
        <div className="flex h-[calc(100vh-64px)] bg-[#09090b] text-gray-100 overflow-hidden relative">
            <div className="hidden md:flex shrink-0">
                {menu ? <Sidebar setMenu={setMenu} /> : <CollapsedSidebar setCollapsed={setMenu} />}
            </div>

            {mobileSidebarOpen && (
                <div className="md:hidden fixed inset-0 z-50 flex">
                    <div
                        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300"
                        onClick={() => setMobileSidebarOpen(false)}
                    />

                    <div className="relative flex w-auto max-w-[260px] h-full flex-1 flex-col bg-[#0d0d11] border-r border-[#1e1e26] shadow-2xl transition-transform duration-300">
                        <div className="absolute top-4 right-4 z-50">
                            <button
                                onClick={() => setMobileSidebarOpen(false)}
                                className="p-1.5 rounded-lg bg-[#16161c] border border-[#242430] text-gray-400 hover:text-white cursor-pointer"
                            >
                                <HiX size={18} />
                            </button>
                        </div>

                        <Sidebar
                            setMenu={setMenu}
                            isMobile={true}
                            closeMobileMenu={() => setMobileSidebarOpen(false)}
                        />
                    </div>
                </div>
            )}

            <div className="flex-1 h-[calc(100vh-64px)] overflow-y-auto bg-[#09090b] p-4 sm:p-6 md:p-10 relative">
                <div className="md:hidden flex items-center gap-3 mb-6 bg-[#0f0f13] border border-[#1e1e24] p-3 rounded-2xl">
                    <button
                        onClick={() => setMobileSidebarOpen(true)}
                        className="p-2 rounded-xl bg-[#16161c] border border-[#242430] text-gray-400 hover:text-white transition-colors cursor-pointer"
                        title="Open Menu"
                    >
                        <HiMenu size={20} />
                    </button>
                    <span className="font-extrabold text-white text-base tracking-tight">Dashboard Navigation</span>
                </div>

                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
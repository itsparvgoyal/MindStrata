import React, { useState } from "react";
import { FaUser, FaBook, FaShoppingCart, FaCog, FaSignOutAlt, FaBars } from "react-icons/fa";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { setUser, setToken } from "../../redux/slices/authSlice.js";
import ConfirmModal from "../common/ConfirmModal";
import api from "../../services/service";

const CollapsedSidebar = ({ setCollapsed }) => {
  const [modalData, setModalData] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.rootReducer?.auth?.user);
  const role = user?.accountType;
  const navigate = useNavigate();

  const links = [
    {
      name: "Profile",
      icon: <FaUser size={16} />,
      path: "/dashboard/profile",
    },
    {
      name: "My Courses",
      icon: <FaBook size={16} />,
      path: "/dashboard/enrolledCourses",
    },
    {
      name: "Cart",
      icon: <FaShoppingCart size={16} />,
      path: "/dashboard/cart",
    },
    {
      name: "Settings",
      icon: <FaCog size={16} />,
      path: "/dashboard/settings",
    },
    {
      name: "Logout",
      icon: <FaSignOutAlt size={16} />,
    },
  ];

  async function logout() {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Error logging out from server:", error);
    } finally {
      dispatch(setToken(null));
      dispatch(setUser(null));
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("refreshToken");
      toast.success("Logged Out");
      navigate("/login", { replace: true });
    }
  }

  return (
    <>
      <div className="w-16 h-[calc(100vh-64px)] bg-[#0d0d11] border-r border-[#1e1e26] flex flex-col items-center py-4 shrink-0 select-none">

        <button
          onClick={() => setCollapsed(true)}
          className="p-2.5 rounded-lg bg-[#16161c] border border-[#242430] text-gray-400 hover:text-white transition-colors cursor-pointer"
          title="Expand Sidebar"
        >
          <FaBars size={14} />
        </button>

        <div className="w-8 border-b border-[#1e1e26] my-4" />

        <div className="flex flex-col gap-3 items-center w-full px-2">
          {links.map((item, index) => {
            if (item.name === "Logout") {
              return (
                <div key={index} className="group relative">
                  <button
                    onClick={() =>
                      setModalData({
                        text1: "Logout",
                        text2: "Are you sure you want to logout?",
                        btn1Text: "Logout",
                        btn2Text: "Cancel",

                        btn1Handler: () => {
                          logout();
                          setModalData(null);
                        },

                        btn2Handler: () => {
                          setModalData(null);
                        },
                      })
                    }
                    className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer mt-3 border-t border-[#1e1e26] pt-3"
                  >
                    <FaSignOutAlt size={16} />
                  </button>

                  <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-[#181820] border border-[#2a2a34] text-white text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all pointer-events-none z-50 shadow-xl">
                    Logout
                  </div>
                </div>
              );
            }

            if (role === "Instructor" && item.name === "Cart") {
              return (
                <div key={index} className="group relative">
                  <NavLink
                    to="/dashboard/addCourse"
                    className={({ isActive }) =>
                      `w-10 h-10 flex items-center justify-center rounded-xl transition-colors ${
                        isActive
                          ? "bg-white text-gray-950 shadow-[0_2px_10px_rgba(255,255,255,0.15)]"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`
                    }
                  >
                    <AiOutlinePlusCircle size={18} />
                  </NavLink>

                  <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-[#181820] border border-[#2a2a34] text-white text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all pointer-events-none z-50 shadow-xl">
                    Add Course
                  </div>
                </div>
              );
            }

            return (
              <div key={index} className="group relative">
                <NavLink
                  to={(role === "Instructor" && item.name === "My Courses") ? "/dashboard/my-courses" : item.path}
                  className={({ isActive }) =>
                    `w-10 h-10 flex items-center justify-center rounded-xl transition-colors ${
                      isActive
                        ? "bg-white text-gray-950 shadow-[0_2px_10px_rgba(255,255,255,0.15)]"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`
                  }
                >
                  {item.icon}
                </NavLink>

                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-[#181820] border border-[#2a2a34] text-white text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all pointer-events-none z-50 shadow-xl">
                  {item.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {modalData && <ConfirmModal modalData={modalData} />}
    </>
  );
};

export default CollapsedSidebar;
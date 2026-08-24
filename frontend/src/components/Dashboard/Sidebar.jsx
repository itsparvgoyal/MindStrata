import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineMenuFold, AiOutlinePlusCircle } from "react-icons/ai";
import { FaBook } from "react-icons/fa";
import sidebarLinks from "../../data/sidebarLinks.js";
import ConfirmModal from "../common/ConfirmModal.jsx";
import { toast } from "react-hot-toast";
import { setUser, setToken } from "../../redux/slices/authSlice.js";
import api from "../../services/service";

const Sidebar = (props) => {
  const [modalData, setModalData] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.rootReducer?.auth?.user);
  const role = user?.accountType;

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
      toast.success("Logged Out");
      navigate("/login", { replace: true });
    }
  }

  return (
    <div className="w-[240px] h-full md:h-[calc(100vh-64px)] bg-[#0d0d11] border-r border-[#1e1e26] p-4 flex flex-col justify-between shrink-0 select-none">
      
      <div>
        <div className="border-b border-[#1e1e26] pb-4 mb-4 flex justify-between items-center px-1">
          <h2 className="text-base font-extrabold text-white tracking-tight">
            Dashboard
          </h2>

          {!props.isMobile && (
            <button
              onClick={() => props.setMenu((prev) => !prev)}
              className="p-1.5 rounded-lg bg-[#16161c] border border-[#242430] text-gray-400 hover:text-white transition-colors cursor-pointer"
              title="Collapse Sidebar"
            >
              <AiOutlineMenuFold size={16} />
            </button>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;

            if (link.name === "Logout") {
              return (
                <button
                  key={link.id}
                  onClick={() => {
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
                    });
                  }}
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors text-sm font-medium w-full text-left cursor-pointer mt-4 border-t border-[#1e1e26] pt-3"
                >
                  <Icon size={18} />
                  <span>{link.name}</span>
                </button>
              );
            }

            if (role === "Instructor" && link.name === "Cart") {
              return (
                <NavLink
                  key={link.id}
                  to={"/dashboard/addCourse"}
                  onClick={() => {
                    if (props.isMobile) props.closeMobileMenu();
                  }}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors text-sm font-semibold
                    ${
                      isActive
                        ? "bg-white text-gray-950 shadow-[0_2px_10px_rgba(255,255,255,0.15)]"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`
                  }
                >
                  <AiOutlinePlusCircle size={18} />
                  <span>Add Course</span>
                </NavLink>
              );
            }

            if (role === "Student" && link.name === "My Courses") {
              return (
                <NavLink
                  key={link.id}
                  to={"/dashboard/enrolledCourses"}
                  onClick={() => {
                    if (props.isMobile) props.closeMobileMenu();
                  }}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors text-sm font-semibold
                    ${
                      isActive
                        ? "bg-white text-gray-950 shadow-[0_2px_10px_rgba(255,255,255,0.15)]"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`
                  }
                >
                  <FaBook size={16} />
                  <span>My Courses</span>
                </NavLink>
              );
            }

            return (
              <NavLink
                key={link.id}
                to={link.path}
                onClick={() => {
                  if (props.isMobile) props.closeMobileMenu();
                }}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors text-sm font-semibold
                  ${
                    isActive
                      ? "bg-white text-gray-950 shadow-[0_2px_10px_rgba(255,255,255,0.15)]"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                <Icon size={18} />
                <span>{link.name}</span>
              </NavLink>
            );
          })}
        </div>
      </div>

      {modalData && <ConfirmModal modalData={modalData} />}
    </div>
  );
};

export default Sidebar;
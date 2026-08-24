import { useEffect, useState, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { navbarLinks } from "../../data/navbarData";
import { IoIosCart } from "react-icons/io";
import ConfirmModal from "../common/ConfirmModal.jsx";
import { setToken, setUser } from "../../redux/slices/authSlice.js";
import { toast } from "react-hot-toast";
import { HiMenu, HiX } from "react-icons/hi";
import api from "../../services/service";

const NavBar = () => {
  const location = useLocation();
  const token = useSelector((state) => state.rootReducer.auth.token) || localStorage.getItem("token");
  const [modalData, setModalData] = useState(null);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const items = useSelector((state) => state.rootReducer.cart.items);
  const totalItems = items?.length;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  function handleLogout() {
    setProfileDropdown(false);
    setModalData({
      text1: "Logout",
      text2: "Are you sure you want to logout?",
      btn1Text: "Logout",
      btn2Text: "Cancel",
      btn1Handler: () => {
        setModalData(null);
        logout();
      },
      btn2Handler: () => {
        setModalData(null);
      },
    });
  }

  const path = location.pathname.split("/")[1];

  let user;
  let accountType;
  let dashboardPath = "/dashboard/enrolledCourses";
  if (token) {
    const Userdata = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    if (Userdata) {
      user = Userdata.additionalDetails?.image;
      accountType = Userdata.accountType;
      dashboardPath = accountType === "Instructor" ? "/dashboard/my-courses" : "/dashboard/enrolledCourses";
    }
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${scrolled
            ? "bg-[#090909]/90 backdrop-blur-md border-b border-[#1a1a1a] shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
            : "bg-transparent border-b border-white/5"
          }`}
      >
        <div className="w-11/12 max-w-7xl mx-auto flex justify-between items-center h-16">

          <Link to="/" className="flex items-center gap-2 shrink-0">
             <span className="text-xl font-black tracking-tight bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
               MindStrata
             </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navbarLinks.map((link, index) => (
              <NavLink
                key={index}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150
                  ${isActive
                    ? "text-white bg-white/8"
                    : "text-[#888888] hover:text-white hover:bg-white/5"
                  }`
                }
              >
                {link.title}
              </NavLink>
            ))}
            {token && (
              <NavLink
                to={dashboardPath}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150
                  ${isActive
                    ? "text-white bg-white/8"
                    : "text-[#888888] hover:text-white hover:bg-white/5"
                  }`
                }
              >
                Dashboard
              </NavLink>
            )}
          </div>

          <div className="flex items-center gap-3">

            {!token && (
              <div className="hidden md:flex items-center gap-3">
                <Link to="/login">
                  <button
                    className={`px-4 py-1.5 text-sm font-medium transition-all duration-150 text-gray-300 hover:text-white`}
                  >
                    Log in
                  </button>
                </Link>

                <Link to="/signup">
                  <button className="px-5 py-2 rounded-full text-sm font-bold bg-white text-gray-950 hover:bg-gray-100 transition-all duration-150 shadow-[0_2px_12px_rgba(255,255,255,0.15)]">
                    Get Started
                  </button>
                </Link>
              </div>
            )}

            {token && (
              <div className="flex items-center gap-3">

                {accountType === "Student" && (
                  <Link to="/dashboard/cart">
                    <div className="relative flex justify-center items-center w-9 h-9 rounded-lg border border-[#222222] hover:border-white/40 transition-all duration-150">
                      <IoIosCart size={18} className="text-[#888888] hover:text-white transition-colors" />
                      {totalItems > 0 && (
                        <span className="absolute -top-1.5 -right-1.5 bg-white text-black text-[9px] min-w-[16px] h-[16px] flex items-center justify-center rounded-full font-bold shadow-[0_2px_10px_rgba(255,255,255,0.25)]">
                          {totalItems}
                        </span>
                      )}
                    </div>
                  </Link>
                )}

                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setProfileDropdown(!profileDropdown)}
                    className="h-9 w-9 rounded-full overflow-hidden ring-2 ring-white/10 hover:ring-white/50 transition-all duration-150"
                  >
                    <img src={user} alt="profile" className="w-full h-full object-cover" />
                  </button>

                  {profileDropdown && (
                    <div className="absolute top-[calc(100%+10px)] right-0 w-44 bg-[#111111] border border-[#222222] rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden">
                      <div className="p-1">
                        <Link
                          to="dashboard/profile"
                          onClick={() => setProfileDropdown(false)}
                        >
                          <button className="w-full text-left px-4 py-2.5 text-sm text-[#cccccc] hover:bg-white/5 hover:text-white rounded-lg transition-all duration-150">
                            Profile
                          </button>
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/8 rounded-lg transition-all duration-150"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <button
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-[#222222] text-[#888888] hover:text-white hover:border-white/30 transition-all"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <HiX size={18} /> : <HiMenu size={18} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0E0E0E] border-t border-[#1a1a1a] px-6 py-4 flex flex-col gap-1">
            {navbarLinks.map((link, index) => (
              <NavLink
                key={index}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150
                  ${isActive
                    ? "text-white bg-white/8"
                    : "text-[#888888] hover:text-white hover:bg-white/5"
                  }`
                }
              >
                {link.title}
              </NavLink>
            ))}
            {token && (
              <NavLink
                to={dashboardPath}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150
                  ${isActive
                    ? "text-white bg-white/8"
                    : "text-[#888888] hover:text-white hover:bg-white/5"
                  }`
                }
              >
                Dashboard
              </NavLink>
            )}

            {!token && (
              <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-[#1a1a1a]">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full px-4 py-2.5 rounded-full text-sm font-medium border border-white/15 text-[#888888] hover:text-white hover:border-white/30 transition-all">
                    Log in
                  </button>
                </Link>
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full px-4 py-2.5 rounded-full text-sm font-bold bg-white text-gray-950 hover:bg-gray-100 transition-all duration-150 shadow-[0_2px_12px_rgba(255,255,255,0.15)]">
                    Get Started
                  </button>
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>

      <div className="h-16" />

      {modalData && <ConfirmModal modalData={modalData} />}
    </>
  );
};

export default NavBar;
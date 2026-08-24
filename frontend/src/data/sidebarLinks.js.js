import {
  FaUser,
  FaBook,
  FaShoppingCart,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const sidebarLinks = [
  {
    id: 1,
    name: "Profile",
    path: "/dashboard/profile",
    icon: FaUser,
  },
  {
    id: 2,
    name: "My Courses",
    path: "/dashboard/my-courses",
    icon: FaBook,
  },
  {
    id: 3,
    name: "Cart",
    path: "/dashboard/cart",
    icon: FaShoppingCart,
  },
  {
    id: 4,
    name: "Settings",
    path: "/dashboard/settings",
    icon: FaCog,
  },
  {
    id: 5,
    name: "Logout",
    path: "/logout",
    icon: FaSignOutAlt,
  },
];

export default sidebarLinks;
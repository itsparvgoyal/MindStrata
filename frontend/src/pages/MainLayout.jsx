import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../components/common/NavBar";
import Footer from "../components/common/Footer";

const MainLayout = () => {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith("/dashboard") || location.pathname.startsWith("/learnCourse");

  return (
    <>
      <NavBar />
      <Outlet />
      {!isDashboardRoute && <Footer />}
    </>
  );
};

export default MainLayout;
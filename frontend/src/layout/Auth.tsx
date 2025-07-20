import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";

import { useAuthStore } from "../store/useAuthStore";
import Navbar from "../components/Navbar";

const Layout = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  if (authUser) {
    navigate("/");
    return null;
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Layout;

import React from "react";
import { Loader } from "lucide-react";
import * as Dom from "react-router-dom";

import { useAuthStore } from "../store/useAuthStore";
import Navbar from "../components/Navbar";

const Layout = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const navigate = Dom.useNavigate();

  React.useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  React.useEffect(() => {
    if (authUser) navigate("/");
  }, [authUser, navigate]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Dom.Outlet />
    </>
  );
};

export default Layout;

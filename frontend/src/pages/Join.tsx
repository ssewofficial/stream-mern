import { useEffect } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuthStore } from "../store/useAuthStore";

const Join = () => {
  const paarams = useParams();
  const { authUser, isCheckingAuth } = useAuthStore();
  const id = paarams.id as string;

  useEffect(() => {
    const test = /^[0-9]+$/.test(id);
    if (!test) {
      toast.error("Invalid ID format");
    }
  }, [id]);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center">
        {isCheckingAuth ? (
          <p>Loading...</p>
        ) : authUser ? (
          <p>Welcome back, {authUser.userName}!</p>
        ) : (
          <p>
            You are not authenticated. Please{" "}
            <a href="/login" className="text-blue-500 underline">
              log in
            </a>{" "}
            to continue.
          </p>
        )}
      </div>
    </div>
  );
};

export default Join;

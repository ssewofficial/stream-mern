import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Navigate, Route, Routes } from "react-router-dom";

import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import LoginPage from "./pages/Login";
import { Toaster } from "react-hot-toast";
import SignUpPage from "./pages/SignUp";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();

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

  return (
    <div data-theme={theme}>
      <Routes>
        <Route
          index
          element={
            authUser ? (
              <div>
                <h1>Hello Welcome</h1>
                <p>Welcome back, {authUser.name.firstName+authUser.name.middleName+authUser.name.lastName}!</p>
                {/* Add more components or content here as needed */}
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { useThemeStore } from "./store/useThemeStore";

import LoginPage from "./pages/Login";
import SignUpPage from "./pages/SignUp";
import SettingsPage from "./pages/Settings";
import HomePage from "./pages/Home";
import ProfilePage from "./pages/Profile";
import JoinPage from "./pages/Join";
import MainLayout from "./layout/Main";
import AuthLayout from "./layout/Auth";
import ErrorPage from "./pages/ErrorPage";
import StreamPage from "./pages/stream";

function App() {
  const { theme } = useThemeStore();

  return (
    <div data-theme={theme}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="join/:id" element={<JoinPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
        </Route>

        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/stream" element={<StreamPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;

import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage"
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import { useAuth } from "./store/useStore";
import {Loader} from "lucide-react"

const App = () => {
  const { checkAuth, isCheckingAuth, authUser } = useAuth()
  console.log(authUser);
  
  useEffect(()=>{
    checkAuth()
  },[])

  if (isCheckingAuth && !authUser) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader className="h-6 w-6 animate-spin"/>
      </div>
    )
  }

  return (
    <div>
      
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to={"/login"} />}/>
        <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to={"/"}/>}/>
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/"}/>}/>
        <Route path="/settings" element={<SettingsPage />}/>
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to={"/login"} />}/>
      </Routes>
    </div>
  );
};

export default App;

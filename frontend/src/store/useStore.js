import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

export const useAuth = create((set) => ({
  authUser: null,
  isSigningIn: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const { data } = await axios.get("/api/auth/check");
      set({ authUser: data });
    } catch (error) {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (data) => {
    set({ isSigningIn: true });
    try {
      const { data: userData } = await axios.post("/api/auth/signup", data);
      set({ authUser: userData });
      toast.success("Account Successfully Created");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningIn: false });
    }
  },

  logOut: async () => {
    try {
      await axios.post("/api/auth/logout")
      set({authUser : null})
      toast.success("User Logout Successfully")
    } catch (error) {
      toast.error(error.response.data.message)
    }
  },
  logIn : async (data) => {
    set({isLoggingIn : true})
    try {
      const { data : userData } = await axios.post("/api/auth/login", data)
      set({authUser : userData})
      toast.success("User Successfully Logged In")
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      set({isLoggingIn : false})
    }
  }
}));

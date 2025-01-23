/* eslint-disable no-mixed-spaces-and-tabs */
import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isCheckingAuth: true,
  isLoggingOut: false,
  isLoggingIn: false,
  signup: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const response = await axios.post(
        "https://sprinkle-ionian-sodalite.glitch.me/api/v1/auth/signup",
        credentials
      );
      set({ user: response.data.user, isSigningUp: false });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response.data.message || "Signup failed");
      set({ isSigningUp: false, user: null });
    }
  },
  login: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const response = await axios.post(
        "https://sprinkle-ionian-sodalite.glitch.me/api/v1/auth/login",
        credentials
      );
      set({ user: response.data.user, isLoggingIn: false });
    } catch (error) {
      set({ isLoggingIn: false, user: null });
      toast.error(error.response.data.message || "Login failed");
    }
  },
  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axios.post(
        "https://sprinkle-ionian-sodalite.glitch.me/api/v1/auth/logout"
      );
      set({ user: null, isLoggingOut: false });
      toast.success("Logged out successfully");
    } catch (error) {
      set({ isLoggingOut: false });
      toast.error(error.response.data.message || "Logout failed");
    }
  },
  authCheck: async () => {
	set({ isCheckingAuth: true });
  
	try {
	  const response = await fetch('https://wonderful-deserted-mall.glitch.me/api/data'); // Replace with your backend API endpoint
	  if (!response.ok) {
		throw new Error('Failed to fetch user data');
	  }
  
	  const userData = await response.json(); // Assuming the backend returns JSON user data
  
	  // Update the state with the fetched user data
	  set({
		user: userData,
		isCheckingAuth: false,
	  });
	} catch (error) {
	  console.error('Error fetching user data:', error);
	  set({
		isCheckingAuth: false,
	  });
	  // Optionally handle authentication failure (e.g., set user to null, show error, etc.)
	}
  }
  
}));

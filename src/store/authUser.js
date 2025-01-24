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
      console.log(response.data.user);

      // Save user information to localStorage after 5 seconds
      setTimeout(() => {
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Delete the user information after 10 seconds
        setTimeout(() => {
          localStorage.removeItem("user");
          console.log("User information removed from localStorage");
        }, 7 * 24 * 60 * 60 * 1000); // 10 seconds interval after saving
      }, 5000); // 5 seconds delay before saving
      // 5 seconds delay

      // Show success toast after successful login
      toast.success("Logged in successfully!");
    } catch (error) {
      set({ isLoggingIn: false, user: null });
      toast.error(error.response.data.message || "Login failed");
    }
  },

  logout: async () => {
    set({ isLoggingOut: true });
    try {
      // Clear the user data from localStorage immediately on logout
      localStorage.removeItem("user");
      console.log("User data removed from localStorage on logout");

      // Send the logout request to the server
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

    // Check if user data exists in localStorage
    const userFromLocalStorage = localStorage.getItem("user");

    if (userFromLocalStorage) {
      // If user data exists in localStorage, use it directly
      set({ user: JSON.parse(userFromLocalStorage), isCheckingAuth: false });
    } else {
      // If no user data, proceed with API call
      try {
        const response = await axios.get(
          "https://sprinkle-ionian-sodalite.glitch.me/api/v1/auth/authCheck"
        );
        set({ user: response.data.user, isCheckingAuth: false });
      } catch (error) {
        set({ isCheckingAuth: false, user: null });
        // Optionally, you can display a toast error message here
        // toast.error(error.response.data.message || "An error occurred");
      }
    }
  },
}));

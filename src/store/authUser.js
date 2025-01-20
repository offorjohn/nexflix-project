import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
	user: JSON.parse(localStorage.getItem("user")) || null, // Initialize with localStorage
	isSigningUp: false,
	isLoggingOut: false,
	isLoggingIn: false,
	isCheckingAuth: false,

	// Signup
	signup: async (credentials) => {
		set({ isSigningUp: true });
		try {
			const response = await axios.post(
				"https://sprinkle-ionian-sodalite.glitch.me/api/v1/auth/signup",
				credentials
			);
			const user = response.data.user;
			set({ user, isSigningUp: false });
			localStorage.setItem("user", JSON.stringify(user)); // Persist user in localStorage
			toast.success("Account created successfully");
		} catch (error) {
			toast.error(error?.response?.data?.message || "Signup failed");
			set({ isSigningUp: false });
		}
	},

	// Login
	login: async (credentials) => {
		set({ isLoggingIn: true });
		try {
			const response = await axios.post(
				"https://sprinkle-ionian-sodalite.glitch.me/api/v1/auth/login",
				credentials
			);
			const user = response.data.user;
			set({ user, isLoggingIn: false });
			localStorage.setItem("user", JSON.stringify(user)); // Persist user in localStorage
			toast.success("Login successful");
		} catch (error) {
			toast.error(error?.response?.data?.message || "Login failed");
			set({ isLoggingIn: false });
		}
	},

	// Logout
	logout: async () => {
		set({ isLoggingOut: true });
		try {
			await axios.post("https://sprinkle-ionian-sodalite.glitch.me/api/v1/auth/logout");
			set({ user: null, isLoggingOut: false });
			localStorage.removeItem("user"); // Clear localStorage
			toast.success("Logged out successfully");
		} catch (error) {
			toast.error(error?.response?.data?.message || "Logout failed");
			set({ isLoggingOut: false });
		}
	},

	// Auth Check
	authCheck: async () => {
		set({ isCheckingAuth: true });
		try {
			const response = await axios.get("https://sprinkle-ionian-sodalite.glitch.me/api/v1/auth/authCheck");
			const user = response.data.user;
			set({ user, isCheckingAuth: false });
			localStorage.setItem("user", JSON.stringify(user)); // Persist user in localStorage
		} catch (error) {
			set({ isCheckingAuth: false, user: null });
			localStorage.removeItem("user"); // Clear invalid session
			toast.error(error?.response?.data?.message || "Authentication check failed");
		}
	},
}));

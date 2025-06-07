  import axios from "axios";
  import toast from "react-hot-toast";
  import { create } from "zustand";
// axios.defaults.baseURL = "http://localhost:8000"; // Your backend URL
  axios.defaults.baseURL ="https://omtours-be.onrender.com";
  axios.defaults.withCredentials = true; 
  // Define User and Credentials types
  
  type User = {
    id: string;
    username: string;
    email: string;
  };

  type Credentials = {
    username?: string;// making optional so ,login
    email: string;
    password: string;
  };

  interface AuthState {
    user: User | null;
    isSigningUp: boolean;
    isCheckingAuth: boolean;
    isLoggingOut: boolean;
    isLoggingIn: boolean;
    signup: (credentials: Credentials) => Promise<void>;
    authCheck: () => Promise<void>;
     logout: () => Promise<void>; // Added logout
    login: (credentials: Credentials) => Promise<void>;
  }

  export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isSigningUp: false,
    isCheckingAuth: true,
    isLoggingOut: false,
    isLoggingIn: false,
    signup: async (credentials) => {
      set({ isSigningUp: true });
      try {
        const response = await axios.post<{ user: User }>("/api/v1/auth/signup", credentials);
        set({ user: response.data.user, isSigningUp: false });
        toast.success("Account created successfully");
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Signup failed");
        set({ isSigningUp: false, user: null });
      }
    },
    login: async (credentials) => {
      set({ isLoggingIn: true });
      try {
        const response = await axios.post<{ user: User }>("/api/v1/auth/login", credentials);
        set({ user: response.data.user, isLoggingIn: false });
        toast.success("Logged in successfully");
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Login failed");
        set({ isLoggingIn: false, user: null });
        throw error;//********************* throw error */
      }
    },
    logout: async () => {
        set({ isLoggingOut: true });
        try {
          await axios.post("/api/v1/auth/logout");
          set({ user: null, isLoggingOut: false });
          toast.success("Logged out successfully");
        } catch (error: any) {
          toast.error(error?.response?.data?.message || "Logout failed");
          set({ isLoggingOut: false });
          
        }
      },
    authCheck: async () => {
      set({ isCheckingAuth: true });
      try {
        const response = await axios.get<{ user: User }>("/api/v1/auth/authCheck");
        set({ user: response.data.user, isCheckingAuth: false });
      } catch (error: any) {
        set({ isCheckingAuth: false, user: null });

        // Optionally show error with toast throw error;
        
      }
    },
  }));

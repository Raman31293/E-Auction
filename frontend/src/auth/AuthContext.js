import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { baseURL } from "../url";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Only update isAuthenticated state after successful login
  const login = async (formData) => {
    try {
      const response = await axios.post(`${baseURL}/user/login`, formData);
      console.log("Login response:", response);
      if (response.status === 200 && response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);
        setIsAuthenticated(true); // Set isAuthenticated to true after successful login
        
      } else {
        throw new Error("Invalid login credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Login failed");
    }
  };

  const logout = () => {
    console.log("Logging out...");
    localStorage.removeItem("token");
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

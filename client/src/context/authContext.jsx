import { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const updateUser = (data) => {
    setCurrentUser(data);
  };

  // Function to check if token is expired
  const isTokenExpired = (token) => {
    if (!token) return true;

    const decodedToken = jwt_decode(token);
    const currentTime = Date.now() / 1000; // Get current time in seconds

    // Check if the token is expired
    return decodedToken.exp < currentTime;
  };

  // Check if token has expired or if the user is logged out
  useEffect(() => {
    if (
      currentUser?.data?.accessToken &&
      isTokenExpired(currentUser.data.accessToken)
    ) {
      // If token is expired, log out the user and clear data from localStorage
      localStorage.removeItem("user");
      setCurrentUser(null);
      alert("Session expired. Please log in again.");
    } else if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser)); // Save currentUser to localStorage
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

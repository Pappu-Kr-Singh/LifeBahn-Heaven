// import axios from "axios";
// import { useContext, useEffect, useRef } from "react";
// import { AuthContext } from "../context/authContext";
// import { useNavigate } from "react-router-dom";

// const useAxiosInterceptor = () => {
//   const { currentUser, setCurrentUser } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const isRefreshing = useRef(false);

//   useEffect(() => {
//     const axiosInterceptor = axios.interceptors.response.use(
//       (response) => response,
//       async (error) => {
//         const originalRequest = error.config;

//         if (
//           error.response &&
//           error.response.status === 401 &&
//           !originalRequest._retry
//         ) {
//           // Prevent duplicate refresh attempts
//           if (isRefreshing.current) return Promise.reject(error);

//           isRefreshing.current = true;
//           originalRequest._retry = true;

//           try {
//             const refreshToken = currentUser?.data?.refreshToken;

//             if (!refreshToken) {
//               throw new Error("No refresh token available.");
//             }

//             console.log(
//               "Current refresh token:",
//               currentUser?.data?.refreshToken
//             );

//             const response = await axios.post(
//               "http://localhost:3000/api/v1/users/refresh-token",
//               { refreshToken }
//             );

//             const { accessToken } = response.data?.data || {};
//             if (!accessToken)
//               throw new Error("Failed to refresh access token.");

//             // Update tokens
//             currentUser.data.accessToken = accessToken;
//             axios.defaults.headers.common[
//               "Authorization"
//             ] = `Bearer ${accessToken}`;

//             // Retry the original request
//             originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
//             isRefreshing.current = false;
//             return axios(originalRequest);
//           } catch (refreshError) {
//             console.error("Error refreshing token:", refreshError);
//             alert("Session expired. Please log in again.");
//             localStorage.removeItem("accessToken");
//             localStorage.removeItem("refreshToken");
//             setCurrentUser(null);
//             navigate("/login");
//           }
//         }

//         // Reject other errors
//         return Promise.reject(error);
//       }
//     );

//     return () => axios.interceptors.response.eject(axiosInterceptor);
//   }, [currentUser, setCurrentUser, navigate]);

//   return null;
// };

// export default useAxiosInterceptor;

import axios from "axios";
import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const useAxiosInterceptor = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const isRefreshing = useRef(false);
  const refreshQueue = useRef([]);

  useEffect(() => {
    const axiosInterceptor = axios.interceptors.response.use(
      (response) => response, // Pass through successful responses
      async (error) => {
        const originalRequest = error.config;

        if (
          error.response &&
          error.response.status === 401 &&
          !originalRequest._retry
        ) {
          // Prevent duplicate refresh attempts
          if (isRefreshing.current) {
            return new Promise((resolve, reject) => {
              refreshQueue.current.push({ resolve, reject });
            })
              .then((newToken) => {
                originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
                return axios(originalRequest);
              })
              .catch((err) => Promise.reject(err));
          }

          isRefreshing.current = true;
          originalRequest._retry = true;

          try {
            const refreshToken = currentUser?.data?.refreshToken;

            if (!refreshToken) {
              throw new Error("No refresh token available.");
            }

            console.log(
              "Current refresh token:",
              currentUser?.data?.refreshToken
            );

            const response = await axios.post(
              "http://localhost:3000/api/v1/users/refresh-token",
              { refreshToken }
            );

            const { accessToken } = response.data?.data || {};
            if (!accessToken)
              throw new Error("Failed to refresh access token.");

            // Update tokens
            currentUser.data.accessToken = accessToken;
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${accessToken}`;

            // Process queued requests
            refreshQueue.current.forEach((req) => req.resolve(accessToken));
            refreshQueue.current = [];

            isRefreshing.current = false;

            // Retry the original request
            originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
            return axios(originalRequest);
          } catch (refreshError) {
            console.error("Error refreshing token:", refreshError);

            // Clear queued requests
            refreshQueue.current.forEach((req) => req.reject(refreshError));
            refreshQueue.current = [];

            alert("Session expired. Please log in again.");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            setCurrentUser(null);
            navigate("/login");
          } finally {
            isRefreshing.current = false;
          }
        }

        // Reject other errors
        return Promise.reject(error);
      }
    );

    return () => axios.interceptors.response.eject(axiosInterceptor);
  }, [currentUser, setCurrentUser, navigate]);

  return null;
};

export default useAxiosInterceptor;

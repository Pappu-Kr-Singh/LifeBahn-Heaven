import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./components/SignUp.jsx";
import CreatePost from "./components/CreatePost.jsx";
import PostList from "./components/PostList.jsx";
import Login from "./components/Login.jsx";
import { AuthContextProvider } from "./context/authContext.jsx";
import Profile from "./components/Profile.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Contact from "./components/Contact.jsx";
import UpdatePost from "./components/UpdatePost.jsx";
import UpdateAccountDetails from "./components/UpdateAccountDetails.jsx";
import Rip from "./components/Rip.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home.jsx";
import AddFlower from "./components/AddFolower.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import UserGuide from "./pages/UserGuide.jsx";
import LifeLegacy from "./lifelegacy/LifeLegacy.jsx";
import BuildLegacy from "./lifelegacy/BuildLegacy.jsx";
// import PostDetails from "./components/PostDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/memoriams", element: <PostList /> },
      { path: "/sign-up", element: <SignUp /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
      { path: "/login", element: <Login /> },
      { path: "/profile", element: <Profile /> },
      { path: "/about-us", element: <AboutUs /> },
      { path: "/post/:_id", element: <Rip /> },
      { path: "/contact-us", element: <Contact /> },
      { path: "/profile/update-post", element: <UpdatePost /> },
      { path: "/create-post", element: <CreatePost /> },
      { path: "/add-flower", element: <AddFlower /> },
      { path: "/about-us", element: <AboutUs /> },
      { path: "/user-guide", element: <UserGuide /> },
      { path: "/profile/life-legacy", element: <LifeLegacy /> },
      { path: "/profile/build-legacy", element: <BuildLegacy /> },
      // { path: "/post/:id", element: <PostDetails /> },

      {
        path: "/profile/update-account-details",
        element: <UpdateAccountDetails />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);

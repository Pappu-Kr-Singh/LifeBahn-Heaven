import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import useAxiosInterceptor from "./axiosConfig";

const Header = ({ isAuthenticated }) => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useAxiosInterceptor(); // Use the interceptor hook

  const handleLogout = async () => {
    try {
      await axios.post(
        "https://api.lifebahnheaven.com/api/v1/users/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${currentUser?.data.accessToken}`,
          },
        }
      );
      alert("Logout Successful");
      setCurrentUser(null); // Clear current user in context
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
      alert("An error occurred during logout. Please try again.");
    }
  };

  return (
    <>
      <header className="bg-light p-3 mb-3 border-bottom">
        <div className="container">
          {/* Flex container for centering */}
          <div className="d-flex flex-row justify-content-between align-items-center align-content-center">
            {/* Logo */}

            <h5 className="d-flex align-items-center text-black fw-bold  text-decoration-none">
              LifeBahn Heaven
            </h5>

            {/* Navigation bar */}
            <ul className="nav justify-content-center mb-0">
              <li className="nav-item">
                <Link to="/" className="nav-link text-black fw-bold px-3">
                  Home
                </Link>
              </li>

              {currentUser && (
                <>
                  <li className="nav-item">
                    <Link to="/memoriams" className="nav-link text-black px-3">
                      Memoriams
                    </Link>
                  </li>
                  {currentUser.data.roles === "sponsor" && (
                    <li className="nav-item">
                      <Link
                        to="/create-post"
                        className="nav-link text-black fw-bold px-3"
                      >
                        Add Rip
                      </Link>
                    </li>
                  )}
                </>
              )}

              <li className="nav-item">
                <Link
                  to="/about-us"
                  className="nav-link text-black fw-bold px-3"
                >
                  About Us
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="/user-guide"
                  className="nav-link text-black fw-bold px-3"
                >
                  User Guide
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="/profile/life-legacy"
                  className="nav-link text-black fw-bold px-3"
                >
                  Life Legacy
                </Link>
              </li>
            </ul>

            {/* Right-side dropdown menu */}
            <div className="text-center">
              {currentUser ? (
                <button
                  className="btn btn-link text-black dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  aria-label="User menu"
                >
                  <img
                    src={
                      currentUser?.data?.user?.avatar ||
                      "/assets/default-avatar.png"
                    }
                    alt="User avatar"
                    width="32"
                    height="32"
                    className="rounded-circle me-2"
                  />
                  {currentUser.data.user.userName}
                </button>
              ) : (
                <ul className="nav justify-content-center">
                  <li className="nav-item">
                    <Link to="/login" className="nav-link text-black px-3">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/sign-up"
                      className="nav-link text-white px-3 sign-up-btn"
                    >
                      Sign Up
                    </Link>
                  </li>
                </ul>
              )}
              <ul className="dropdown-menu text-small no-hover-bg">
                {currentUser && (
                  <>
                    <li>
                      <Link to="/profile" className="dropdown-item text-black">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button
                        className="dropdown-item text-black"
                        onClick={handleLogout}
                      >
                        Sign out
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

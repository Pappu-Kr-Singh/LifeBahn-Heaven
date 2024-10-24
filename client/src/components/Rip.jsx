import "./style.css";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import Flowers from "./RipTabsData/Flowers";
import Photos from "./RipTabsData/Photos";
import Memoreblia from "./RipTabsData/Memoreblia";
import Document from "./RipTabsData/Document";
const PageOne = () => <div>This is the content of Page One.</div>;
const PageTwo = () => <div>This is the content of Page Two.</div>;
const PageThree = () => <div>This is the content of Page Three.</div>;
const PageFour = () => <div>DataDataDataDataDataData</div>;

function Rip() {
  const { currentUser } = useContext(AuthContext);
  const [fetching, setFetching] = useState(false);
  const [post, setPost] = useState(null); // State to store the fetched post
  const { _id } = useParams(); // Get postId from the URL
  const [users, setUsers] = useState([]); // Store normal users
  const [selectedUser, setSelectedUser] = useState(""); // Store selected user ID
  const [showDropdown, setShowDropdown] = useState(false); // Control dropdown visibility
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  // console.log(currentUser.data.user);
  // console.log(_id);

  useEffect(() => {
    const fetchData = async () => {
      setFetching(true);
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/posts/post/${_id}`,
          {
            headers: {
              Authorization: `Bearer ${currentUser?.data.accessToken}`, // Use access token
            },
          }
        );

        const jsonData = response.data.data;
        // console.log(jsonData);
        setPost(jsonData); // Store the fetched data in the state
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setFetching(false);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/users/normal",
          {
            headers: {
              Authorization: `Bearer ${currentUser?.data.accessToken}`,
            },
          }
        );
        console.log("Fetched Users:", response.data.data); // Log the response
        setUsers(response.data.data); // Check if this is setting the correct users
      } catch (error) {
        console.error("User fetch error:", error);
      }
    };
    if (currentUser && _id) {
      fetchData();
      fetchUsers();
    }
  }, [currentUser, _id]);

  const handleAddContributor = async () => {
    if (!selectedUser) return; // Prevent if no user is selected

    try {
      await axios.patch(
        `http://localhost:3000/api/v1/users/${selectedUser}/roles`,
        { roles: "contributor" }, // Changing role to contributor
        {
          headers: {
            Authorization: `Bearer ${currentUser?.data.accessToken}`,
          },
        }
      );
      alert("User role updated successfully!");
    } catch (error) {
      console.error("Error updating role:", error);
      alert("Failed to update user role.");
    }
  };

  // Helper function to format the date
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  // **************   Tab Buttons
  const [activeTab, setActiveTab] = useState(1); // State to keep track of active tab

  // Function to render the content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 1:
        return <Flowers />;
      case 2:
        return <Photos />;
      case 3:
        return <Memoreblia />;
      case 4:
        return <Document />;
      case 4:
        return <Document />;
      default:
        return <Flowers />;
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div className="card bg-dark text-light p-4">
          <div className="row">
            <div className="col-md-3">
              <img
                src={post?.postImg}
                alt="George Washington"
                className="img-fluid"
              />
            </div>
            <div className="col-md-9">
              {/* Display the title dynamically */}
              <div className="add_contributer_btn_N_heading">
                <h1 className="card-title">{post?.title || "Loading..."}</h1>
                {/* {currentUser.data.user.roles === "sponsor" ? (
                  <button onClick={() => setShowDropdown(!showDropdown)}>
                    Add Contributer to this rip
                  </button>
                ) : (
                  ""
                )} */}
                {currentUser.data.user.roles === "sponsor" ? (
                  !isButtonClicked ? (
                    <button
                      onClick={() => {
                        setShowDropdown(true);
                        setIsButtonClicked(true); // Hide the button after click
                      }}
                    >
                      Add Contributor to this RIP
                    </button>
                  ) : null
                ) : null}

                {showDropdown && (
                  <div>
                    <select
                      value={selectedUser}
                      onChange={(e) => setSelectedUser(e.target.value)}
                      style={{ color: "white" }}
                    >
                      <option value="">Select a User</option>
                      {users.map((user) => (
                        <option key={user._id} value={user._id}>
                          {user.fullName}
                        </option>
                      ))}
                    </select>
                    <button onClick={handleAddContributor}>Confirm</button>
                  </div>
                )}
              </div>
              <div className="card-body">
                <p>
                  <strong>Date of Birth:</strong>{" "}
                  {post?.dateOfBirth
                    ? formatDate(post.dateOfBirth)
                    : "Loading..."}
                </p>
                <p>
                  <strong>Birth Place:</strong> {post?.birthPlace}
                </p>
                <p>
                  <strong>Death:</strong>{" "}
                  {post?.deathDate ? formatDate(post.deathDate) : "Loading..."}
                </p>
                <p>
                  <strong>Description:</strong> {post?.description}
                </p>
                <p>
                  <strong>Burial:</strong>{" "}
                  <a href="#" className="text-decoration-none">
                    {post?.burial}
                  </a>
                </p>
                <p>
                  <strong>Plot:</strong> {post?.plot}
                </p>
                <p>
                  <strong>Memorial ID:</strong> 1075 •{" "}
                  <a href="#" className="text-decoration-none">
                    View Source
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr />

      <div className="container">
        <div className="row">
          <div>
            {/* Tab Buttons */}
            <div className="tabs">
              <button className="tab_btn" onClick={() => setActiveTab(1)}>
                Flowers
              </button>
              <button className="tab_btn" onClick={() => setActiveTab(2)}>
                Photos
              </button>
              <button className="tab_btn" onClick={() => setActiveTab(3)}>
                Memoreblia
              </button>
              <button className="tab_btn" onClick={() => setActiveTab(4)}>
                Document
              </button>
            </div>

            {/* Content of the active tab */}
            <div className="tab-content">{renderContent()}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Rip;

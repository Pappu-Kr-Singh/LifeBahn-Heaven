import React, { useContext, useEffect, useState } from "react";
import Post from "./Post";
import { PostList as PostListData } from "../store/post-list-store";
import WelcomeMessage from "./WelcomeMessage";
import LoadingSpinner from "./LoadingSpinner";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import { Link } from "react-router-dom";

function PostList() {
  const { postList, addInitialPosts } = useContext(PostListData);
  const [fetching, setFetching] = useState(false);
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [filteredPosts, setFilteredPosts] = useState([]); // State for filtered posts

  // console.log(currentUser.data);

  useEffect(() => {
    const fetchData = async () => {
      setFetching(true);
      try {
        const response = await axios.get(
          "https://api.lifebahnheaven.com/api/v1/posts",
          {
            headers: {
              Authorization: `Bearer ${currentUser?.data.accessToken}`, // Use access token
            },
          }
        );

        const jsonData = response.data;

        addInitialPosts(jsonData.data);

        setFetching(false);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setFetching(false);
      }
    };

    fetchData();
  }, [currentUser]);

  useEffect(() => {
    // Filter posts based on the search query
    if (searchQuery.trim() === "") {
      setFilteredPosts(postList); // Show all posts if search query is empty
    } else {
      const filtered = postList.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (Array.isArray(post.tags) &&
            post.tags.some((tag) =>
              tag.toLowerCase().includes(searchQuery.toLowerCase())
            ))
      );
      setFilteredPosts(filtered);
    }
  }, [searchQuery, postList]);

  // Sponsor Functionality
  const becomeSponsor = async () => {
    try {
      const response = await axios.patch(
        "https://api.lifebahnheaven.com/api/v1/users/become-sponsor",
        {},
        {
          headers: {
            Authorization: `Bearer ${currentUser?.data.accessToken}`, // Use access token
          },
        }
      );

      setCurrentUser((prevUser) => ({
        ...prevUser,
        data: {
          ...prevUser.data,
          roles: "sponsor",
        },
      }));

      alert("You are now a sponsor!");
    } catch (error) {
      console.error("Error updating role:", error);
      alert("Failed to update your role. Please try again.");
    }
  };

  return (
    <>
      <div className="memoriams_hero">
        <h1>Memoriams</h1>
      </div>
      <div className="container my-4">
        {/* Top bar with search input and sponsor button */}
        <div className="row align-items-center mb-3">
          <div className="col-md-8">
            <input
              type="text"
              placeholder="Search Rip's..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control w-25"
            />
          </div>
          <div className="col-md-4 text-end">
            {currentUser?.data?.user?.roles ||
            currentUser?.data?.roles === "sponsor" ? (
              <Link to="/create-post">
                <button className="btn btn-primary">Add Rips</button>
              </Link>
            ) : (
              <button className="btn btn-warning" onClick={becomeSponsor}>
                Become sponsor to Add the Rip's
              </button>
            )}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="row">
          {fetching && <LoadingSpinner />}
          {!fetching && filteredPosts.length === 0 && (
            <p className="text-center text-muted">
              No posts found matching your query.
            </p>
          )}
          {!fetching &&
            filteredPosts.map((post) => (
              <div className="col-md-4 mb-4" key={post._id}>
                <Post post={post} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default PostList;

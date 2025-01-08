import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { FcLike } from "react-icons/fc";
import axios from "axios";
import WelcomeMessage from "./WelcomeMessage";

import { Link, useNavigate } from "react-router-dom";
import ProfileEdit from "./profile-edit";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const [fetching, setFetching] = useState(false);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [profileEditModal, setProfileEditModal] = useState(false);
  const [postImg, setPostImg] = useState([]);
  const [post, setPost] = useState({ title: "", description: "" });
  const [contributorPost, setContributorPost] = useState({
    title: "",
    description: "",
  });

  // console.log(currentUser);
  // console.log(currentUser?.data.accessToken);
  useEffect(() => {
    const fetchSponsorData = async () => {
      setFetching(true);
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/posts/get-sponsor-post`,
          {
            headers: {
              Authorization: `Bearer ${currentUser?.data?.accessToken}`, // Use access token
            },
          }
        );

        const jsonData = response.data.data;
        // console.log(jsonData);
        setPosts(jsonData);
        setFetching(false);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setFetching(false);
      }
    };

    const fetchContributorData = async () => {
      setFetching(true);
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/posts/get-contributer-post`,
          {
            headers: {
              Authorization: `Bearer ${currentUser?.data.accessToken}`, // Use access token
            },
          }
        );

        const jsonData = response.data.data;
        // console.log(jsonData);
        setContributorPost(jsonData);
        setFetching(false);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setFetching(false);
      }
    };
    fetchSponsorData();
    fetchContributorData();
  }, []);
  const handleDelete = async (postId) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${currentUser?.data.accessToken}`,
        },
      });
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleUpdate = (post) => {
    setSelectedPost(post);
    console.log(post);
    setPost({
      title: post.title || "",
      description: post.description || "",
      _id: post._id,
    });
  };

  const navigate = useNavigate();

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("description", post.description);
    if (postImg) {
      formData.append("postImg", postImg);
    }

    try {
      const postRes = await axios.patch(
        `http://localhost:3000/api/v1/posts/${selectedPost._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${currentUser?.data.accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Post updated:", postRes.data);

      navigate("/profile");
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  const handleCloseBtn = () => {
    setProfileEditModal(!profileEditModal);
  };

  const lifeLefacyNavigation = () => {
    navigate("/profile/life-legacy");
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <center>
                <div className="profileimage">
                  <img
                    className="profile__img"
                    src={currentUser.data.user.avatar}
                    alt=""
                  />
                </div>
                <div className="Name">
                  <p>Username: {currentUser?.data.user.userName}</p>
                  <p>Current Role: {currentUser?.data?.user?.roles}</p>
                </div>
                <span className="text-white">
                  id:
                  <p className="text-secondary">{currentUser.data.user._id}</p>
                </span>
                <div className="life_legacy">
                  <button onClick={lifeLefacyNavigation}>
                    Add Your Life Legacy
                  </button>
                </div>
              </center>
            </div>

            <div className="profile__features">
              <button
                onClick={() => {
                  setProfileEditModal(!profileEditModal);
                }}
              >
                Edit Profile
              </button>
              <button id="btn">Change Password</button>
            </div>
          </div>

          <div className="col-md-4">
            <h1 className="text-center">Your Rips</h1>
            <div className="your__post">
              {/* {!fetching && posts.length === 0 && <WelcomeMessage />} */}
              {fetching ? (
                <p>Loading...</p>
              ) : (
                posts.map((post) => (
                  <Link
                    to={`/post/${post._id}`}
                    className="card post-card"
                    style={{ width: "20rem", margin: "2rem 0rem" }}
                    key={post._id}
                  >
                    <img
                      src={post.postImg}
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body ">
                      <h5 className="card-title text-white">{post.title}</h5>
                      {/* <p className="card-text text-white">{post.description}</p> */}
                      {/* <p className="card-text text-white">
                        {post.description.split(" ").length > 20
                          ? post.description.split(" ").slice(0, 20).join(" ") +
                            "..."
                          : post.description}
                      </p> */}
                      {post.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="badge text-bg-primary hashtag"
                        >
                          {tag}
                        </span>
                      ))}
                      {/* <div className="alert alert-info" role="alert">
                        <FcLike className="likeIcon" />
                        {`this post has been liked by ${post.reactions} people!`}
                      </div> */}
                      <div className="deleteNupdata_btn">
                        <button
                          className="rounded"
                          onClick={() => handleUpdate(post._id)}
                        >
                          Update
                        </button>
                        <button
                          className="btn-danger text-white bg-danger rounded"
                          onClick={() => handleDelete(post._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>

            {selectedPost && (
              <form onSubmit={handleUpdateSubmit} className="update-form">
                <h3>Update Post</h3>
                <div className="form-group">
                  <label htmlFor="postId">Post Id</label>
                  <input
                    type="text"
                    id="postId"
                    value={post._id}
                    onChange={(e) =>
                      setPost({ ...post, postId: e.target.value })
                    }
                    defaultValue={selectedPost._id}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    value={post.title}
                    onChange={(e) =>
                      setPost({ ...post, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    value={post.description}
                    onChange={(e) =>
                      setPost({ ...post, description: e.target.value })
                    }
                    required
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="postImg">Image</label>
                  <input
                    type="file"
                    id="postImg"
                    onChange={(e) => setPostImg(e.target.files[0])}
                  />
                </div>
                <button type="submit">Update</button>
                <button type="button" onClick={() => setSelectedPost(null)}>
                  Cancel
                </button>
              </form>
            )}
          </div>

          <div className="col-md-4">
            <h1 className="text-center">Your Contributor</h1>
            <div className="your__post">
              {/* {!fetching && posts.length === 0 && <WelcomeMessage />} */}
              {fetching ? (
                <p>Loading...</p>
              ) : (
                contributorPost.length &&
                contributorPost.map((post) => (
                  <Link
                    to={`/post/${post._id}`}
                    className="card post-card"
                    style={{ width: "20rem", margin: "2rem 0rem" }}
                    key={post._id}
                  >
                    <img
                      src={post.postImg}
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body ">
                      <h5 className="card-title text-white">{post.title}</h5>
                      {/* <p className="card-text text-white">{post.description}</p> */}
                      {/* <p className="card-text text-white">
                        {post.description.split(" ").length > 20
                          ? post.description.split(" ").slice(0, 20).join(" ") +
                            "..."
                          : post.description}
                      </p> */}
                      {post.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="badge text-bg-primary hashtag"
                        >
                          {tag}
                        </span>
                      ))}
                      <div className="alert alert-info" role="alert">
                        <FcLike className="likeIcon" />
                        {`this post has been liked by ${post.reactions} people!`}
                      </div>
                      {/* <div className="deleteNupdata_btn">
                        <button
                          className="rounded"
                          onClick={() => handleUpdate(post._id)}
                        >
                          Update
                        </button>
                        <button
                          className="btn-danger text-white bg-danger rounded"
                          onClick={() => handleDelete(post._id)}
                        >
                          Delete
                        </button>
                      </div> */}
                    </div>
                  </Link>
                ))
              )}
            </div>

            {selectedPost && (
              <form onSubmit={handleUpdateSubmit} className="update-form">
                <h3>Update Post</h3>
                <div className="form-group">
                  <label htmlFor="postId">Post Id</label>
                  <input
                    type="text"
                    id="postId"
                    value={post._id}
                    onChange={(e) =>
                      setPost({ ...post, postId: e.target.value })
                    }
                    defaultValue={selectedPost._id}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    value={post.title}
                    onChange={(e) =>
                      setPost({ ...post, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    value={post.description}
                    onChange={(e) =>
                      setPost({ ...post, description: e.target.value })
                    }
                    required
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="postImg">Image</label>
                  <input
                    type="file"
                    id="postImg"
                    onChange={(e) => setPostImg(e.target.files[0])}
                  />
                </div>
                <button type="submit">Update</button>
                <button type="button" onClick={() => setSelectedPost(null)}>
                  Cancel
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {profileEditModal && (
        <ProfileEdit
          handleCloseBtn={handleCloseBtn}
          currentUser={currentUser}
        />
      )}
    </>
  );
};

export default Profile;

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";

function PostEdit({ handleCloseBtn, post }) {
  const { currentUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: post?.title,
    dateOfBirth: post?.dateOfBirth,
    deathDate: post?.deathDate,
    birthPlace: post?.birthPlace,
    burial: post?.burial,
    plot: post?.plot,
    description: post?.description,
    traits: post?.traits,
    postImg: post?.postImg,
  });

  useEffect(() => {
    setFormData({
      title: post?.title,
      dateOfBirth: post?.dateOfBirth,
      deathDate: post?.deathDate,
      birthPlace: post?.birthPlace,
      burial: post?.burial,
      plot: post?.plot,
      description: post?.description,
      traits: post?.traits,
      postImg: post?.postImg,
    });
  }, [post]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    if (!formData.postImg) {
      alert("Please select an avatar image.");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("birthPlace", formData.birthPlace);
    data.append("burial", formData.burial);
    data.append("plot", formData.plot);
    data.append("dateOfBirth", formData.dateOfBirth);
    data.append("deathDate", formData.deathDate);
    data.append("traits", formData.traits);
    data.append("postImg", formData.postImg);
    data.append("postId", post._id);

    console.log(post._id);

    try {
      const response = await axios.post(
        `https://api.lifebahnheaven.com/api/v1/posts/update-post`,
        data,
        {
          headers: {
            Authorization: `Bearer ${currentUser?.data.accessToken}`,
          },
        }
      );
      console.log(response.data);
      alert("Post updated successfully!");
      handleCloseBtn(); // Close the modal on success
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="post-edit-modal-overlay">
      <div className="form create_post__form">
        <h1 className="text-center bg-transparent">Edit Rip</h1>

        {error && <p className="error-text">{error}</p>}

        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Rip Name
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            defaultValue={formData.title}
            onChange={handleChange}
            placeholder="George Washington..."
          />
        </div>

        <div className="mb-3">
          <label htmlFor="dateOfBirth" className="form-label">
            Date of Birth
          </label>
          <input
            type="date"
            className="form-control"
            id="dateOfBirth"
            name="dateOfBirth"
            defaultValue={formData.dateOfBirth?.split("T")[0]}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="deathDate" className="form-label">
            Death Date
          </label>
          <input
            type="date"
            className="form-control"
            id="deathDate"
            name="deathDate"
            defaultValue={formData.deathDate?.split("T")[0]}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="birthPlace" className="form-label">
            Birth Place
          </label>
          <input
            type="text"
            className="form-control"
            id="birthPlace"
            name="birthPlace"
            defaultValue={formData.birthPlace}
            onChange={handleChange}
            placeholder="Toronto Canada..."
          />
        </div>

        <div className="mb-3">
          <label htmlFor="burial" className="form-label">
            Burial
          </label>
          <input
            type="text"
            className="form-control"
            id="burial"
            name="burial"
            defaultValue={formData.burial}
            onChange={handleChange}
            placeholder="NY USA..."
          />
        </div>

        <div className="mb-3">
          <label htmlFor="plot" className="form-label">
            Plot
          </label>
          <input
            type="text"
            className="form-control"
            id="plot"
            name="plot"
            defaultValue={formData.plot}
            onChange={handleChange}
            placeholder="Madrid Spain..."
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            rows="4"
            cols="50"
            className="form-control"
            id="description"
            name="description"
            defaultValue={formData.description}
            onChange={handleChange}
            placeholder="Tell us more about him/her"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="traits" className="form-label">
            Enter Traits You Like About Him
          </label>
          <input
            type="text"
            className="form-control"
            id="traits"
            name="traits"
            defaultValue={formData.traits}
            onChange={handleChange}
            placeholder="Please enter the traits using space"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="postImg" className="form-label">
            Choose Rip Image
          </label>
          <input
            type="file"
            className="form-control"
            id="postImg"
            name="postImg"
            onChange={handleFileChange}
          />
        </div>

        <button
          onClick={handleSubmit}
          type="submit"
          className="btn btn-secondary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Updating..." : "Update Rip"}
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={handleCloseBtn}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default PostEdit;

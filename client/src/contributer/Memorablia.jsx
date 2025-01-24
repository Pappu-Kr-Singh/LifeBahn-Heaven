import React, { useContext, useState } from "react";
import { MemorabliaStore } from "../store/post-list-store";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useParams } from "react-router-dom";

const Memorablia = ({ onMemorabliaAdded }) => {
  const { _id } = useParams(); // Retrieve RIP ID from route parameters
  const { currentUser } = useContext(AuthContext);
  const { addMemorablia } = useContext(MemorabliaStore); // Adjust according to your context structure
  const [formData, setFormData] = useState({
    memorabliaImg: null,
  });
  const navigate = useNavigate();

  // console.log(currentUser);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    setFormData({
      ...formData,
      memorabliaImg: files[0],
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append("memorabliaImg", formData.memorabliaImg);
    data.append("postId", _id); // Pass the RIP ID (from useParams)

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/memorablias",
        data,
        {
          headers: {
            Authorization: `Bearer ${currentUser?.data.accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Notify parent component about the newly added Memorablia
      if (onMemorabliaAdded) {
        onMemorabliaAdded(response.data.data); // Pass the new flower data to parent
      }
      alert("Memorablia Has Been Added Successfully");

      // Navigate to another route if necessary
      // navigate("/flowers"); // Example route
    } catch (error) {
      console.error("Error during memorablia Adding:", error.response?.data);
      alert("Error Adding memorablia, please try again.");
    }

    // Call addFlower to update your context/store if needed
    addMemorablia(formData.name, formData.memorabliaImg);
  };

  return (
    <div className="create__flower">
      <form className="form create_flower__form" onSubmit={handleSubmit}>
        <h1 className="text-center bg-transparent text-light">
          Add Memorablia
        </h1>

        <div className="mb-3">
          <label htmlFor="name" className="form-label text-light">
            Your Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            defaultValue={currentUser?.data?.user?.fullName}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="memorabliaImg" className="form-label text-light">
            Choose memomorablia
          </label>
          <input
            type="file"
            className="form-control"
            id="memorabliaImg"
            name="memorabliaImg"
            onChange={handleFileChange}
          />
        </div>

        <button type="submit" className="btn btn-secondary">
          Add Memorablia
        </button>
      </form>
    </div>
  );
};

export default Memorablia;

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";

function ProfileEdit({ handleCloseBtn }) {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const user = currentUser?.data?.user;

  const [formData, setFormData] = useState({
    fullName: user?.fullName,
    userName: user?.userName,
    avatar: user?.avatar,
  });

  useEffect(() => {
    setFormData({
      fullName: user?.fullName,
      userName: user?.userName,
      avatar: user?.avatar,
    });
  }, [user]);

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

    if (!formData.avatar) {
      alert("Please select an avatar image.");
      return;
    }

    const data = new FormData();
    data.append("fullName", formData.fullName);
    data.append("userName", formData.userName);
    data.append("avatar", formData.avatar);

    try {
      const response = await axios.post(
        "https://api.lifebahnheaven.com/api/v1/users/update-profile",
        data,
        {
          headers: {
            Authorization: `Bearer ${currentUser?.data.accessToken}`,
          },
        }
      );
      const updatedUser = response.data.user;
      const updatedCurrentUser = {
        ...currentUser,
        data: {
          ...currentUser.data,
          user: updatedUser,
        },
      };
      setCurrentUser(updatedCurrentUser);
      console.log(updatedCurrentUser);
      localStorage.setItem("user", JSON.stringify(updatedCurrentUser));
      alert("Profile updated successfully!");
      handleCloseBtn();
    } catch (error) {
      console.error(
        "Error during profile update:",
        error.response?.data || error.message
      );
      alert("An error occurred during profile update.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal_container">
        <h2>Edit Profile</h2>
        <div className="form-group">
          <label htmlFor="avatar" className="avatar">
            <img
              src={
                formData.avatar instanceof File
                  ? URL.createObjectURL(formData.avatar)
                  : user?.avatar
              }
              alt="Avatar"
            />
          </label>
          <input
            type="file"
            accept="image/*"
            name="avatar"
            id="avatar"
            hidden
            onChange={handleFileChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={user?.email ?? ""}
            readOnly
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="userName"
            defaultValue={formData.userName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="name"
            name="fullName"
            defaultValue={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="button-group">
          <button onClick={handleSubmit}>Save</button>
          <button className="close-btn" onClick={handleCloseBtn}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileEdit;

import React, { useContext, useState } from "react";
import { DocumentStore } from "../store/post-list-store";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/authContext";

const Document = ({ onDocumentAdded }) => {
  const { _id } = useParams(); // Retrieve the post ID from route parameters
  const { currentUser } = useContext(AuthContext);
  // const [documentFile, setDocumentFile] = useState(null);
  const { addDocument } = useContext(DocumentStore);

  const [formData, setFormData] = useState({
    documentFile: null,
  });
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const { files } = e.target;
    setFormData({
      ...formData,
      documentFile: files[0],
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.documentFile) {
      alert("Please select a document to upload.");
      return;
    }

    const data = new FormData();
    data.append("documentFile", formData.documentFile);
    data.append("postId", _id);

    try {
      const response = await axios.post(
        "https://api.lifebahnheaven.com/api/v1/documents", // Adjust endpoint if necessary
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${currentUser?.data.accessToken}`,
          },
        }
      );

      // Notify parent component about the newly added Document
      if (onDocumentAdded) {
        onDocumentAdded(response.data.data); // Pass the new flower data to parent
      }
      alert("Document uploaded successfully");
      navigate(`/post/${_id}`); // Redirect if needed
      // console.log(response);
    } catch (error) {
      console.error("Error uploading document:", error?.response?.data);
      alert("Error uploading document, please try again.");
    }

    // Call addFlower to update your context/store if needed
    addDocument(formData.name, formData.documentFile, _id);
  };

  return (
    <div className="create__document">
      <div className="form create_document__form">
        <h1 className="text-center bg-transparent text-light">Add Document</h1>

        <div className="mb-3">
          <label htmlFor="name" className="form-label text-light">
            Your Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={currentUser?.data?.user?.fullName}
            disabled
            placeholder="Enter your name"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="documentFile" className="form-label text-light">
            Select Document
          </label>
          <input
            type="file"
            className="form-control"
            id="documentFile"
            name="documentFile"
            accept=".pdf,.doc,.docx" // Limit to specific document formats
            onChange={handleFileChange}
          />
        </div>

        <button
          onClick={handleSubmit}
          type="submit"
          className="btn btn-secondary"
        >
          Upload Document
        </button>
      </div>
    </div>
  );
};

export default Document;

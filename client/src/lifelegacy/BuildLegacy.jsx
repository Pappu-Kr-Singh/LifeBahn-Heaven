import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const BuildLegacy = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // console.log(currentUser);

  const [formData, setFormData] = useState({
    userId: currentUser?.data?.user?._id || "",
    relationships: [{ name: "", lastName: "", relationship: "" }],
    bucketlists: [{ type: "", description: "", status: "" }],
    assets: [{ item: "", description: "", value: "", beneficiaries: "" }],
    aspirations: [{ name: "", description: "", comment: "" }],
    accomplishments: [{ description: "", from: "", to: "", beneficiaries: "" }],
  });

  useEffect(() => {
    if (currentUser?._id) {
      setFormData((prevData) => ({ ...prevData, userId: currentUser._id }));
    }
  }, [currentUser]);

  const handleChange = (e, section, index) => {
    const { name, value } = e.target;
    const updatedSection = [...formData[section]];
    updatedSection[index][name] = value;
    setFormData({ ...formData, [section]: updatedSection });
  };

  const addField = (section) => {
    const emptyEntry = {
      relationships: {
        name: "Default Name",
        lastName: "Default Last Name",
        relationship: "Default Relationship",
      },
      bucketlists: {
        type: "Default Type",
        description: "Default Description",
        status: "Default Status",
      },
      assets: {
        item: "Default Item",
        description: "Default Description",
        value: "Default Value",
        beneficiaries: "Default Beneficiaries",
      },
      aspirations: {
        name: "Default Name",
        description: "Default Description",
        comment: "Default Comment",
      },
      accomplishments: {
        description: "Default Description",
        from: new Date().toISOString().split("T")[0],
        to: new Date().toISOString().split("T")[0],
        beneficiaries: "Default Beneficiaries",
      },
    };
    setFormData({
      ...formData,
      [section]: [...formData[section], emptyEntry[section]],
    });
  };

  const removeField = (section, index) => {
    const updatedSection = formData[section].filter((_, i) => i !== index);
    setFormData({ ...formData, [section]: updatedSection });
  };

  const validateFormData = () => {
    if (!formData.userId) {
      alert("User ID is missing!");
      return false;
    }
    for (const section of [
      "relationships",
      "bucketlists",
      "assets",
      "aspirations",
      "accomplishments",
    ]) {
      for (const item of formData[section]) {
        if (Object.values(item).some((value) => !value)) {
          alert(`Please fill out all fields in ${section}!`);
          return false;
        }
      }
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateFormData()) return;
    try {
      const response = await axios.post(
        "https://api.lifebahnheaven.com/api/v1/legacies",
        formData,
        {
          headers: {
            Authorization: `Bearer ${currentUser?.data.accessToken}`,
          },
        }
      );
      alert("Data submitted successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error during submission:", error);
      alert("Error submitting data. Please try again.");
    }
  };

  return (
    <div className="build_legacy">
      <form className=" build_legacy_form" onSubmit={handleSubmit}>
        <h1 className="text-center bg-transparent">Build Your Legacy</h1>

        {/* Relationships Section */}
        <h3>Relationships</h3>
        {formData.relationships.map((relationship, index) => (
          <div key={index} className="relationship-entry">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={relationship.name}
              onChange={(e) => handleChange(e, "relationships", index)}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={relationship.lastName}
              onChange={(e) => handleChange(e, "relationships", index)}
            />
            <input
              type="text"
              name="relationship"
              placeholder="Relationship Type"
              value={relationship.relationship}
              onChange={(e) => handleChange(e, "relationships", index)}
            />
            <button
              type="button"
              onClick={() => removeField("relationships", index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={() => addField("relationships")}>
          Add Relationship
        </button>

        {/* Bucket List Section */}
        <h3>Bucket List</h3>
        {formData.bucketlists.map((bucketlist, index) => (
          <div key={index} className="bucketlist-entry">
            <input
              type="text"
              name="type"
              placeholder="Type"
              value={bucketlist.type}
              onChange={(e) => handleChange(e, "bucketlists", index)}
            />
            <textarea
              name="description"
              placeholder="Description"
              value={bucketlist.description}
              onChange={(e) => handleChange(e, "bucketlists", index)}
            />
            <input
              type="text"
              name="status"
              placeholder="Status"
              value={bucketlist.status}
              onChange={(e) => handleChange(e, "bucketlists", index)}
            />
            <button
              type="button"
              onClick={() => removeField("bucketlists", index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={() => addField("bucketlists")}>
          Add Bucket List
        </button>

        {/* Assets Section */}
        <h3>Assets</h3>
        {formData.assets.map((asset, index) => (
          <div key={index} className="asset-entry">
            <input
              type="text"
              name="item"
              placeholder="Item"
              value={asset.item}
              onChange={(e) => handleChange(e, "assets", index)}
            />
            <textarea
              name="description"
              placeholder="Description"
              value={asset.description}
              onChange={(e) => handleChange(e, "assets", index)}
            />
            <input
              type="text"
              name="value"
              placeholder="Value"
              value={asset.value}
              onChange={(e) => handleChange(e, "assets", index)}
            />
            <input
              type="text"
              name="beneficiaries"
              placeholder="Beneficiaries"
              value={asset.beneficiaries}
              onChange={(e) => handleChange(e, "assets", index)}
            />
            <button type="button" onClick={() => removeField("assets", index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={() => addField("assets")}>
          Add Asset
        </button>

        {/* Aspirations Section */}
        <h3>Aspirations</h3>
        {formData.aspirations.map((aspiration, index) => (
          <div key={index} className="aspiration-entry">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={aspiration.name}
              onChange={(e) => handleChange(e, "aspirations", index)}
            />
            <textarea
              name="description"
              placeholder="Description"
              value={aspiration.description}
              onChange={(e) => handleChange(e, "aspirations", index)}
            />
            <input
              type="text"
              name="comment"
              placeholder="Comment"
              value={aspiration.comment}
              onChange={(e) => handleChange(e, "aspirations", index)}
            />
            <button
              type="button"
              onClick={() => removeField("aspirations", index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={() => addField("aspirations")}>
          Add Aspiration
        </button>

        {/* Accomplishments Section */}
        <h3>Accomplishments</h3>
        {formData.accomplishments.map((accomplishment, index) => (
          <div key={index} className="accomplishment-entry">
            <textarea
              name="description"
              placeholder="Description"
              value={accomplishment.description}
              onChange={(e) => handleChange(e, "accomplishments", index)}
            />
            <input
              type="number"
              name="from"
              value={accomplishment.from}
              min="1900" // Set a reasonable minimum year
              max={new Date().getFullYear()} // Restrict the maximum year to the current year
              placeholder="YYYY" // Placeholder for user guidance
              onChange={(e) => handleChange(e, "accomplishments", index)}
              onInput={(e) => {
                if (e.target.value.length > 4)
                  e.target.value = e.target.value.slice(0, 4); // Limit to 4 digits
              }}
            />

            <input
              type="number"
              name="to"
              value={accomplishment.to}
              min="1900" // Set a reasonable minimum year
              max={new Date().getFullYear()} // Restrict the maximum year to the current year
              placeholder="YYYY" // Placeholder for better user experience
              onChange={(e) => handleChange(e, "accomplishments", index)}
            />

            <input
              type="text"
              name="beneficiaries"
              placeholder="Beneficiaries"
              value={accomplishment.beneficiaries}
              onChange={(e) => handleChange(e, "accomplishments", index)}
            />
            <button
              type="button"
              onClick={() => removeField("accomplishments", index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={() => addField("accomplishments")}>
          Add Accomplishment
        </button>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BuildLegacy;

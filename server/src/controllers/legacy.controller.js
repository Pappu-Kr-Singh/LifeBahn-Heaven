import { Legacy } from "../models/legacy.model.js";

const createLegacy = async (req, res) => {
  try {
    const {
      userId,
      birthPlace,
      description,
      relationships,
      bucketlists,
      assets,
      aspirations,
      accomplishments,
    } = req.body;

    if (
      !userId ||
      !birthPlace ||
      !description ||
      !relationships ||
      !bucketlists ||
      !assets ||
      !aspirations ||
      !accomplishments
    ) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    const newLegacy = new Legacy({
      userId,
      relationships,
      birthPlace,
      description,
      bucketlists,
      assets,
      aspirations,
      accomplishments,
    });

    await newLegacy.save();

    res
      .status(201)
      .json({ message: "Legacy data saved successfully!", data: newLegacy });
  } catch (error) {
    console.error("Error creating legacy:", error);
    res
      .status(500)
      .json({ error: "An error occurred while saving the legacy data." });
  }
};

// Fetch all legacy entries
const getAllLegacies = async (req, res) => {
  try {
    const legacies = await Legacy.find();
    res.status(200).json({ data: legacies });
  } catch (error) {
    console.error("Error fetching legacies:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving legacy data." });
  }
};

// Fetch a single legacy entry by user ID
const getLegacyByUserId = async (req, res) => {
  try {
    const { _id } = req.params;
    console.log(_id);
    const legacy = await Legacy.findOne({ _id });

    if (!legacy) {
      return res
        .status(404)
        .json({ message: "No legacy data found for this user." });
    }

    res.status(200).json({ data: legacy });
  } catch (error) {
    console.error("Error fetching legacy by user ID:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving legacy data." });
  }
};

// Update a legacy entry
const updateLegacy = async (req, res) => {
  try {
    const { userId } = req.params;
    const updatedData = req.body;

    const updatedLegacy = await Legacy.findOneAndUpdate(
      { userId },
      updatedData,
      { new: true }
    );

    if (!updatedLegacy) {
      return res
        .status(404)
        .json({ message: "No legacy data found for this user." });
    }

    res.status(200).json({
      message: "Legacy data updated successfully!",
      data: updatedLegacy,
    });
  } catch (error) {
    console.error("Error updating legacy:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the legacy data." });
  }
};

// Delete a legacy entry
const deleteLegacy = async (req, res) => {
  try {
    const { userId } = req.params;

    const deletedLegacy = await Legacy.findOneAndDelete({ userId });

    if (!deletedLegacy) {
      return res
        .status(404)
        .json({ message: "No legacy data found for this user." });
    }

    res.status(200).json({ message: "Legacy data deleted successfully!" });
  } catch (error) {
    console.error("Error deleting legacy:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the legacy data." });
  }
};

export {
  createLegacy,
  getAllLegacies,
  getLegacyByUserId,
  updateLegacy,
  deleteLegacy,
};

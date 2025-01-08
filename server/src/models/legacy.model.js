import mongoose, { Schema } from "mongoose";

const LegacySchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    // birthPlace: {
    //   type: String,
    //   required: true,
    // },
    // description: {
    //   type: String,
    //   required: true,
    // },
    relationships: [
      {
        name: { type: String, required: true },
        lastName: { type: String, required: true },
        relationship: { type: String, required: true },
      },
    ],
    bucketlists: [
      {
        type: { type: String, required: true },
        description: { type: String, required: true },
        status: { type: String, required: true },
      },
    ],
    assets: [
      {
        item: { type: String, required: true },
        description: { type: String, required: true },
        value: { type: String, required: true },
        beneficiaries: { type: String, required: true },
      },
    ],
    aspirations: [
      {
        name: { type: String, required: true },
        description: { type: String, required: true },
        comment: { type: String, required: true },
      },
    ],
    accomplishments: [
      {
        description: { type: String, required: true },
        from: { type: Date, required: true },
        to: { type: Date, required: true },
        beneficiaries: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

export const Legacy = mongoose.model("Legacy", LegacySchema);

import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate";

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    postImg: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    birthPlace: {
      type: String,
      required: true,
    },
    burial: {
      type: String,
      required: true,
    },
    plot: {
      type: String,
      required: true,
    },
    Traits: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    deathDate: {
      type: Date,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    contributer: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
      // unique:true
    },
    flower: {
      type: [Schema.Types.ObjectId],
      ref: "Flower",
      default: [],
    },
    document: {
      type: [Schema.Types.ObjectId],
      ref: "Document",
      default: [],
    },
    prayer: {
      type: [Schema.Types.ObjectId],
      ref: "Prayer",
      default: [],
    },
    photo: {
      type: [Schema.Types.ObjectId],
      ref: "Photo",
      default: [],
    },
    memorablia: {
      type: [Schema.Types.ObjectId],
      ref: "Memorablia",
      default: [],
    },
  },
  { timestamps: true }
);

postSchema.plugin(mongooseAggregatePaginate);
export const Post = mongoose.model("Post", postSchema);

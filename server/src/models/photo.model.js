import mongoose, { Schema } from "mongoose";
// import mongooseAggregatePaginate from "mongoose-aggregate-paginate";

const PhotoSchema = new Schema(
  {
    photoImg: {
      type: String,
      required: true,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    post: {
      type: Schema.Types.ObjectId,
      ref: "Post", // Assuming your RIP schema is named "Post"
      required: true,
    },
  },
  { timestamps: true }
);

// flowerSchema.plugin(mongooseAggregatePaginate);
export const Photo = mongoose.model("Photo", PhotoSchema);

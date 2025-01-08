import mongoose, { isValidObjectId } from "mongoose";
import { Memorablia } from "../models/memorablia.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Post } from "../models/post.model.js";

const getAllMemorabliaById = asyncHandler(async (req, res) => {
  // Todo- Get all Memorablia by userID
  const { userId } = req.params;
  // console.log(userId);
  // 667069c207c28a1763dc109c

  if (!isValidObjectId(userId)) {
    throw new ApiError(401, "invalid UserId");
  }

  const memorablia = await Memorablia.find({ owner: userId }).populate(
    "owner",
    "fullName"
  );

  if (!memorablia.length) {
    throw new ApiError(401, "No memorablia found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        memorablia,
        "All memorablia have been fetched successfully"
      )
    );
});

const getMemorabliasByRipId = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  // console.log(postId);
  if (!isValidObjectId(postId)) {
    throw new ApiError(401, "Invalid RIP ID");
  }

  const memorablias = await Memorablia.find({ post: postId }).populate(
    "owner",
    "fullName"
  );
  if (!memorablias.length) {
    throw new ApiError(404, "No memorablias found for this RIP");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, memorablias, "Memorablias fetched successfully")
    );
});

const getAllMemorablias = asyncHandler(async (req, res) => {
  // Fetch all posts
  const memorablias = await Memorablia.find({});
  // console.log("Found memorablia: ", memorablias);

  if (!memorablias.length) {
    throw new ApiError(401, "No memorablias found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        memorablias,
        "All memorablias have been fetched successfully"
      )
    );
});

const createMemorablia = asyncHandler(async (req, res) => {
  // Create Memorablia

  const { postId } = req.body;
  console.log(postId);

  if (!isValidObjectId(postId)) {
    throw new ApiError(401, "Invalid postId");
  }

  const post = await Post.findOne({ _id: postId });
  // Check for avatar image and upload to Cloudinary
  // const avatarBuffer = req.files?.avatar[0]?.buffer;
  const memorabliaBuffer = req.files?.memorabliaImg[0]?.buffer;

  if (!memorabliaBuffer) {
    throw new ApiError(401, "Memorablia img is required");
  }

  // uploading the flowerImg to the cloudinary

  const memorabliaImg = await uploadOnCloudinary(memorabliaBuffer);
  if (!memorabliaImg) {
    throw new ApiError(
      401,
      "Error while uploading the memorabliaImg to cloudinary"
    );
  }

  const memorablia = await Memorablia.create({
    owner: req.user._id,
    memorabliaImg: memorabliaImg.url,
    post: postId,
  });

  post.memorablia.push(memorablia._id);
  await post.save();

  if (!memorablia) {
    throw new ApiError(401, "Error while creating a memorablia");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        memorablia,
        "The memorablia has been added Successfully"
      )
    );
});

export {
  getAllMemorabliaById,
  getAllMemorablias,
  createMemorablia,
  // deleteFlower,
  getMemorabliasByRipId,
};

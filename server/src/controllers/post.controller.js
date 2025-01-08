import mongoose, { isValidObjectId } from "mongoose";
import { Post } from "../models/post.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";

const getAllPostById = asyncHandler(async (req, res) => {
  // Todo- Get all post by userID
  const { userId } = req.params;
  // console.log(userId);
  if (!isValidObjectId(userId)) {
    throw new ApiError(401, "invalid UserId");
  }

  const post = await Post.find({ owner: userId }).populate("owner", "fullName");

  if (!post.length) {
    throw new ApiError(401, "No post found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, post, "All post have been fetched successfully")
    );
});

const getAllPost = asyncHandler(async (req, res) => {
  // Fetch all posts
  const posts = await Post.find({});
  // console.log("Found posts: ", posts);

  if (!posts.length) {
    throw new ApiError(401, "No posts found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, posts, "All posts have been fetched successfully")
    );
});

const createPost = asyncHandler(async (req, res) => {
  // Create post

  const {
    title,
    description,
    traits,
    dateOfBirth,
    birthPlace,
    burial,
    plot,
    deathDate,
  } = req.body;

  if (!title || !description) {
    throw new ApiError(401, "title and description are required");
  }

  if (!dateOfBirth || !birthPlace || !plot || !deathDate) {
    throw new ApiError(401, "Date of birth is missing");
  }

  const postImgBuffer = req.files?.postImg[0]?.buffer;

  if (!postImgBuffer) {
    throw new ApiError(401, "postImg is required");
  }

  // uploading the postImg to the cloudinary

  const postImg = await uploadOnCloudinary(postImgBuffer);
  if (!postImg) {
    throw new ApiError(401, "Error while uploading the postImg to cloudinary");
  }

  const post = await Post.create({
    title: title,
    description: description,
    owner: req.user._id,
    traits: traits,
    birthPlace: birthPlace,
    burial: burial,
    plot: plot,
    dateOfBirth: dateOfBirth,
    deathDate: deathDate,
    postImg: postImg.url,
  });

  const post_sponser = await User.findOne(req.user?._id);

  if (!post_sponser) {
    throw new ApiError(404, "User not found");
  }

  if (!Array.isArray(post_sponser.sponsor)) {
    throw new ApiError(500, "User sponsor field is not an array");
  }

  post_sponser.sponsor.push(post._id);
  await post_sponser.save();

  if (!post) {
    throw new ApiError(401, "Error while creating a post");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, post, "The post has been created Successfully"));
});

const updatePost = asyncHandler(async (req, res) => {
  // update post
  const {
    postId,
    title,
    description,
    dateOfBirth,
    deathDate,
    birthPlace,
    burial,
    plot,
    traits,
  } = req.body;

  if (!title) {
    return res.status(403).json({ message: "Title is required" });
  }

  if (!dateOfBirth) {
    return res.status(403).json({ message: "Date of Birth is required" });
  }

  if (!deathDate) {
    return res.status(403).json({ message: "Death Date is required" });
  }

  if (!burial) {
    return res.status(403).json({ message: "Burial information is required" });
  }

  if (!description) {
    return res.status(403).json({ message: "Description is required" });
  }

  // console.log("post img local path"postImgLocalPath);
  let postImgUrl = null;
  if (req.files?.postImg && req.files?.postImg[0]) {
    const postImgBuffer = req.files?.postImg[0]?.buffer;
    if (!postImgBuffer) {
      throw new ApiError(401, "postImg is required");
    }

    const postImgNew = await uploadOnCloudinary(postImgBuffer);

    if (!postImgNew) {
      throw new ApiError(
        401,
        "Error while uploading the postImg to cloudinary"
      );
    }

    postImgUrl = postImgNew.url;
  }

  const updatedPost = {
    title,
    description,
    dateOfBirth,
    deathDate,
    birthPlace,
    burial,
    plot,
    traits,
    ...(postImgUrl && { postImg: postImgUrl }),
  };

  Post.findByIdAndUpdate({ _id: postId }, updatedPost, { runValidators: true })
    .then((post) => {
      return res.status(200).json({ message: "Updated successfully.", post });
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    });
});

const deletePost = asyncHandler(async (req, res) => {
  // delete post
  const { postId } = req.params;

  if (!isValidObjectId(postId)) {
    throw new ApiError(401, "Invalid postId");
  }

  const post = await Post.findByIdAndDelete(postId);

  if (!post) {
    throw new ApiError(401, "No post found with this id");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, post, "Post has been deleted Successfully"));
});

const getPostById = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  // Validate the postId
  if (!isValidObjectId(postId)) {
    throw new ApiError(401, "Invalid postId");
  }

  // Fetch the post by its ID
  const post = await Post.findById(postId).populate("owner", "fullName");

  // If no post is found, return an error
  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  // Send the post data as a response
  return res
    .status(200)
    .json(new ApiResponse(200, post, "Post has been fetched successfully"));
});

const getSponsorPost = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const post = await Post.find({ owner: userId });
  if (!post) {
    throw new ApiError(404, "This user does not sponsor any post.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, post, "Post sponsor by you."));
});

const getPostContributor = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  // console.log(userId);
  await Post.find({ contributer: userId })
    .then((post) => {
      return res.status(200).json(new ApiResponse(200, post, "ok"));
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
    });
});

export {
  getAllPost,
  createPost,
  deletePost,
  updatePost,
  getAllPostById,
  getPostById,
  getSponsorPost,
  getPostContributor,
};

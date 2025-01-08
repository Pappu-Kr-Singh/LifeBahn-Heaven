import mongoose, { isValidObjectId } from "mongoose";
import { Document } from "../models/document.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Post } from "../models/post.model.js";

const getAllDocumentsByUserId = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!isValidObjectId(userId)) {
    throw new ApiError(401, "Invalid User ID");
  }

  const documents = await Document.find({ owner: userId }).populate(
    "owner",
    "fullName"
  );

  if (!documents.length) {
    throw new ApiError(404, "No documents found for this user");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        documents,
        "All documents have been fetched successfully"
      )
    );
});

const getAllDocuments = asyncHandler(async (req, res) => {
  const documents = await Document.find({});

  if (!documents.length) {
    throw new ApiError(404, "No documents found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        documents,
        "All documents have been fetched successfully"
      )
    );
});

const createDocument = asyncHandler(async (req, res) => {
  console.log("File received:", req.file);
  console.log("Body received:", req.body);

  const { postId } = req.body;
  console.log(req.user._id);

  if (!isValidObjectId(postId)) {
    throw new ApiError(401, "Invalid Post ID");
  }

  const post = await Post.findById(postId);
  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  const documentBuffer = req.file?.buffer;
  if (!documentBuffer) {
    throw new ApiError(400, "Document file is required");
  }

  const documentUpload = await uploadOnCloudinary(documentBuffer, true);

  if (!documentUpload.url) {
    throw new ApiError(500, "Error uploading the document to Cloudinary");
  }

  const document = await Document.create({
    owner: req.user._id,
    documentFile: documentUpload.url,
    post: postId,
  });

  post.document.push(document._id);
  await post.save();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        document,
        "The document has been created successfully"
      )
    );
});

const getDocumentsByPostId = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  if (!isValidObjectId(postId)) {
    throw new ApiError(401, "Invalid Post ID");
  }

  const documents = await Document.find({ post: postId }).populate(
    "owner",
    "fullName"
  );

  if (!documents.length) {
    throw new ApiError(404, "No documents found for this post");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, documents, "Documents fetched successfully"));
});

const deleteDocument = asyncHandler(async (req, res) => {
  const { documentId } = req.params;

  if (!isValidObjectId(documentId)) {
    throw new ApiError(401, "Invalid Document ID");
  }

  const document = await Document.findByIdAndDelete(documentId);

  if (!document) {
    throw new ApiError(404, "No document found with this ID");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, document, "Document has been deleted successfully")
    );
});

export {
  getAllDocumentsByUserId,
  getAllDocuments,
  createDocument,
  deleteDocument,
  getDocumentsByPostId,
};

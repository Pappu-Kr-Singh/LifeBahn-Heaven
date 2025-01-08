import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import {
  uploadOnCloudinary,
  // deleteFromCloudinary,
} from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";
import jwt, { decode } from "jsonwebtoken";
import mongoose from "mongoose";
import { Post } from "../models/post.model.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./env",
});

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Save the refresh token in the user document
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    console.log("Generated Tokens:", { accessToken, refreshToken }); // Log for debugging
    return { accessToken, refreshToken }; // Ensure both tokens are returned correctly
  } catch (error) {
    console.error(error); // Log the error to help with debugging
    throw new ApiError(
      500,
      "Something went wrong while generating Refresh and Access Tokens"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, userName, password } = req.body;

  if (
    [fullName, email, userName, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const emailValidate = email.includes("@");
  if (!emailValidate) {
    throw new ApiError(400, "Email is not correct");
  }

  const UserNameExist = await User.findOne({ userName });
  const UserEmailExist = await User.findOne({ email });

  if (UserEmailExist) {
    throw new ApiError(408, "Email Already Exists");
  }

  if (UserNameExist) {
    throw new ApiError(409, "Username Already Exists");
  }

  // Check for avatar image and upload to Cloudinary
  const avatarBuffer = req.files?.avatar[0]?.buffer;

  if (!avatarBuffer) {
    throw new ApiError(400, "Avatar is required");
  }

  const avatar = await uploadOnCloudinary(avatarBuffer);

  if (!avatar) {
    throw new ApiError(400, "Failed to upload avatar to Cloudinary");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    email,
    password,
    userName: userName.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User Registered Successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  // get user details
  // username or email
  // find user
  // password check
  // access and refresh token
  // send cookie

  const { email, password, userName } = req.body;

  if (!(userName || email)) {
    throw new ApiError(400, "username or email is required");
  }
  if (!password) {
    throw new ApiError(401, "password is required");
  }

  // console.log(req.body);
  const user = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (!user) {
    throw new ApiError(401, "No user found from this user id");
  }
  // console.log("user ======== ", user);

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credientials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User Loggin Successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1, // this will remove the user details
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logout successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized access");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refreshToken");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true, // Only if using https
    };

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );

    return res
      .status(200)
      .cookie("AccessToken", accessToken, options)
      .cookie("RefreshToken", refreshToken, options)
      .json({
        success: true,
        message: "Access Token Refreshed Successfully",
        data: { accessToken, refreshToken },
      });
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh Token");
  }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword, confirmNewPassword } = req.body;

  if (!(newPassword === confirmNewPassword)) {
    throw new ApiError(401, "Confirm password doesn't match");
  }

  const user = await User.findById(req.user?._id);

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old password");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Current user Fetched Seccessfullly"));
});

const getAllNormalUsers = asyncHandler(async (req, res) => {
  const post_sponser = req.user?._id;
  const users = await User.find({ _id: { $ne: post_sponser } }).select(
    "fullName userName _id"
  );
  res.status(200).json(new ApiResponse(200, users, "Normal users fetched"));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { fullName, email } = req.body;

  if (!fullName || !email) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        fullName, // same as fullName : fullName
        email: email, // same as email, of es6 syntax
      },
    },
    { new: true }
  ).select(" -password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"));
});

const updateUserRoleToSponsor = asyncHandler(async (req, res) => {
  const userId = req.user?._id; // Assuming the user is authenticated and the user ID is in the token

  // Update the user's role to 'sponsor'
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { roles: "sponsor" },
    { new: true, runValidators: true } // new: true returns the updated user
  );

  if (!updatedUser) {
    throw new ApiError(404, "User not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "User role updated to sponsor"));
});

// add a contributor to a post
const updateUserRole = async (req, res) => {
  const { postId, userId } = req.body;
  // console.log(postId, userId);
  // This should contain 'contributor'
  const post_sponser = req.user?._id;
  // console.log("post_sponsoer", post_sponser);
  const user = await User.findOne({ _id: userId });
  const alreadyContributer = user.contributer.includes(postId);
  if (alreadyContributer) {
    return res
      .status(403)
      .json({ error: "User is already a contributer to this post" });
  }

  await Post.findOneAndUpdate(
    { _id: postId },
    { $push: { contributer: userId } }
  )
    .then(async (post) => {
      await User.findOneAndUpdate(
        { _id: userId },
        { $push: { contributer: postId } }
      )
        .then((user) => {
          return res
            .status(200)
            .json({ message: "User role updated successfully" });
        })
        .catch((err) => {
          return res.status(500).json({ error: "internal server error" });
        });
    })
    .catch((err) => {
      return res.status(500).json({ error: "internal server error" });
    });
};

const forgotPassword = asyncHandler(async (req, res, next) => {
  const { userName, email, newPassword, confirmNewPassword } = req.body;

  if (newPassword !== confirmNewPassword) {
    throw new ApiError(400, "Passwords do not match");
  }

  // Find user by username or email
  const user = await User.findOne({ $or: [{ userName }, { email }] });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Update the password
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  res.status(200).json(new ApiResponse(200, {}, "Password reset successfully"));
});

const updateProfile = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { fullName, userName } = req.body;

  if (!fullName || !userName) {
    return res.status(403).json({ message: "Please fill the required input" });
  }

  let avatarUrl = null;
  if (req.files?.avatar && req.files.avatar[0]) {
    const avatarBuffer = req.files.avatar[0].buffer;

    if (!avatarBuffer) {
      throw new ApiError(400, "Avatar is required");
    }

    const avatarNew = await uploadOnCloudinary(avatarBuffer);

    if (!avatarNew) {
      throw new ApiError(400, "Failed to upload avatar to Cloudinary");
    }

    avatarUrl = avatarNew.url;
  }

  const updateProfile = {
    fullName,
    userName: userName.toLowerCase(),
    ...(avatarUrl && { avatar: avatarUrl }),
  };

  User.findOneAndUpdate({ _id: userId }, updateProfile, { runValidators: true })
    .then((user) => {
      return res.status(200).json({ message: "Updated successfully.", user });
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    });
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  forgotPassword,
  updateUserRoleToSponsor,
  getAllNormalUsers,
  updateUserRole,
  updateProfile,
};

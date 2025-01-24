// import jwt from "jsonwebtoken";
// import ApiError from "../utils/ApiError.js";
// import { asyncHandler } from "../utils/asyncHandler.js";
// import { User } from "../models/user.model.js";

// export const verifyJWT = asyncHandler(async (req, _, next) => {
//   try {
//     // Extract token from cookies or Authorization header
//     const token =
//       req.cookies?.accessToken ||
//       req.header("Authorization")?.replace("Bearer ", "");

//     if (!token) {
//       console.error("No access token provided.");
//       throw new ApiError(401, "Unauthorized Request: No token provided");
//     }

//     // Verify the token
//     let decodedToken;
//     try {
//       decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//     } catch (error) {
//       console.error("Token verification failed:", error.message);
//       throw new ApiError(401, "Unauthorized Request: Invalid or expired token");
//     }

//     // Check if user exists in the database
//     const user = await User.findById(decodedToken._id).select(
//       "-password -refreshToken"
//     );

//     if (!user) {
//       console.error(`User not found for ID: ${decodedToken._id}`);
//       throw new ApiError(401, "Unauthorized Request: User does not exist");
//     }

//     // Attach user to the request object
//     req.user = user;
//     next();
//   } catch (error) {
//     // Handle ApiError or fallback to a generic message
//     console.error("JWT verification error:", error.message);
//     throw new ApiError(401, error.message || "Unauthorized Request");
//   }
// });

import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  // Extract token from cookies or Authorization header
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    console.error("No access token provided.");
    throw new ApiError(401, "Unauthorized Request: No token provided");
  }

  let decodedToken;
  try {
    // Verify the token
    decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    console.error("Token verification failed:", error.message);
    throw new ApiError(401, "Unauthorized Request: Invalid or expired token");
  }

  // Check if user exists in the database
  const user = await User.findById(decodedToken._id).select(
    "-password -refreshToken"
  );

  // console.log("User===", user);
  if (!user) {
    console.error(`User not found for ID: ${decodedToken._id}`);
    throw new ApiError(401, "Unauthorized Request: User does not exist");
  }

  // Attach user to the request object
  req.user = user;

  try {
    decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    throw new ApiError(401, "Unauthorized Request: Invalid or expired token");
  }

  // console.log(req.user._id);

  // Continue to the next middleware
  next();
});

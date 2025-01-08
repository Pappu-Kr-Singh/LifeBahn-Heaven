import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  // updateUserAvatar,
  // upadateUserCoverImage,
  updateUserRoleToSponsor,
  getAllNormalUsers,
  updateUserRole,
  forgotPassword,
  updateProfile,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
// import upload from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),

  registerUser
);

router.route("/update-profile").post(verifyJWT,
  upload.fields([
    {
      name:"avatar",
      maxCount:1
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  updateProfile
);

router.route("/login").post(loginUser);

// secured Routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/update-account").patch(verifyJWT, updateAccountDetails);
// router.route("/update-profile").post(verifyJWT, updateProfile);
router.route("/become-sponsor").patch(verifyJWT, updateUserRoleToSponsor);
router.route("/forgot-password").post(forgotPassword);
// Get all normal users
router.route("/normal").get(verifyJWT, getAllNormalUsers);
// Update user role

router.patch("/:userId/roles", updateUserRole);
// router
//   .route("/avatar")
//   .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);

// router.route("/history").get(verifyJWT, getWatchHistory);

export default router;
 
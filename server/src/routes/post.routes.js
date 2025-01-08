import { Router } from "express";
import {
  getAllPost,
  createPost,
  // updatePost,
  deletePost,
  getAllPostById,
  getPostById,
  getSponsorPost,
  getPostContributor,
  updatePost,
} from "../controllers/post.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();

router.use(verifyJWT);

// router.post("/", createPost);
router
  .route("/")
  .get(getAllPost)
  .post(
    upload.fields([
      {
        name: "postImg",
        maxCount: 1,
      },
    ]),

    createPost
  );

  router.route("/update-post").post(
    upload.fields([
      {
        name: "postImg",
        maxCount: 1,
      },]),
      updatePost
    );
// router.get("/:userId", getAllPostById);
// router.route("/:postId").delete(deletePost).patch(updatePost);

router.get("/post/:postId", getPostById);
router.delete("/:postId", deletePost);

router.get("/get-sponsor-post", getSponsorPost)
router.get("/get-contributer-post", getPostContributor);

export default router;

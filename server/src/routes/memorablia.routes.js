import { Router } from "express";
import {
  createMemorablia,
  getAllMemorabliaById,
  getAllMemorablias,
  getMemorabliasByRipId,
} from "../controllers/memorablia.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();

router.use(verifyJWT);

// router.post("/", createPost);
router
  .route("/")
  .get(getAllMemorablias)
  .post(
    upload.fields([
      {
        name: "memorabliaImg",
        maxCount: 1,
      },
    ]),

    createMemorablia
  );
router.get("/memorabliaId", getAllMemorabliaById);
// router.route("/:postId").delete(deletePost).patch(updatePost);

// router.get("/photo/:photoId", getAllPhotoById);
// router.patch("/:postId", updatePost);
// router.delete("/:photoId", delete);
router.get("/post/:postId", getMemorabliasByRipId);

export default router;

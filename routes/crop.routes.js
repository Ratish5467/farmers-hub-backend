import { Router } from "express";
import { getCrops, createCrop, updateCrop, deleteCrop } from "../controllers/crop.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";
// agar role based check chahiye to authorize bhi import kar lena
// import { authorize } from "../middleware/auth.middleware.js";

const router = Router();

router
  .route("/")
  .get(getCrops)                                  // public
  .post(verifyJwt, /* authorize("admin"), */ createCrop);   // admin only

router
  .route("/:id")
  .put(verifyJwt, /* authorize("admin"), */ updateCrop)     // admin only
  .delete(verifyJwt, /* authorize("admin"), */ deleteCrop); // admin only

export default router;

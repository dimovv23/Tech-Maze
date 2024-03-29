import express from "express";
import {
  createComment,
  getPostComments,
  like,
} from "../controllers/comment.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createComment);
router.get("/getPostComments/:postId", getPostComments);
router.put("/like/:commentId", verifyToken, like);

export default router;

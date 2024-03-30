import express from "express";
import {
  createComment,
  getPostComments,
  like,
  editComment,
  deleteComment,
} from "../controllers/comment.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createComment);
router.get("/getPostComments/:postId", getPostComments);
router.put("/like/:commentId", verifyToken, like);
router.put("/editComment/:commentId", verifyToken, editComment);
router.delete("/delete/:commentId", verifyToken, deleteComment);

export default router;

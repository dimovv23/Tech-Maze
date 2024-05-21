import express from "express";
import {
  getUsers,
  updateUser,
  deleteUser,
  signout,
  getUser,
  updateUserRole,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/getusers", verifyToken, getUsers);
router.put("/update/:userId", verifyToken, updateUser);
router.patch("/updaterole/:userId", verifyToken, updateUserRole);
router.delete("/delete/:userId", verifyToken, deleteUser);
router.post("/signout", signout);
router.get("/:userId", getUser);

export default router;

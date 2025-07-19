import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "@/modules/user/user.controller";
import { upload } from "@/config/upload";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", upload.single("image"), createUser);
router.put("/:id", upload.single("image"), updateUser);
router.delete("/:id", deleteUser);

export default router;

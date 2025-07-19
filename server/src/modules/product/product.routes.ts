import express from "express";
import * as productController from "./product.controller";
import { upload } from "@/config/upload";

const router = express.Router();

router.post("/", upload.single("image"), productController.createProduct);
router.put("/:id", upload.single("image"), productController.updateProduct);
router.get("/", productController.getProducts);
router.get("/:id", productController.getProduct);
router.delete("/:id", productController.deleteProduct);

export default router;

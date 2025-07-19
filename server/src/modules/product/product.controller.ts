import { Request, Response } from "express";
import * as serverProductService from "./product.service";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 10;
    const searchQuery =
      typeof req.query.searchQuery === "string" ? req.query.searchQuery : "";
    const ownerId =
      typeof req.query.ownerId === "string" ? req.query.ownerId : undefined;

    const result = await serverProductService.getAll({
      page,
      limit,
      searchQuery,
      ownerId,
    });

    const productsWithImageUrl = result.products.map((product: any) => {
      const imageUrl = product.image
        ? `${req.protocol}://${req.get("host")}/uploads/${product.image}`
        : null;

      return {
        ...(product.toObject ? product.toObject() : product), // handle mongoose doc or plain object
        imageUrl,
      };
    });

    res.json({
      ...result,
      products: productsWithImageUrl,
    });
  } catch (error: any) {
    console.error("[GET PRODUCTS ERROR]", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const product = await serverProductService.getById(req.params.id);
    const imagePath = product?.image
      ? `${req.protocol}://${req.get("host")}/uploads/${product?.image}`
      : null;
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ ...product.toObject(), imageUrl: imagePath });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).ownerId;

    const image = req.file?.filename;

    const productData = { ...req.body, image };

    const product = await serverProductService.create(productData, userId);

    res.status(201).json(product);
  } catch (error: any) {
    console.error("[CREATE PRODUCT ERROR]", error.message);
    res.status(400).json({ message: error.message || "Invalid product data" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const data: any = { ...req.body };
    if (req.file) {
      data.image = req.file.filename;
    } else {
      delete data.image;
      delete data.image;
    }

    const updated = await serverProductService.update(req.params.id, data);
    res.json(updated);
  } catch (err: any) {
    res
      .status(err.message === "Unauthorized" ? 403 : 404)
      .json({ message: err.message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    await serverProductService.remove(req.params.id, (req as any).user.id);
    res.json({ message: "Product deleted" });
  } catch (err: any) {
    res
      .status(err.message === "Unauthorized" ? 403 : 404)
      .json({ message: err.message });
  }
};

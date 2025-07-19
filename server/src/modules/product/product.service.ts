import Product from "./product.model";
import { CreateProductDto } from "@/modules/product/product.types";

type GetAllParams = {
  page: number;
  limit: number;
  searchQuery?: string;
  ownerId?: string;
};

export const getAll = async ({
  page,
  limit,
  searchQuery = "",
  ownerId,
}: GetAllParams) => {
  const query: any = {};

  if (searchQuery) {
    query.name = { $regex: searchQuery, $options: "i" };
  }

  if (ownerId) {
    query.owner = ownerId;
  }

  const [products, total] = await Promise.all([
    Product.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("owner", "firstName lastName"),
    Product.countDocuments(query),
  ]);

  return {
    total,
    limit,
    page,
    products,
  };
};

export const getById = async (id: string) => Product.findById(id);

export const create = async (data: CreateProductDto, userId?: string) => {
  return await Product.create({
    ...data,
    ownerId: userId,
  });
};

export const update = async (id: string, data: any) => {
  const product = await Product.findById(id);
  if (!product) throw new Error("Product not found");
  Object.assign(product, data);
  return await product.save();
};

export const remove = async (id: string, userId: string) => {
  const product = await Product.findById(id);
  if (!product) throw new Error("Product not found");
  await product.deleteOne();
};

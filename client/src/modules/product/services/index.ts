import type {
  CreateProductDto,
  Product,
  UpdateProductDto,
} from "@modules/product/types";
import mainApiInstance from "@shared/api";
import { buildFormData } from "@shared/utils/form.ts";

interface GetProductsParams {
  ownerId?: string;
  searchQuery?: string;
  page: number;
  limit: number;
}
interface ProductsResponse {
  products: Product[];
  total: number;
  limit: number;
  page: number;
  ownerId: string;
}

export const productService = {
  getAllProducts: async (
    params?: GetProductsParams,
  ): Promise<ProductsResponse> => {
    const query = new URLSearchParams();

    if (params?.ownerId) query.append("ownerId", params.ownerId);
    if (params?.searchQuery) query.append("searchQuery", params.searchQuery);
    if (params?.page) query.append("page", String(params.page));
    if (params?.limit) query.append("limit", String(params.limit));

    const queryString = query.toString();

    const res = await mainApiInstance.get(`/products?${queryString}`);
    return res.data;
  },

  getProductById: async (id: string): Promise<Product> => {
    const res = await mainApiInstance.get(`/products/${id}`);
    return res.data;
  },

  createProduct: async (data: Partial<CreateProductDto>): Promise<Product> => {
    const formData = buildFormData(data);
    const res = await mainApiInstance.post("/products", formData);
    return res.data;
  },

  updateProduct: async (
    id: string,
    data: Partial<UpdateProductDto>,
  ): Promise<Product> => {
    const formData = buildFormData(data);
    const res = await mainApiInstance.put(`/products/${id}`, formData);
    return res.data;
  },

  deleteProduct: async (id: string): Promise<Product> => {
    const res = await mainApiInstance.delete(`/products/${id}`);
    return res.data;
  },
};

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { productService } from "@modules/product/services";
import { useProduct } from "@modules/product/hooks/use-product.ts";
import { fetchProducts } from "@modules/product/model/product-slice";
import { useAppDispatch } from "@shared/hooks/use-app-dispatch";
import "./style.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { routePath } from "@shared/constants/route.ts";
import { productFormSchema } from "@modules/product/pages/product/schema.ts";
import type { ProductFormData } from "@modules/product/types";

const DEFAULT_VALUES = {
  name: "",
  price: 0,
  discountedPrice: undefined,
  description: "",
};

export default function ProductPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    mode: "onChange",
  });

  const { id } = useParams();
  const { productData } = useProduct({ id: String(id) });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (id) {
      if (productData) {
        reset({
          name: productData.name ?? "",
          price: productData.price ?? 0,
          discountedPrice: productData.discountedPrice ?? undefined,
          description: productData.description ?? "",
        });
        if (productData.imageUrl) {
          setPreviewImage(productData.imageUrl);
        } else {
          setPreviewImage(null);
        }
      }
    } else {
      reset(DEFAULT_VALUES);
      setPreviewImage(null);
    }
  }, [id, productData, reset]);

  useEffect(() => {
    return () => {
      if (previewImage && previewImage.startsWith("blob:")) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  const onSubmit = async (data: ProductFormData) => {
    try {
      if (id) {
        await productService.updateProduct(id, data);
      } else {
        await productService.createProduct(data);
      }
      const page = parseInt(searchParams.get("page") ?? "1", 10);
      const limit = parseInt(searchParams.get("limit") ?? "7", 10);
      const searchQuery = searchParams.get("search") ?? "";
      const ownerId = searchParams.get("ownerId") ?? "";
      await dispatch(fetchProducts({ page, limit, searchQuery, ownerId }));

      navigate(routePath.getProducts());
    } catch (error) {
      console.error("Failed to submit product:", error);
      alert("Failed to submit product. Please try again.");
    }
  };

  return (
    <div className="product-page">
      <h2>{id ? productData?.name || "Edit Product" : "Create New Product"}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Product Name *</label>
          <input
            type="text"
            {...register("name", { required: "Product name is required" })}
          />
          {errors.name && <span className="error">{errors.name.message}</span>}
        </div>

        <div className="form-group">
          <label>Price *</label>
          <input
            type="number"
            step="0.01"
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price && (
            <span className="error">{errors.price.message}</span>
          )}
        </div>

        <div className="form-group">
          <label>Discounted Price</label>
          <input
            type="number"
            step="0.01"
            {...register("discountedPrice", { valueAsNumber: true })}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea rows={4} {...register("description")} />
        </div>

        <div className="form-group">
          <label>Product Image</label>
          <input
            type="file"
            {...register("image")}
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const url = URL.createObjectURL(file);
                setPreviewImage(url);
              }
            }}
          />
          {previewImage && (
            <img src={previewImage} alt="Preview" className="preview-image" />
          )}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

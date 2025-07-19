import { z } from "zod";

export const productFormSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.number(),
  discountedPrice: z.number().optional(),
  description: z.string().optional(),
  image: z.any().optional(),
});

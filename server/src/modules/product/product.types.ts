export interface CreateProductDto {
  name: string;
  price: number;
  discountedPrice?: number;
  image?: FileList;
  description?: string;
}

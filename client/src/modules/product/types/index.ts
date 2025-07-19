export interface Product {
  _id: string;
  name: string;
  price: number;
  discountedPrice?: number;
  description?: string;
  image?: FileList;
  imageUrl?: string;
  owner: Owner;
}

export interface CreateProductDto {
  name: string;
  price: number;
  discountedPrice?: number;
  image?: FileList;
  description?: string;
  ownerId: string;
}

export interface UpdateProductDto {
  name: string;
  price: number;
  discountedPrice?: number;
  image?: FileList;
  description?: string;
}

export interface Owner {
  firstName: string;
  lastName: string;
  _id: string;
}

export interface ProductFormData {
  name: string;
  price: number;
  discountedPrice?: number;
  description?: string;
  image?: FileList;
}

export interface ProductRowParams {
  product: Product;
  isMyProduct: boolean;
  onNavigate: (id: string) => void;
  onDelete: (id: string) => void;
}

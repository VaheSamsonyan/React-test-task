import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { productService } from "@modules/product/services";
import type { Product } from "@modules/product/types";

interface ProductState {
  products: Product[];
  total: number;
  limit: number;
  page: number;
  loading: boolean;
  isAllLoading: boolean;
  error: string | null;
  isAllError: string | null;
  selectedProduct: Product | null;
}

const initialState: ProductState = {
  products: [],
  total: 0,
  limit: 10,
  page: 1,
  loading: false,
  isAllLoading: false,
  error: null,
  isAllError: null,
  selectedProduct: null,
};

export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async ({ id }: { id?: string }, thunkAPI) => {
    try {
      return await productService.getProductById(String(id));
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to fetch product by ID",
      );
    }
  },
);

export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (
    {
      page,
      limit,
      searchQuery,
      ownerId,
    }: {
      page?: number;
      limit?: number;
      searchQuery?: string;
      ownerId?: string;
    },
    thunkAPI,
  ) => {
    try {
      return await productService.getAllProducts({
        searchQuery,
        page: Number(page),
        limit: Number(limit),
        ownerId: String(ownerId),
      });
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to fetch products",
      );
    }
  },
);

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id: string, thunkAPI) => {
    try {
      await productService.deleteProduct(id);
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to delete product",
      );
    }
  },
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    clearSelectedProduct(state) {
      state.selectedProduct = null;
    },
  },
  extraReducers(builder) {
    builder

      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.isAllLoading = true;
        state.isAllError = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.isAllLoading = false;
        state.products = action.payload.products;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.isAllLoading = false;
        state.isAllError = action.payload as string;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.isAllLoading = true;
        state.error = null;
        state.selectedProduct = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.isAllLoading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.isAllLoading = false;
        state.error = action.payload as string;
        state.selectedProduct = null;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action.payload;
        state.products = state.products.filter(
          (product) => product._id !== deletedId,
        );
        state.total -= 1;
        if (state.products.length === 0 && state.page > 1) {
          state.page -= 1;
        }
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setProducts, clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;

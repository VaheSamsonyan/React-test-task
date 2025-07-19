import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@app/store/store.ts";
import { fetchProductById } from "@modules/product/model/product-slice.ts";
import { useAppDispatch } from "@shared/hooks/use-app-dispatch.ts";

export const useProduct = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();

  const product = useSelector(
    (state: RootState) => state.products.selectedProduct,
  );
  const loading = useSelector((state: RootState) => state.products.loading);
  const error = useSelector((state: RootState) => state.products.error);

  useEffect(() => {
    dispatch(fetchProductById({ id: String(id) }));
  }, [dispatch]);

  return { productData: product, loading, error };
};

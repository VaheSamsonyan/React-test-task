import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@app/store/store.ts";
import { fetchProducts } from "@modules/product/model/product-slice.ts";
import { useAppDispatch } from "@shared/hooks/use-app-dispatch.ts";

export const useProducts = () => {
  const dispatch = useAppDispatch();

  const products = useSelector((state: RootState) => state.products.products);
  const page = useSelector((state: RootState) => state.products.page);
  const limit = useSelector((state: RootState) => state.products.limit);
  const total = useSelector((state: RootState) => state.products.total);
  const loading = useSelector(
    (state: RootState) => state.products.isAllLoading,
  );
  const error = useSelector((state: RootState) => state.products.isAllError);

  useEffect(() => {
    dispatch(fetchProducts({}));
  }, [dispatch]);

  return { products, loading, error, page, limit, total };
};

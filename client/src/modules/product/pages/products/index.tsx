import { useEffect, useMemo, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useProducts } from "@modules/product/hooks/use-products";
import { useAuth } from "@modules/auth/hooks/use-auth";
import {
  deleteProduct,
  fetchProducts,
} from "@modules/product/model/product-slice";
import { useAppDispatch } from "@shared/hooks/use-app-dispatch";
import "./style.css";
import { routePath } from "@shared/constants/route.ts";
import ProductRow from "@modules/product/components/product-row";

export default function ProductsPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user } = useAuth();
  const { products, total, loading } = useProducts();

  const [searchParams, setSearchParams] = useSearchParams();

  const page = useMemo(
    () => parseInt(searchParams.get("page") || "1", 10),
    [searchParams],
  );
  const limit = useMemo(
    () => parseInt(searchParams.get("limit") || "5", 10),
    [searchParams],
  );
  const searchQuery = useMemo(
    () => searchParams.get("search") || "",
    [searchParams],
  );
  const ownerId = useMemo(
    () => searchParams.get("ownerId") || "",
    [searchParams],
  );

  const totalPages = useMemo(() => Math.ceil(total / limit), [total, limit]);

  const updateSearchParams = useCallback(
    (params: Record<string, any>) => {
      const newParams = new URLSearchParams(searchParams.toString());
      Object.entries(params).forEach(([key, value]) => {
        if (value === undefined || value === "" || value === false) {
          newParams.delete(key);
        } else {
          newParams.set(key, String(value));
        }
      });
      setSearchParams(newParams);
    },
    [searchParams, setSearchParams],
  );

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      dispatch(fetchProducts({ page, limit, searchQuery, ownerId }));
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [dispatch, page, limit, searchQuery, ownerId]);

  const handleDelete = useCallback(
    async (id: string) => {
      await dispatch(deleteProduct(id));

      const newTotal = total - 1;
      const newTotalPages = Math.ceil(newTotal / limit);
      let newPage = page;

      if (page > newTotalPages) {
        newPage = newTotalPages;
      }

      updateSearchParams({ page: newPage });

      await dispatch(
        fetchProducts({ page: newPage, limit, searchQuery, ownerId }),
      );
    },
    [dispatch, page, limit, total, searchQuery, ownerId, updateSearchParams],
  );

  const navigateToProduct = useCallback(
    (id: string) => {
      navigate(routePath.getProductDetails({ id }));
    },
    [navigate],
  );

  return (
    <div className="page-wrapper">
      <h1 className="page-title">🛒 Products</h1>

      <div className="controls">
        <label className="control-item">
          <input
            type="checkbox"
            checked={Boolean(ownerId)}
            onChange={(e) =>
              updateSearchParams({
                ownerId: e.target.checked ? user?.id : undefined,
                page: 1,
              })
            }
          />
          Show only my products
        </label>

        <label className="control-item">
          Search:
          <input
            type="search"
            value={searchQuery}
            onChange={(e) =>
              updateSearchParams({ search: e.target.value, page: 1 })
            }
            placeholder="Search products..."
          />
        </label>
        <button
          onClick={() => navigate(routePath.getAddProduct())}
          className="add-button"
        >
          ➕ Add Product
        </button>
      </div>

      <div className="table-wrapper">
        {loading ? (
          <p className="status-msg loading">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="status-msg">No matching products found.</p>
        ) : (
          <table className="product-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Discounted Price</th>
                <th>Description</th>
                <th>Owner</th>
                <th>My Product</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const isMyProduct = product.owner?._id === user?.id;
                return (
                  <ProductRow
                    key={product._id}
                    product={product}
                    isMyProduct={isMyProduct}
                    onNavigate={navigateToProduct}
                    onDelete={handleDelete}
                  />
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {products.length > 0 && (
        <div className="pagination">
          <button
            onClick={() => updateSearchParams({ page: page - 1 })}
            disabled={page === 1}
          >
            ◀ Previous
          </button>
          <span>
            Page <strong>{page}</strong> of {totalPages}
          </span>
          <button
            onClick={() => updateSearchParams({ page: page + 1 })}
            disabled={page >= totalPages}
          >
            Next ▶
          </button>
        </div>
      )}
    </div>
  );
}

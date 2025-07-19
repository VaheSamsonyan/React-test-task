import type { ProductRowParams } from "@modules/product/types";

export default function ProductRow({
  product,
  isMyProduct,
  onNavigate,
  onDelete,
}: ProductRowParams) {
  return (
    <tr
      onClick={() => onNavigate(product._id)}
      tabIndex={0}
      style={{ cursor: "pointer" }}
      key={product._id}
    >
      <td>
        <img
          src={product.imageUrl ?? "/placeholder.png"}
          alt={product.name}
          className="product-image"
        />
      </td>
      <td>{product._id}</td>
      <td>{product.name}</td>
      <td>${product.price.toFixed(2)}</td>
      <td>{product.discountedPrice ? `${product.discountedPrice}` : "-"}</td>
      <td>{product.description ?? "-"}</td>
      <td>
        {product.owner
          ? `${product.owner.firstName} ${product.owner.lastName}`
          : "-"}
      </td>
      <td style={{ textAlign: "center", fontSize: "1.2rem" }}>
        {isMyProduct ? "✅" : ""}
      </td>
      <td className="text-center">
        <button
          className="delete-button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDelete(product._id);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

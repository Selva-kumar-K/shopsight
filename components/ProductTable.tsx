import Link from "next/link";
import { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

interface Props {
  products: Product[];
  onDelete?: (id: string) => void;
}

const HEADERS = ["Product", "Category", "Price", "Stock", "Status", "Actions"] as const;

export function ProductTable({ products, onDelete }: Props) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            {HEADERS.map((h) => (
              <th
                key={h}
                className="px-4 py-3 font-semibold text-gray-500 uppercase tracking-wide text-xs"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {products.map((product) => {
            const inStock = product.stock > 0;
            const lowStock = product.stock > 0 && product.stock <= 20;

            return (
              <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                {/* Product name */}
                <td className="px-4 py-3">
                  <Link
                    href={`/products/${product.id}`}
                    className="font-medium text-gray-900 hover:text-blue-600 hover:underline"
                  >
                    {product.name}
                  </Link>
                </td>

                {/* Category */}
                <td className="px-4 py-3">
                  <span className="bg-blue-50 text-blue-600 text-xs font-semibold px-2 py-0.5 rounded-full">
                    {product.category}
                  </span>
                </td>

                {/* Price */}
                <td className="px-4 py-3 font-semibold text-gray-900">
                  ${product.price.toFixed(2)}
                </td>

                {/* Stock count */}
                <td className={cn("px-4 py-3 font-medium", {
                  "text-red-600": !inStock,
                  "text-yellow-600": lowStock,
                  "text-gray-700": inStock && !lowStock,
                })}>
                  {product.stock}
                </td>

                {/* Status badge */}
                <td className="px-4 py-3">
                  <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full", {
                    "bg-red-50 text-red-600": !inStock,
                    "bg-yellow-50 text-yellow-600": lowStock,
                    "bg-green-50 text-green-600": inStock && !lowStock,
                  })}>
                    {!inStock ? "Out of stock" : lowStock ? "Low stock" : "In stock"}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/products/${product.id}/edit`}
                      aria-label={`Edit ${product.name}`}
                      className="text-xs font-medium text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>
                    {onDelete && (
                      <button
                        aria-label={`Delete ${product.name}`}
                        onClick={() => onDelete(product.id)}
                        className="text-xs font-medium text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}

          {products.length === 0 && (
            <tr>
              <td colSpan={HEADERS.length} className="px-4 py-8 text-center text-gray-400">
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

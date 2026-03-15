import Link from "next/link";
import { Product, SortColumn } from "@/lib/types";
import { cn } from "@/lib/utils";

interface Props {
  products: Product[];
  onDelete?: (id: string) => void;
  onSort?: (column: SortColumn) => void;
  sortColumn?: SortColumn;
  sortDirection?: "asc" | "desc";
}

interface HeaderConfig {
  label: string;
  sortKey?: SortColumn;
}

const HEADERS: HeaderConfig[] = [
  { label: "Product", sortKey: "name" },
  { label: "Category" },
  { label: "Price", sortKey: "price" },
  { label: "Stock", sortKey: "stock" },
  { label: "Status" },
  { label: "Actions" },
];

function SortIndicator({
  column,
  sortColumn,
  sortDirection,
}: {
  column: SortColumn;
  sortColumn?: SortColumn;
  sortDirection?: "asc" | "desc";
}) {
  if (sortColumn !== column) {
    return <span className="ml-1 text-gray-600 select-none">↕</span>;
  }
  return (
    <span className="ml-1 text-indigo-400 select-none">
      {sortDirection === "asc" ? "↑" : "↓"}
    </span>
  );
}

export function ProductTable({
  products,
  onDelete,
  onSort,
  sortColumn,
  sortDirection,
}: Props) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-gray-700 bg-gray-800 shadow-sm">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-900 border-b border-gray-700">
          <tr>
            {HEADERS.map((h) => {
              const isSortable = h.sortKey !== undefined;
              const isActive = isSortable && sortColumn === h.sortKey;

              return (
                <th
                  key={h.label}
                  className={cn(
                    "px-4 py-3 font-semibold uppercase tracking-wide text-xs",
                    isActive ? "text-indigo-400" : "text-gray-400",
                    isSortable
                      ? "cursor-pointer select-none hover:text-indigo-300 hover:bg-gray-800 transition-colors"
                      : ""
                  )}
                  onClick={
                    isSortable && onSort
                      ? () => onSort(h.sortKey!)
                      : undefined
                  }
                  aria-sort={
                    isActive
                      ? sortDirection === "asc"
                        ? "ascending"
                        : "descending"
                      : isSortable
                      ? "none"
                      : undefined
                  }
                >
                  <span className="inline-flex items-center">
                    {h.label}
                    {isSortable && (
                      <SortIndicator
                        column={h.sortKey!}
                        sortColumn={sortColumn}
                        sortDirection={sortDirection}
                      />
                    )}
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-700">
          {products.map((product) => {
            const inStock = product.stock > 0;
            const lowStock = product.stock > 0 && product.stock <= 20;

            return (
              <tr key={product.id} className="hover:bg-gray-700 transition-colors">
                {/* Product name */}
                <td className="px-4 py-3">
                  <Link
                    href={`/products/${product.id}`}
                    className="font-medium text-gray-100 hover:text-indigo-400 hover:underline"
                  >
                    {product.name}
                  </Link>
                </td>

                {/* Category */}
                <td className="px-4 py-3">
                  <span className="bg-indigo-900/40 text-indigo-400 border border-indigo-700/50 text-xs font-semibold px-2 py-0.5 rounded-full">
                    {product.category}
                  </span>
                </td>

                {/* Price */}
                <td className="px-4 py-3 font-semibold text-white">
                  ${product.price.toFixed(2)}
                </td>

                {/* Stock count */}
                <td
                  className={cn("px-4 py-3 font-medium", {
                    "text-red-400": !inStock,
                    "text-yellow-400": lowStock,
                    "text-gray-300": inStock && !lowStock,
                  })}
                >
                  {product.stock}
                </td>

                {/* Status badge */}
                <td className="px-4 py-3">
                  <span
                    className={cn("text-xs font-semibold px-2 py-0.5 rounded-full border", {
                      "bg-red-900/40 text-red-400 border-red-700/50": !inStock,
                      "bg-yellow-900/40 text-yellow-400 border-yellow-700/50": lowStock,
                      "bg-green-900/40 text-green-400 border-green-700/50": inStock && !lowStock,
                    })}
                  >
                    {!inStock ? "Out of stock" : lowStock ? "Low stock" : "In stock"}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/products/${product.id}/edit`}
                      aria-label={`Edit ${product.name}`}
                      className="text-xs font-medium text-indigo-400 hover:underline"
                    >
                      Edit
                    </Link>
                    {onDelete && (
                      <button
                        aria-label={`Delete ${product.name}`}
                        onClick={() => onDelete(product.id)}
                        className="text-xs font-medium text-red-400 hover:underline"
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
              <td
                colSpan={HEADERS.length}
                className="px-4 py-8 text-center text-gray-500"
              >
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ProductSearchProps {
  products: Product[];
  onSelect?: (product: Product) => void;
  className?: string;
}

export function ProductSearch({ products, onSelect, className }: ProductSearchProps) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q),
    );
  }, [query, products]);

  const showResults = query.trim().length > 0;

  const formatPrice = (price: number) =>
    typeof price === "number" && !isNaN(price) ? `$${price.toFixed(2)}` : "N/A";

  return (
    <div className={cn("relative w-full max-w-md", className)}>
      {/* Input */}
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
          />
        </svg>
        <input
          type="search"
          role="combobox"
          aria-label="Search products"
          aria-expanded={showResults}
          aria-autocomplete="list"
          aria-controls="product-search-results"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products…"
          className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {query && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="w-4 h-4"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Dropdown results */}
      {showResults && (
        <ul
          id="product-search-results"
          role="menu"
          aria-label="Search results"
          className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
        >
          {results.length > 0 ? (
            results.map((product) => (
              <li key={product.id} role="none">
                <Link
                  href={`/products/${product.id}`}
                  role="menuitem"
                  onClick={() => {
                    onSelect?.(product);
                    setQuery("");
                  }}
                  className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900">
                      {product.name}
                    </span>
                    <span className="text-xs text-gray-400">
                      {product.category}
                    </span>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-sm font-semibold text-gray-900">
                      {formatPrice(product.price)}
                    </span>
                    <span
                      className={cn("text-xs font-medium", {
                        "text-green-600": product.stock > 20,
                        "text-yellow-600": product.stock > 0 && product.stock <= 20,
                        "text-red-500": product.stock === 0,
                      })}
                    >
                      {product.stock === 0
                        ? "Out of stock"
                        : `${product.stock} in stock`}
                    </span>
                  </div>
                </Link>
              </li>
            ))
          ) : (
            <li className="px-4 py-6 text-center text-sm text-gray-400">
              No products found for &ldquo;{query}&rdquo;
            </li>
          )}
        </ul>
      )}
    </div>
  );
}

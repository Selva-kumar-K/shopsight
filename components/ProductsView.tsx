"use client";

import { useMemo, useState } from "react";
import { Product } from "@/lib/types";
import { SearchBar } from "@/components/SearchBar";
import { ProductTable } from "@/components/ProductTable";

interface Props {
  products: Product[];
}

export function ProductsView({ products }: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return products;
    return products.filter((p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.price.toFixed(2).includes(q) ||
      String(p.stock).includes(q)
    );
  }, [query, products]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Search by name, category, price, stock…"
        />
        <p className="text-xs text-gray-400">
          {filtered.length} of {products.length} products
        </p>
      </div>
      <ProductTable products={filtered} />
    </div>
  );
}

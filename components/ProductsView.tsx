"use client";

import { useMemo, useState } from "react";
import { Product, SortColumn } from "@/lib/types";
import { SearchBar } from "@/components/SearchBar";
import { ProductTable } from "@/components/ProductTable";

interface Props {
  products: Product[];
}

export function ProductsView({ products }: Props) {
  const [query, setQuery] = useState("");
  const [sortColumn, setSortColumn] = useState<SortColumn | undefined>(undefined);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  function handleSort(column: SortColumn) {
    if (column === sortColumn) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  }

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return q
      ? products.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.price.toFixed(2).includes(q) ||
            String(p.stock).includes(q)
        )
      : products;
  }, [query, products]);

  const sorted = useMemo(() => {
    if (!sortColumn) return filtered;

    return [...filtered].sort((a, b) => {
      let comparison = 0;

      if (sortColumn === "name") {
        comparison = a.name.localeCompare(b.name);
      } else if (sortColumn === "price") {
        comparison = a.price - b.price;
      } else if (sortColumn === "stock") {
        comparison = a.stock - b.stock;
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [filtered, sortColumn, sortDirection]);

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
      <ProductTable
        products={sorted}
        onSort={handleSort}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
      />
    </div>
  );
}

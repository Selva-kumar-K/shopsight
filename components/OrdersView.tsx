"use client";

import { useState, useMemo } from "react";
import { Order } from "@/lib/types";
import { OrdersTable } from "@/components/OrdersTable";
import { cn } from "@/lib/utils";

interface Props {
  orders: Order[];
}

type StatusFilter = Order["status"] | "all";

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

const PAGE_SIZE = 5;

export function OrdersView({ orders }: Props) {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (statusFilter === "all") return orders;
    return orders.filter((o) => o.status === statusFilter);
  }, [orders, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);

  const paginated = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, safePage]);

  function handleFilterChange(value: StatusFilter) {
    setStatusFilter(value);
    setPage(1);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <label
            htmlFor="status-filter"
            className="text-sm font-medium text-gray-300 whitespace-nowrap"
          >
            Filter by status:
          </label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => handleFilterChange(e.target.value as StatusFilter)}
            className={cn(
              "text-sm rounded-lg border border-gray-600 bg-gray-700 px-3 py-1.5",
              "text-gray-200 shadow-sm",
              "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            )}
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <p className="text-xs text-gray-400">
          {filtered.length} {filtered.length === 1 ? "order" : "orders"} found
        </p>
      </div>

      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <OrdersTable orders={paginated} />
      </div>

      <div className="flex items-center justify-between gap-3">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={safePage <= 1}
          className={cn(
            "px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors duration-100",
            safePage <= 1
              ? "border-gray-700 text-gray-600 cursor-not-allowed bg-gray-800"
              : "border-gray-600 text-gray-300 bg-gray-800 hover:bg-gray-700 cursor-pointer"
          )}
          aria-label="Previous page"
        >
          Previous
        </button>

        <span className="text-sm text-gray-400">
          Page {safePage} of {totalPages}
        </span>

        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={safePage >= totalPages}
          className={cn(
            "px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors duration-100",
            safePage >= totalPages
              ? "border-gray-700 text-gray-600 cursor-not-allowed bg-gray-800"
              : "border-gray-600 text-gray-300 bg-gray-800 hover:bg-gray-700 cursor-pointer"
          )}
          aria-label="Next page"
        >
          Next
        </button>
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";
import { Order } from "@/lib/types";

export interface OrderStatusBadgeProps {
  status: Order["status"];
}

const statusStyles: Record<Order["status"], string> = {
  pending: "bg-yellow-900/40 text-yellow-400 border border-yellow-700/50",
  processing: "bg-blue-900/40 text-blue-400 border border-blue-700/50",
  shipped: "bg-purple-900/40 text-purple-400 border border-purple-700/50",
  delivered: "bg-green-900/40 text-green-400 border border-green-700/50",
  cancelled: "bg-red-900/40 text-red-400 border border-red-700/50",
};

function capitalise(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold",
        statusStyles[status]
      )}
    >
      {capitalise(status)}
    </span>
  );
}

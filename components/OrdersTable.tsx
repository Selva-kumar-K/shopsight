import Link from "next/link";
import { Order } from "@/lib/types";
import { OrderStatusBadge } from "@/components/OrderStatusBadge";

interface Props {
  orders: Order[];
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function OrdersTable({ orders }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-700">
        <thead>
          <tr className="bg-gray-900">
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
            >
              Order ID
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
            >
              Customer
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
            >
              Items
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
            >
              Total
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
            >
              Date
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 divide-y divide-gray-700">
          {orders.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="px-4 py-10 text-center text-sm text-gray-500"
              >
                No orders found.
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-gray-700 transition-colors duration-100"
              >
                <td className="px-4 py-3 whitespace-nowrap">
                  <Link
                    href={`/orders/${order.id}`}
                    className="text-sm font-medium text-indigo-400 hover:text-indigo-300 hover:underline"
                  >
                    #{order.id}
                  </Link>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-200">
                  {order.customerName}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">
                  {order.items.length} {order.items.length === 1 ? "item" : "items"}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-white">
                  {formatCurrency(order.total)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <OrderStatusBadge status={order.status} />
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">
                  {formatDate(order.createdAt)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

import { Order } from "@/lib/types";
import { OrdersView } from "@/components/OrdersView";
import ordersData from "@/data/orders.json";

const orders = ordersData as Order[];

export function OrdersPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-white mb-1">Orders</h1>
      <p className="text-sm text-gray-400 mb-6">
        Track and manage customer orders
      </p>
      <OrdersView orders={orders} />
    </div>
  );
}

export default OrdersPage;

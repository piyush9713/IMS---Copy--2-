import { orders } from "../../lib/data";

export default function RecentOrders() {
  // Get recent orders
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);
  return (
    <div className="space-y-4">
      {recentOrders.map((order) => (
        <div key={order.id} className="flex items-center">
          <div className="space-y-1 flex-1">
            <p className="text-sm font-medium leading-none">
              {order.customerName}
            </p>
            <p className="text-sm text-muted-foreground">
              ${order.totalAmount.toFixed(2)} •{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div
            className={`text-xs px-2 py-1 rounded-full ${
              order.status === "delivered"
                ? "bg-green-100 text-green-800"
                : order.status === "shipped"
                ? "bg-blue-100 text-blue-800"
                : order.status === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </div>
        </div>
      ))}
    </div>
  );
}

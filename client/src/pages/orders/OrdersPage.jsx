import React, { useState, useRef } from "react";
import OrderList from "../../components/orders/OrderList";
import OrderDetails from "../../components/orders/OrderDetails";
import { dummyOrders } from "../../lib/data";

export default function OrdersPage() {
  const [orders] = useState([...dummyOrders]);
  const [selectedOrder, setSelectedOrder] = useState(dummyOrders[0]);

  const observerRef = useRef(null);

  const handleOrderSelect = (order) => setSelectedOrder(order);

  return (
    <div className="bg-gray-50">
      <main className="w-full mx-auto flex  h-[calc(100vh-60px)]">
        <OrderList
          orders={orders}
          selectedOrder={selectedOrder}
          onOrderSelect={handleOrderSelect}
          observerRef={observerRef}
        />
        <OrderDetails order={selectedOrder} />
      </main>
    </div>
  );
}

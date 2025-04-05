import React from "react";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export default function OrderDetails({ order, onEdit, onDelete }) {
  return (
    <div className="flex-1 bg-white  border border-gray-200 p-6 overflow-y-auto">
      {order ? (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900">
                Order #{order.id}
              </h2>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onEdit}>
                Edit
              </Button>
              <Button
                variant="outline"
                className="text-red-600 border-red-300 hover:bg-red-50"
                onClick={() => onDelete(order)}>
                Delete
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Customer
                </span>
                <p className="text-md text-gray-900">{order.customer}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Status
                </span>
                <p>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-md font-medium ${
                      order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.status === "Shipped"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}>
                    {order.status}
                  </span>
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Total</span>
                <p className="text-md font-medium text-gray-900">
                  ${order.total.toFixed(2)}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Supplier
                </span>
                <p className="text-md text-gray-900">{order.supplier}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Date</span>
                <p className="text-md text-gray-900">{order.date}</p>
              </div>
            </div>
            <div className="col-span-2">
              <span className="text-sm font-medium text-gray-500 mb-2 block">
                Items
              </span>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40%]">Name</TableHead>
                    <TableHead className="w-[20%]">Quantity</TableHead>
                    <TableHead className="w-[20%]">Price</TableHead>
                    <TableHead className="w-[20%]">Subtotal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>${item.price.toFixed(2)}</TableCell>
                      <TableCell>
                        ${(item.quantity * item.price).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-full flex items-center justify-center">
          <p className="text-gray-500 text-sm">
            Select an order to view details
          </p>
        </div>
      )}
    </div>
  );
}

import React from "react";
import { Button } from "../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export default function CustomerDetails({ customer, onEdit, onDelete }) {
  return (
    <div className="flex-1 bg-white  shadow-sm border border-gray-200 p-6 overflow-y-auto">
      {customer ? (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-xl font-semibold text-gray-600">
                {customer.name.charAt(0)}
              </span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900">
                {customer.name}
              </h2>
              <p className="text-sm text-gray-500">{customer.email}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onEdit}>
                Edit
              </Button>
              <Button
                variant="outline"
                className="text-red-600 border-red-300 hover:bg-red-50"
                onClick={() => onDelete(customer)}>
                Delete
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-500">Phone</span>
                <p className="text-md text-gray-900">{customer.phone}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Address
                </span>
                <p className="text-md text-gray-900">{customer.address}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Total Orders
                </span>
                <p className="text-md font-medium text-gray-900">
                  {customer.totalOrders}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Total Spent
                </span>
                <p className="text-md text-gray-900">
                  ${customer.totalSpent.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="col-span-2">
              <span className="text-sm font-medium text-gray-500 mb-2 block">
                Recent Orders
              </span>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[20%]">Id</TableHead>
                    <TableHead className="w-[20%]">Quantity</TableHead>
                    <TableHead className="w-[20%]">Amount</TableHead>
                    <TableHead className="w-[20%]">Date</TableHead>
                    <TableHead className="w-[20%]">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customer.recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">#{order.id}</TableCell>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell>${order.amount.toFixed(2)}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        <span
                          className={`${
                            order.status === "completed"
                              ? "text-green-600"
                              : order.status === "pending"
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}>
                          {order.status}
                        </span>
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
            Select a customer to view details
          </p>
        </div>
      )}
    </div>
  );
}

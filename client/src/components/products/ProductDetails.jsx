import React from "react";
import { Button } from "../../components/ui/button";

export default function ProductDetails({ product, onEdit, onDelete }) {
  return (
    <div className="flex-1 bg-white border border-gray-200 p-6 overflow-y-auto">
      {product ? (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-16 h-16 object-cover rounded-md"
            />
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900">
                {product.name}
              </h2>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onEdit}>
                Edit
              </Button>
              <Button
                variant="outline"
                className="text-red-600 border-red-300 hover:bg-red-50"
                onClick={() => onDelete(product)}>
                Delete
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-gray-600 text-sm">{product.description}</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Barcode
                </span>
                <p className="text-md font-mono text-gray-900">
                  {product.barcode}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Category
                </span>
                <p className="text-md text-gray-900">{product.category}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Price</span>
                <p className="text-md font-medium text-gray-900">
                  ${product.price.toFixed(2)}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Cost</span>
                <p className="text-md text-gray-900">
                  ${product.cost.toFixed(2)}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Stock</span>
                <p>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-md font-medium ${
                      product.stock < 10
                        ? "bg-red-100 text-red-800"
                        : product.stock < 30
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}>
                    {product.stock}
                  </span>
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Supplier
                </span>
                <p className="text-md text-gray-900">{product.supplier}</p>
              </div>
              <div className="col-span-2">
                <span className="text-sm font-medium text-gray-500">
                  Last Updated
                </span>
                <p className="text-md text-gray-900">{product.lastUpdated}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-full flex items-center justify-center">
          <p className="text-gray-500 text-sm">
            Select a product to view details
          </p>
        </div>
      )}
    </div>
  );
}

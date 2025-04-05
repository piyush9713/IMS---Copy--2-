import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../../../components/ui/table";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Trash, Plus, Minus } from "lucide-react";

export default function OrderProductTable({
  products,
  onQuantityChange,
  onRemoveProduct,
}) {
  const updateQuantity = (productId, delta) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const newQuantity = Math.max(1, (product.quantity || 0) + delta);
    onQuantityChange(productId, newQuantity);
  };

  return (
    <div className="rounded-lg border shadow-sm">
      <Table>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="w-[300px] text-left">Product</TableHead>
            <TableHead className="text-center">Price</TableHead>
            <TableHead className="text-center">Quantity</TableHead>
            <TableHead className="text-center">Total</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                <div className="flex flex-col items-center justify-center py-6">
                  <p className="text-gray-500">No products added yet</p>
                  <p className="text-sm text-gray-400">
                    Add products using the buttons above
                  </p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
              <TableRow key={product.id} className="hover:bg-gray-50/50">
                <TableCell className="py-3">
                  <div className="flex flex-col">
                    <span className="font-medium">{product.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {product.barcode}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-center py-3">
                  ${product.price.toFixed(2)}
                </TableCell>
                <TableCell className="text-center py-3">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => updateQuantity(product.id, -1)}
                      disabled={product.quantity <= 1}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      min="1"
                      value={product.quantity}
                      onChange={(e) =>
                        onQuantityChange(
                          product.id,
                          Math.max(1, parseInt(e.target.value) || 1)
                        )
                      }
                      className="w-16 text-center"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => updateQuantity(product.id, 1)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="text-center font-medium py-3">
                  ${(product.price * product.quantity).toFixed(2)}
                </TableCell>
                <TableCell className="text-center py-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-500"
                    onClick={() => onRemoveProduct(product.id)}>
                    <Trash className="h-4 w-4" />
                    <span className="sr-only">Remove product</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

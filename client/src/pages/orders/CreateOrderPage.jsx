import React, { useState, useEffect } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { dummyCustomers } from "../../lib/data";
import { dummyProducts } from "../../lib/data";
import { toast } from "sonner";
import {
  Barcode,
  Trash2,
  Save,
  CreditCard,
  Smartphone,
  Minus,
  Plus,
  Percent,
  ChevronDown,
  X,
  Loader2,
} from "lucide-react";
import { SearchInputDropdown } from "../../components/ui/searchInputDropdown";
import { cn } from "../../lib/utils";

export default function CreateOrderPage() {
  const [customerName, setCustomerName] = useState("");
  const [customerMobile, setCustomerMobile] = useState("");
  const [orderItems, setOrderItems] = useState([]);
  const [barcodeScanning, setBarcodeScanning] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [discount, setDiscount] = useState(0);
  const [productSearch, setProductSearch] = useState("");
  const [isProductSearchLoading, setIsProductSearchLoading] = useState(false);
  const [filteredCustomers, setFilteredCustomers] = useState(dummyCustomers);
  const [filteredProducts, setFilteredProducts] = useState(dummyProducts);

  const paymentOptions = [
    { value: "cash", label: "Cash", icon: <CreditCard className="h-4 w-4" /> },
    {
      value: "credit",
      label: "Credit Card",
      icon: <CreditCard className="h-4 w-4" />,
    },
    { value: "upi", label: "UPI", icon: <Smartphone className="h-4 w-4" /> },
  ];

  // Filter customers based on search
  useEffect(() => {
    if (customerName) {
      const filtered = dummyCustomers.filter((c) =>
        c.name.toLowerCase().includes(customerName.toLowerCase())
      );
      setFilteredCustomers(filtered);
    } else {
      setFilteredCustomers(dummyCustomers);
    }
  }, [customerName]);

  // Initialize products
  useEffect(() => {
    setFilteredProducts(dummyProducts);
  }, []);

  const handleAddProduct = (product) => {
    if (product && product.stock > 0) {
      setOrderItems((prev) => {
        const existingItem = prev.find((item) => item.id === product.id);
        if (existingItem) {
          return prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prev, { ...product, quantity: 1 }];
      });
      toast.success(`${product.name} added to order`);
      setProductSearch("");
    } else {
      toast.error("Product out of stock or not found");
    }
  };

  const handleBarcodeScan = () => {
    toast.info("Barcode scanner activated. Scan a product.");
  };

  const handleQuantityChange = (id, change) => {
    setOrderItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + change),
            }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setOrderItems((prev) => prev.filter((item) => item.id !== id));
    toast.success("Item removed from order");
  };

  const calculateSubtotal = () => {
    return orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    return subtotal - (discount || 0);
  };

  const handleCreateOrder = () => {
    if (!customerName || !customerMobile) {
      toast.error("Please provide customer name and mobile number");
      return;
    }
    if (orderItems.length === 0) {
      toast.error("Please add at least one product");
      return;
    }

    const order = {
      customer: { name: customerName, mobile: customerMobile },
      items: orderItems,
      total: calculateTotal(),
      paymentMethod,
      discount,
      date: new Date().toISOString().split("T")[0],
    };

    console.log("Order created:", order);
    toast.success("Order created successfully");
    handleResetForm();
  };

  const handleResetForm = () => {
    setCustomerName("");
    setCustomerMobile("");
    setOrderItems([]);
    setBarcodeScanning(false);
    setPaymentMethod("cash");
    setDiscount(0);
    setProductSearch("");
  };

  return (
    <div className="bg-gray-50">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 px-6 ">
        <div className="flex items-center space-x-3 ">
          <h1 className="text-2xl font-bold text-gray-800">Create New Order</h1>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            onClick={handleResetForm}
            className="border-gray-300 text-gray-600 hover:bg-gray-50 w-full sm:w-auto">
            <X className="mr-2 h-4 w-4" /> Cancel
          </Button>
          <Button
            onClick={handleCreateOrder}
            className="bg-indigo-600 hover:bg-indigo-700 w-full sm:w-auto">
            <Save className="mr-2 h-4 w-4" /> Save Order
          </Button>
        </div>
      </div>

      <div className="mx-auto bg-white flex flex-col ">
        <div className="space-y-4 flex-1 overflow-auto p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="space-y-2 ">
              <label className="block text-sm font-medium text-gray-700">
                Customer Name
              </label>
              <SearchInputDropdown
                options={dummyCustomers.map((c) => ({
                  value: c.id,
                  label: c.name,
                  description: c.phone,
                  customer: c,
                }))}
                onSelect={(selected) => {
                  setCustomerName(selected.label);
                  setCustomerMobile(selected.description);
                }}
                value={customerName}
                onChange={setCustomerName}
                placeholder="Search customer..."
                emptyText="No customers found"
                className="w-full"
                inputClassName=""
                dropdownClassName="border-gray-200"
                renderItem={(customer, isHighlighted) => (
                  <div
                    className={cn(
                      "flex items-center gap-3",
                      isHighlighted && "bg-accent"
                    )}>
                    <div>
                      <div className="font-normal">{customer.label}</div>
                      {/* <div className="text-sm text-muted-foreground">
                              {customer.description}
                            </div> */}
                    </div>
                  </div>
                )}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Mobile
              </label>
              <Input
                value={customerMobile}
                onChange={(e) => setCustomerMobile(e.target.value)}
                placeholder="Mobile number"
                className="h-10"
              />
            </div>
          </div>

          {/* Product Section */}
          <section className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Add Products
            </label>
            <div className=" items-center grid grid-cols-1 sm:grid-cols-2  gap-4">
              <Button
                variant={barcodeScanning ? "default" : "outline"}
                onClick={handleBarcodeScan}
                className="flex items-center gap-2 h-10 ">
                <Barcode className="h-4 w-4" />
                <span>Scan Barcode</span>
              </Button>
              <div>
                <SearchInputDropdown
                  options={filteredProducts.map((p) => ({
                    value: p.id,
                    label: p.name,
                    description: `$${p.price.toFixed(2)} | Stock: ${p.stock}`,
                    product: p,
                  }))}
                  onSelect={(selected) => {
                    handleAddProduct(selected.product);
                  }}
                  value={productSearch}
                  onChange={setProductSearch}
                  placeholder="Search product to add..."
                  emptyText="No products found"
                  className="w-full"
                  inputClassName="h-10"
                  dropdownClassName="border-gray-200"
                  isLoading={isProductSearchLoading}
                  onSearch={(query) => {
                    setIsProductSearchLoading(true);
                    setTimeout(() => {
                      setFilteredProducts(
                        dummyProducts.filter((p) =>
                          p.name.toLowerCase().includes(query.toLowerCase())
                        )
                      );
                      setIsProductSearchLoading(false);
                    }, 500);
                  }}
                  renderItem={(product, isHighlighted) => (
                    <div
                      className={cn(
                        "flex justify-between",
                        isHighlighted && "bg-accent"
                      )}>
                      <div>
                        <div className="font-normal">{product.label}</div>
                        <div className="text-sm text-muted-foreground">
                          {product.description}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 px-2 outline-none border-none"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddProduct(product.product);
                          }}>
                          <Plus className=" h-6 w-6" />
                        </Button>
                      </div>
                    </div>
                  )}
                />
              </div>
            </div>
          </section>

          {/* Order Items Table */}
          <section className="space-y-2">
            <div className="rounded-lg border border-gray-200 overflow-hidden">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="text-gray-700 font-medium w-[40%]">
                      Product
                    </TableHead>
                    <TableHead className="text-gray-700 font-medium">
                      Quantity
                    </TableHead>
                    <TableHead className="text-gray-700 font-medium text-right">
                      Price
                    </TableHead>
                    <TableHead className="text-gray-700 font-medium text-right">
                      Subtotal
                    </TableHead>
                    <TableHead className="text-gray-700 font-medium text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderItems.length > 0 ? (
                    orderItems.map((item) => (
                      <TableRow key={item.id} className="hover:bg-gray-50/50">
                        <TableCell className="font-medium">
                          {item.name}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleQuantityChange(item.id, -1)}
                              className="h-8 w-8 p-0">
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleQuantityChange(item.id, 1)}
                              className="h-8 w-8 p-0">
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          ${item.price.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-500 hover:text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="h-24 text-center text-gray-500">
                        No items added yet
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </section>

          {/* Summary Section */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Percent className="h-4 w-4" /> Discount ($)
                  </label>
                  <Input
                    type="number"
                    value={discount}
                    onChange={(e) =>
                      setDiscount(Math.max(0, parseFloat(e.target.value) || 0))
                    }
                    placeholder="Enter discount"
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    Payment Method
                  </label>
                  <Select
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentOptions.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          className="flex items-center gap-2">
                          {option.icon}
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">
                    ${calculateSubtotal().toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Discount</span>
                  <span className="font-medium text-red-500">
                    -${discount.toFixed(2)}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-800">
                    Total
                  </span>
                  <span className="text-xl font-bold text-blue-600">
                    ${calculateTotal().toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

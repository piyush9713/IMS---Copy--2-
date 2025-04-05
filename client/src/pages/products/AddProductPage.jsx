import React, { useState, useRef } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandInput,
} from "../../components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { Calendar } from "../../components/ui/calendar";
import {
  PlusCircle,
  Save,
  X,
  Upload,
  Barcode,
  CalendarIcon,
  Check,
  ChevronsUpDown,
  PackagePlus,
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { cn } from "../../lib/utils";

const categories = [
  { value: "electronics", label: "Electronics" },
  { value: "groceries", label: "Groceries" },
  { value: "accessories", label: "Accessories" },
  { value: "fitness", label: "Fitness" },
  { value: "stationery", label: "Stationery" },
  { value: "kitchenware", label: "Kitchenware" },
  { value: "health", label: "Health" },
  { value: "office", label: "Office" },
];

const suppliers = [
  { value: "techgadgets", label: "TechGadgets Inc." },
  { value: "naturesbest", label: "Nature's Best" },
  { value: "outdoorgear", label: "Outdoor Gear Co." },
  { value: "fitlife", label: "FitLife Essentials" },
  { value: "audiotech", label: "AudioTech" },
  { value: "officesupplies", label: "Office Supplies Ltd" },
  { value: "homehearth", label: "Home & Hearth" },
  { value: "wellnessplus", label: "Wellness Plus" },
];

function Combobox({ options, value, onChange, placeholder }) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between">
          {value
            ? options.find((option) => option.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder={`Search ${placeholder.toLowerCase()}...`}
          />
          <CommandEmpty>No options found.</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={(currentValue) => {
                  onChange(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}>
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === option.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default function AddProductPage() {
  const [newProduct, setNewProduct] = useState({
    id: null,
    name: "",
    barcode: "",
    category: "",
    price: "",
    cost: "",
    stock: "",
    supplier: "",
    description: "",
    lastUpdated: new Date(),
    image: "https://via.placeholder.com/150?text=Upload+Image",
  });

  const fileInputRef = useRef(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleInputChange = (e, field) => {
    setNewProduct((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleBarcodeScan = (e) => {
    const scannedValue = e.target.value;
    if (scannedValue.length === 12) {
      setNewProduct((prev) => ({ ...prev, barcode: scannedValue }));
      toast.success("Barcode scanned successfully");
    }
  };

  const handleBarcodeSearch = () => {
    toast.info("Barcode scanner activated. Scan a barcode.");
    document.getElementById("barcodeInput").focus();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewProduct((prev) => ({ ...prev, image: imageUrl }));
      toast.success("Image uploaded successfully");
    }
  };

  const handleSaveProduct = () => {
    // Generate a unique ID (in a real app, this would come from a backend)
    const newId = Math.max(...dummyProducts.map((p) => p.id), 0) + 1;
    const productToSave = {
      ...newProduct,
      id: newId,
      category:
        categories.find((c) => c.value === newProduct.category)?.label ||
        newProduct.category,
      supplier:
        suppliers.find((s) => s.value === newProduct.supplier)?.label ||
        newProduct.supplier,
      price: parseFloat(newProduct.price) || 0,
      cost: parseFloat(newProduct.cost) || 0,
      stock: parseInt(newProduct.stock) || 0,
      lastUpdated: format(newProduct.lastUpdated, "yyyy-MM-dd"),
    };

    // In a real app, save to a backend here
    dummyProducts.push(productToSave);
    setIsDialogOpen(true);
  };

  const handleResetForm = () => {
    setNewProduct({
      id: null,
      name: "",
      barcode: "",
      category: "",
      price: "",
      cost: "",
      stock: "",
      supplier: "",
      description: "",
      lastUpdated: new Date(),
      image: "https://via.placeholder.com/150?text=Upload+Image",
    });
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    handleResetForm();
  };

  return (
    <div className="bg-gray-50">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 px-6">
        <div className="flex items-center space-x-3">
          <h1 className="text-2xl font-bold text-gray-800">Add New Product</h1>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            onClick={handleResetForm}
            className="border-gray-300 text-gray-600 hover:bg-gray-50 w-full sm:w-auto">
            <X className="mr-2 h-4 w-4" /> Cancel
          </Button>
          <Button
            onClick={handleSaveProduct}
            className="bg-indigo-600 hover:bg-indigo-700 w-full sm:w-auto">
            <Save className="mr-2 h-4 w-4" /> Save Product
          </Button>
        </div>
      </div>
      <div className="mx-auto bg-white flex flex-col">
        {/* Main Form */}
        <div className="space-y-6 flex-1 overflow-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2 ">
              <label
                htmlFor="productName"
                className="block text-sm font-medium text-gray-700">
                Product Name *
              </label>
              <Input
                id="productName"
                value={newProduct.name}
                onChange={(e) => handleInputChange(e, "name")}
                placeholder="Enter product name"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="barcodeInput"
                className="block text-sm font-medium text-gray-700">
                Barcode
              </label>
              <div className="relative">
                <Input
                  id="barcodeInput"
                  value={newProduct.barcode}
                  onChange={(e) => {
                    handleInputChange(e, "barcode");
                    handleBarcodeScan(e);
                  }}
                  className="text-sm font-mono pr-10"
                  placeholder="Scan or enter barcode"
                  maxLength={12}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBarcodeSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
                  <Barcode className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor=" productImage"
                className="block text-sm font-medium text-gray-700">
                Image
              </label>

              <Input
                id="productImage"
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
              />
              <Button
                variant="outline"
                onClick={() => fileInputRef.current.click()}
                className="w-full">
                <Upload className="mr-2 h-4 w-4" />
                Upload Image
              </Button>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Category *
              </label>
              <Combobox
                options={categories}
                value={newProduct.category}
                onChange={(value) =>
                  setNewProduct((prev) => ({ ...prev, category: value }))
                }
                placeholder="Select category..."
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Supplier *
              </label>
              <Combobox
                options={suppliers}
                value={newProduct.supplier}
                onChange={(value) =>
                  setNewProduct((prev) => ({ ...prev, supplier: value }))
                }
                placeholder="Select supplier..."
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="stock"
                className="block text-sm font-medium text-gray-700">
                Stock Quantity *
              </label>
              <Input
                id="stock"
                type="number"
                value={newProduct.stock}
                onChange={(e) => handleInputChange(e, "stock")}
                placeholder="0"
                min="0"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="cost"
                className="block text-sm font-medium text-gray-700">
                Cost ($) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  $
                </span>
                <Input
                  id="cost"
                  type="number"
                  value={newProduct.cost}
                  onChange={(e) => handleInputChange(e, "cost")}
                  className="pl-8"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700">
                Price ($) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  $
                </span>
                <Input
                  id="price"
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => handleInputChange(e, "price")}
                  className="pl-8"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Last Updated
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
                    {format(newProduct.lastUpdated, "PPP")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={newProduct.lastUpdated}
                    onSelect={(date) =>
                      setNewProduct((prev) => ({
                        ...prev,
                        lastUpdated: date || new Date(),
                      }))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="md:col-span-2 space-y-2">
              <label
                htmlFor="productDescription"
                className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="productDescription"
                value={newProduct.description}
                onChange={(e) => handleInputChange(e, "description")}
                className="w-full p-3 border border-gray-300 rounded-md text-sm text-gray-600 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Describe the product features and details..."
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Success Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-green-600 flex items-center">
                <Check className="h-6 w-6 mr-2" />
                Product Added Successfully!
              </DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-gray-600">
                "{newProduct.name}" has been added to your inventory.
              </p>
            </div>
            <DialogFooter>
              <Button onClick={handleCloseDialog} className="w-full">
                Continue
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

// For demo purposes
const dummyProducts = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    barcode: "123456789012",
    category: "Electronics",
    price: 129.99,
    cost: 89.99,
    stock: 45,
    supplier: "TechGadgets Inc.",
    description:
      "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
    lastUpdated: "2023-05-15",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D",
  },
];

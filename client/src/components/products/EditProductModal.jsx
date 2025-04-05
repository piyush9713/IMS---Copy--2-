import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../../components/ui/popover";
import { Calendar } from "../../components/ui/calendar";
import { Upload, CalendarIcon, Save } from "lucide-react";
import { format } from "date-fns";
import Combobox from "../../components/ui/combobox";
import { categories, suppliers } from "../../lib/data";
import { toast } from "sonner";

export default function EditProductModal({ isOpen, onClose, product, onSave }) {
  const fileInputRef = useRef(null);
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      ...product,
      category:
        categories.find((c) => c.label === product?.category)?.value || "",
      supplier:
        suppliers.find((s) => s.label === product?.supplier)?.value || "",
      lastUpdated: product ? new Date(product.lastUpdated) : new Date(),
    },
  });

  const formValues = watch();

  const onSubmit = (data) => {
    const updatedProduct = {
      ...data,
      category:
        categories.find((c) => c.value === data.category)?.label ||
        data.category,
      supplier:
        suppliers.find((s) => s.value === data.supplier)?.label ||
        data.supplier,
      lastUpdated: format(data.lastUpdated, "yyyy-MM-dd"),
    };
    onSave(updatedProduct);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setValue("image", imageUrl);
      toast.success("Image uploaded successfully");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={formValues.image}
                alt={formValues.name}
                className="w-16 h-16 object-cover rounded-md"
              />
              <Button
                variant="outline"
                size="sm"
                className="absolute bottom-0 right-0"
                onClick={() => fileInputRef.current.click()}
                type="button">
                <Upload className="h-4 w-4" />
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
                accept="image/*"
              />
            </div>
            <Input
              {...register("name", { required: "Product name is required" })}
              className="text-xl font-semibold flex-1"
            />
          </div>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full p-2 border rounded-md text-sm text-gray-600"
            rows={3}
          />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-xs font-medium text-gray-500">
                Category
              </span>
              <Combobox
                options={categories}
                value={formValues.category}
                onChange={(value) => setValue("category", value)}
                placeholder="Select category..."
              />
            </div>
            <div>
              <span className="text-xs font-medium text-gray-500">Price</span>
              <Input
                type="number"
                {...register("price", {
                  required: "Price is required",
                  min: { value: 0, message: "Price cannot be negative" },
                })}
                className="text-sm"
              />
            </div>
            <div>
              <span className="text-xs font-medium text-gray-500">Cost</span>
              <Input
                type="number"
                {...register("cost", {
                  required: "Cost is required",
                  min: { value: 0, message: "Cost cannot be negative" },
                })}
                className="text-sm"
              />
            </div>
            <div>
              <span className="text-xs font-medium text-gray-500">Stock</span>
              <Input
                type="number"
                {...register("stock", {
                  required: "Stock is required",
                  min: { value: 0, message: "Stock cannot be negative" },
                })}
                className="text-sm"
              />
            </div>
            <div>
              <span className="text-xs font-medium text-gray-500">
                Supplier
              </span>
              <Combobox
                options={suppliers}
                value={formValues.supplier}
                onChange={(value) => setValue("supplier", value)}
                placeholder="Select supplier..."
              />
            </div>
            <div>
              <span className="text-xs font-medium text-gray-500">
                Last Updated
              </span>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(formValues.lastUpdated, "PPP")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formValues.lastUpdated}
                    onSelect={(date) => setValue("lastUpdated", date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" /> Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Search, Barcode, Filter, ChevronRight } from "lucide-react";
import FilterMenu from "./FilterMenu";
import { categories, suppliers } from "../../lib/data";

export default function ProductList({
  products,
  selectedProduct,
  onProductSelect,
  observerRef,
}) {
  const [searchType, setSearchType] = useState("name");
  const [page, setPage] = useState(1);
  const { register, watch, setValue } = useForm({
    defaultValues: {
      globalFilter: "",
      category: "",
      supplier: "",
      stockMin: "",
      stockMax: "",
      sort: "",
    },
  });

  const formValues = watch();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );
    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      searchType === "barcode"
        ? product.barcode
            .toLowerCase()
            .includes(formValues.globalFilter.toLowerCase())
        : product.name
            .toLowerCase()
            .includes(formValues.globalFilter.toLowerCase());
    const matchesCategory = formValues.category
      ? product.category ===
        categories.find((c) => c.value === formValues.category)?.label
      : true;
    const matchesSupplier = formValues.supplier
      ? product.supplier ===
        suppliers.find((s) => s.value === formValues.supplier)?.label
      : true;
    const matchesStockMin = formValues.stockMin
      ? product.stock >= parseInt(formValues.stockMin)
      : true;
    const matchesStockMax = formValues.stockMax
      ? product.stock <= parseInt(formValues.stockMax)
      : true;
    return (
      matchesSearch &&
      matchesCategory &&
      matchesSupplier &&
      matchesStockMin &&
      matchesStockMax
    );
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (formValues.sort) {
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "stock-asc":
        return a.stock - b.stock;
      case "stock-desc":
        return b.stock - a.stock;
      default:
        return 0;
    }
  });

  const visibleProducts = sortedProducts.slice(0, page * 5);

  const handleBarcodeSearch = () => {
    setSearchType("barcode");
    document.getElementById("globalFilter").focus();
  };

  return (
    <div className="w-1/3 bg-white  shadow-lg border border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            id="globalFilter"
            placeholder={
              searchType === "barcode"
                ? "Search by barcode..."
                : "Search products..."
            }
            {...register("globalFilter")}
            className="pl-10 pr-10"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBarcodeSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <Barcode className="h-4 w-4 text-gray-500" />
          </Button>
        </div>
        <div className="mt-3 flex justify-between items-center">
          <p className="text-sm text-gray-500">
            {filteredProducts.length} products
          </p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <FilterMenu
                register={register}
                watch={watch}
                setValue={setValue}
              />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {visibleProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => onProductSelect(product)}
            className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 flex items-center gap-3 ${
              selectedProduct?.id === product.id
                ? "bg-blue-50 border-l-4 border-blue-500"
                : ""
            }`}>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900">
                {product.name}
              </h3>
              <p className="text-xs text-gray-500">Stock : {product.stock}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">
                ${product.price.toFixed(2)}
              </span>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        ))}
        {visibleProducts.length < sortedProducts.length && (
          <div ref={observerRef} className="p-4 text-center text-gray-500">
            Loading more...
          </div>
        )}
      </div>
    </div>
  );
}

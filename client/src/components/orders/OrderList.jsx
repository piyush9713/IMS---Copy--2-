import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Search, Filter, ChevronRight } from "lucide-react";
import FilterMenu from "./FilterMenu";
import { statuses, suppliers } from "../../lib/data";

export default function OrderList({
  orders,
  selectedOrder,
  onOrderSelect,
  observerRef,
}) {
  const [searchType, setSearchType] = useState("id");
  const [page, setPage] = useState(1);
  const { register, watch, setValue } = useForm({
    defaultValues: {
      globalFilter: "",
      status: "",
      supplier: "",
      totalMin: "",
      totalMax: "",
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

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      searchType === "id"
        ? order.id.toString().includes(formValues.globalFilter)
        : order.customer
            .toLowerCase()
            .includes(formValues.globalFilter.toLowerCase());
    const matchesStatus = formValues.status
      ? order.status ===
        statuses.find((s) => s.value === formValues.status)?.label
      : true;
    const matchesSupplier = formValues.supplier
      ? order.supplier ===
        suppliers.find((s) => s.value === formValues.supplier)?.label
      : true;
    const matchesTotalMin = formValues.totalMin
      ? order.total >= parseFloat(formValues.totalMin)
      : true;
    const matchesTotalMax = formValues.totalMax
      ? order.total <= parseFloat(formValues.totalMax)
      : true;
    return (
      matchesSearch &&
      matchesStatus &&
      matchesSupplier &&
      matchesTotalMin &&
      matchesTotalMax
    );
  });

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    switch (formValues.sort) {
      case "id-asc":
        return a.id - b.id;
      case "id-desc":
        return b.id - a.id;
      case "total-asc":
        return a.total - b.total;
      case "total-desc":
        return b.total - a.total;
      case "date-asc":
        return new Date(a.date) - new Date(b.date);
      case "date-desc":
        return new Date(b.date) - new Date(a.date);
      default:
        return 0;
    }
  });

  const visibleOrders = sortedOrders.slice(0, page * 5);

  const handleCustomerSearch = () => {
    setSearchType("customer");
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
              searchType === "id"
                ? "Search by order ID..."
                : "Search by customer..."
            }
            {...register("globalFilter")}
            className="pl-10 pr-10"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCustomerSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <Search className="h-4 w-4 text-gray-500" />
          </Button>
        </div>
        <div className="mt-3 flex justify-between items-center">
          <p className="text-sm text-gray-500">
            {filteredOrders.length} orders
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
        {visibleOrders.map((order) => (
          <div
            key={order.id}
            onClick={() => onOrderSelect(order)}
            className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 flex items-center gap-3 ${
              selectedOrder?.id === order.id
                ? "bg-blue-50 border-l-4 border-blue-500"
                : ""
            }`}>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900">
                Order #{order.id}
              </h3>
              <p className="text-xs text-gray-500">{order.customer}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">
                ${order.total.toFixed(2)}
              </span>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        ))}
        {visibleOrders.length < sortedOrders.length && (
          <div ref={observerRef} className="p-4 text-center text-gray-500">
            Loading more...
          </div>
        )}
      </div>
    </div>
  );
}

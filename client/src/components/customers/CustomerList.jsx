import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Search, Filter, ChevronRight } from "lucide-react";
import FilterMenu from "./FilterMenu";

export default function CustomerList({
  customers,
  selectedCustomer,
  onCustomerSelect,
  observerRef,
}) {
  const [page, setPage] = useState(1);
  const { register, watch, setValue } = useForm({
    defaultValues: {
      globalFilter: "",
      status: "",
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

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name
        .toLowerCase()
        .includes(formValues.globalFilter.toLowerCase()) ||
      customer.email
        .toLowerCase()
        .includes(formValues.globalFilter.toLowerCase());
    const matchesStatus = formValues.status
      ? customer.status === formValues.status
      : true;
    return matchesSearch && matchesStatus;
  });

  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    switch (formValues.sort) {
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "orders-asc":
        return a.totalOrders - b.totalOrders;
      case "orders-desc":
        return b.totalOrders - a.totalOrders;
      case "spent-asc":
        return a.totalSpent - b.totalSpent;
      case "spent-desc":
        return b.totalSpent - a.totalSpent;
      default:
        return 0;
    }
  });

  const visibleCustomers = sortedCustomers.slice(0, page * 5);

  return (
    <div className="w-1/3 bg-white shadow-lg border border-gray-200 flex flex-col ">
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search customers..."
            {...register("globalFilter")}
            className="pl-10"
          />
        </div>
        <div className="mt-3 flex justify-between items-center">
          <p className="text-sm text-gray-500">
            {filteredCustomers.length} customers
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
        {visibleCustomers.map((customer) => (
          <div
            key={customer.id}
            onClick={() => onCustomerSelect(customer)}
            className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 flex items-center gap-3 ${
              selectedCustomer?.id === customer.id
                ? "bg-blue-50 border-l-4 border-blue-500"
                : ""
            }`}>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900">
                {customer.name}
              </h3>
              <p className="text-xs text-gray-500">{customer.email}</p>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  customer.status === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}>
                {customer.status}
              </span>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        ))}
        {visibleCustomers.length < sortedCustomers.length && (
          <div ref={observerRef} className="p-4 text-center text-gray-500">
            Loading more...
          </div>
        )}
      </div>
    </div>
  );
}

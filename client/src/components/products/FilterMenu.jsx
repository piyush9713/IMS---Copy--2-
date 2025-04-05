import React from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import Combobox from "../../components/ui/combobox";
import { categories, suppliers, sortOptions } from "../../lib/data";

export default function FilterMenu({ register, watch, setValue }) {
  const formValues = watch();

  const resetFilters = () => {
    setValue("category", "");
    setValue("supplier", "");
    setValue("stockMin", "");
    setValue("stockMax", "");
    setValue("sort", "");
  };

  return (
    <div className="p-2 space-y-2">
      <Combobox
        options={[{ value: "", label: "All Categories" }, ...categories]}
        value={formValues.category}
        onChange={(value) => setValue("category", value)}
        placeholder="Select category..."
      />
      <Combobox
        options={[{ value: "", label: "All Suppliers" }, ...suppliers]}
        value={formValues.supplier}
        onChange={(value) => setValue("supplier", value)}
        placeholder="Select supplier..."
      />
      <div className="flex gap-2">
        <Input
          placeholder="Min Stock"
          type="number"
          {...register("stockMin")}
          className="w-1/2"
        />
        <Input
          placeholder="Max Stock"
          type="number"
          {...register("stockMax")}
          className="w-1/2"
        />
      </div>
      <Combobox
        options={[{ value: "", label: "No Sort" }, ...sortOptions]}
        value={formValues.sort}
        onChange={(value) => setValue("sort", value)}
        placeholder="Sort by..."
      />
      <Button variant="outline" onClick={resetFilters} className="w-full">
        Reset Filters
      </Button>
    </div>
  );
}

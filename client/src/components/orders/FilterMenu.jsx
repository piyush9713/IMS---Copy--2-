import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Combobox from "../ui/Combobox";
import { statuses, suppliers, sortOptions } from "../../lib/data";

export default function FilterMenu({ register, watch, setValue }) {
  const formValues = watch();

  const resetFilters = () => {
    setValue("status", "");
    setValue("supplier", "");
    setValue("totalMin", "");
    setValue("totalMax", "");
    setValue("sort", "");
  };

  return (
    <div className="p-2 space-y-2">
      <Combobox
        options={[{ value: "", label: "All Statuses" }, ...statuses]}
        value={formValues.status}
        onChange={(value) => setValue("status", value)}
        placeholder="Select status..."
      />
      <Combobox
        options={[{ value: "", label: "All Suppliers" }, ...suppliers]}
        value={formValues.supplier}
        onChange={(value) => setValue("supplier", value)}
        placeholder="Select supplier..."
      />
      <div className="flex gap-2">
        <Input
          placeholder="Min Total"
          type="number"
          {...register("totalMin")}
          className="w-1/2"
        />
        <Input
          placeholder="Max Total"
          type="number"
          {...register("totalMax")}
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

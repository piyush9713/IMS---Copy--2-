import React from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import Combobox from "../../components/ui/combobox";
import { customerStatuses, sortOptions } from "../../lib/data";

export default function FilterMenu({ watch, setValue }) {
  const formValues = watch();

  const resetFilters = () => {
    setValue("status", "");
    setValue("sort", "");
  };

  return (
    <div className="p-2 space-y-2">
      <Combobox
        options={[{ value: "", label: "All Statuses" }, ...customerStatuses]}
        value={formValues.status}
        onChange={(value) => setValue("status", value)}
        placeholder="Select status..."
      />
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

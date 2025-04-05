import React from "react";
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
import { Save } from "lucide-react";
import Combobox from "../../components/ui/combobox";
import { customerStatuses } from "../../lib/data";

export default function EditCustomerModal({
  isOpen,
  onClose,
  customer,
  onSave,
}) {
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      ...customer,
      status:
        customerStatuses.find((s) => s.label === customer?.status)?.value || "",
    },
  });

  const formValues = watch();

  const onSubmit = (data) => {
    const updatedCustomer = {
      ...data,
      status:
        customerStatuses.find((s) => s.value === data.status)?.label ||
        data.status,
    };
    onSave(updatedCustomer);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Customer</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-xs font-medium text-gray-500">Name</span>
              <Input
                {...register("name", { required: "Name is required" })}
                className="text-sm"
              />
            </div>
            <div>
              <span className="text-xs font-medium text-gray-500">Email</span>
              <Input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="text-sm"
              />
            </div>
            <div>
              <span className="text-xs font-medium text-gray-500">Phone</span>
              <Input {...register("phone")} className="text-sm" />
            </div>
            <div>
              <span className="text-xs font-medium text-gray-500">Status</span>
              <Combobox
                options={customerStatuses}
                value={formValues.status}
                onChange={(value) => setValue("status", value)}
                placeholder="Select status..."
              />
            </div>
            <div className="col-span-2">
              <span className="text-xs font-medium text-gray-500">Address</span>
              <Input {...register("address")} className="text-sm" />
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

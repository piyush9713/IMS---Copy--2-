import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";

export default function DeleteConfirmationDialog({
  isOpen,
  onClose,
  customer,
  onConfirm,
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete "{customer?.name}"? This action
            cannot be undone. All associated orders will be preserved but marked
            as "Customer Deleted".
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700">
            Delete Customer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

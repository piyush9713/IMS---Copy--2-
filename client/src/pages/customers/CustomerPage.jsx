import React, { useState, useRef } from "react";
import CustomerList from "../../components/customers/CustomerList";
import CustomerDetails from "../../components/customers/CustomerDetails";
import EditCustomerModal from "../../components/customers/EditCustomerModal";
import DeleteConfirmationDialog from "../../components/customers/DeleteConfirmationDialog";
import { dummyCustomers } from "../../lib/data";
import { toast } from "sonner";

export default function CustomerPage() {
  const [customers, setCustomers] = useState([...dummyCustomers]);
  const [selectedCustomer, setSelectedCustomer] = useState(dummyCustomers[0]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);
  const observerRef = useRef(null);

  const handleCustomerSelect = (customer) => setSelectedCustomer(customer);

  const handleEdit = () => setIsEditModalOpen(true);

  const handleSaveEdit = (updatedCustomer) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === updatedCustomer.id ? updatedCustomer : c))
    );
    setSelectedCustomer(updatedCustomer);
    setIsEditModalOpen(false);
    toast.success("Customer updated successfully");
  };

  const handleDelete = (customer) => {
    setCustomerToDelete(customer);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    setCustomers((prev) => prev.filter((c) => c.id !== customerToDelete.id));
    setShowDeleteDialog(false);
    setSelectedCustomer(customers[0] || null);
    toast.success("Customer deleted successfully");
  };

  return (
    <div>
      <main className="w-full mx-auto flex  h-[calc(100vh-60px)]">
        <CustomerList
          customers={customers}
          selectedCustomer={selectedCustomer}
          onCustomerSelect={handleCustomerSelect}
          observerRef={observerRef}
        />
        <CustomerDetails
          customer={selectedCustomer}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </main>

      <EditCustomerModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        customer={selectedCustomer}
        onSave={handleSaveEdit}
      />

      <DeleteConfirmationDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        product={customerToDelete}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

import React, { useState } from "react";
import { Input } from "../../../components/ui/input";
import Combobox from "../../../components/ui/combobox";
import { dummyCustomers } from "../../../lib/data";

export default function CustomerSelection({ selectedCustomer, onSelect }) {
  const [isNewCustomer, setIsNewCustomer] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    phone: "",
  });

  const customerOptions = dummyCustomers.map((customer) => ({
    value: customer.id,
    label: `${customer.name} (${customer.phone})`,
    ...customer,
  }));

  const handleNewCustomerChange = (e) => {
    setNewCustomer({
      ...newCustomer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectCustomer = (customerId) => {
    const customer = dummyCustomers.find((c) => c.id === customerId);
    onSelect(customer);
    setIsNewCustomer(false);
  };

  const handleSaveNewCustomer = () => {
    // In a real app, you would save this to your database
    const customer = {
      id: Date.now(),
      name: newCustomer.name,
      phone: newCustomer.phone,
    };
    onSelect(customer);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Customer</h2>

      {!isNewCustomer ? (
        <div className="space-y-2">
          <Combobox
            options={[
              { value: "", label: "Select customer..." },
              ...customerOptions,
            ]}
            value={selectedCustomer?.id || ""}
            onChange={handleSelectCustomer}
            placeholder="Search customer by name or phone..."
          />
          <button
            type="button"
            className="text-sm text-blue-600 hover:text-blue-800"
            onClick={() => setIsNewCustomer(true)}>
            + Add new customer
          </button>
        </div>
      ) : (
        <div className="space-y-3 p-4 border border-gray-200 rounded-md">
          <div>
            <span className="text-sm text-gray-600">Name</span>
            <Input
              name="name"
              value={newCustomer.name}
              onChange={handleNewCustomerChange}
              placeholder="Customer name"
            />
          </div>
          <div>
            <span className="text-sm text-gray-600">Phone</span>
            <Input
              name="phone"
              value={newCustomer.phone}
              onChange={handleNewCustomerChange}
              placeholder="Phone number"
            />
          </div>
          <div className="flex gap-2 pt-2">
            <Button
              type="button"
              onClick={handleSaveNewCustomer}
              disabled={!newCustomer.name || !newCustomer.phone}>
              Save Customer
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsNewCustomer(false);
                setNewCustomer({ name: "", phone: "" });
              }}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

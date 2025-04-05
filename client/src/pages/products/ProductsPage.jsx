import React, { useState, useRef } from "react";
import ProductList from "../../components/products/ProductList";
import ProductDetails from "../../components/products/ProductDetails";
import EditProductModal from "../../components/products/EditProductModal";
import DeleteConfirmationDialog from "../../components/products/DeleteConfirmationDialog";
import { dummyProducts } from "../../lib/data";
import { toast } from "sonner";

export default function ProductPage() {
  const [products, setProducts] = useState([...dummyProducts]);
  const [selectedProduct, setSelectedProduct] = useState(dummyProducts[0]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const observerRef = useRef(null);

  const handleProductSelect = (product) => setSelectedProduct(product);

  const handleEdit = () => setIsEditModalOpen(true);

  const handleSaveEdit = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    setSelectedProduct(updatedProduct);
    setIsEditModalOpen(false);
    toast.success("Product updated successfully");
  };

  const handleDelete = (product) => {
    setProductToDelete(product);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id));
    setShowDeleteDialog(false);
    setSelectedProduct(products[0] || null);
    toast.success("Product deleted successfully");
  };

  return (
    <div className="bg-gray-50">
      <main className="w-full mx-auto flex h-[calc(100vh-60px)]">
        <ProductList
          products={products}
          selectedProduct={selectedProduct}
          onProductSelect={handleProductSelect}
          observerRef={observerRef}
        />
        <ProductDetails
          product={selectedProduct}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </main>

      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        product={selectedProduct}
        onSave={handleSaveEdit}
      />

      <DeleteConfirmationDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        product={productToDelete}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

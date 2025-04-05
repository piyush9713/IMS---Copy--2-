import React, { forwardRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";

const BarcodeScanner = forwardRef(({ onClose, onScan }) => {
  const [scannedCode, setScannedCode] = useState("");

  // In a real app, you would integrate with an actual barcode scanner library
  const simulateScan = () => {
    const randomBarcode = `BC${Math.floor(Math.random() * 10000)}`;
    setScannedCode(randomBarcode);
    setTimeout(() => {
      onScan(randomBarcode);
      onClose();
    }, 1000);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Barcode Scanner</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4 p-4">
          <div className="w-full h-64 bg-gray-200 rounded-md flex items-center justify-center">
            {scannedCode ? (
              <p className="text-lg font-mono bg-white p-2 rounded">
                Scanned: {scannedCode}
              </p>
            ) : (
              <p className="text-gray-500">Camera feed will appear here</p>
            )}
          </div>
          <Button onClick={simulateScan} className="w-full">
            Simulate Scan (Demo)
          </Button>
          <p className="text-sm text-gray-500 text-center">
            In a real implementation, this would use the device camera to scan
            barcodes
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
});

BarcodeScanner.displayName = "BarcodeScanner";

export default BarcodeScanner;

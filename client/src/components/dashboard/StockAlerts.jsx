import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const lowStockItems = [
  {
    id: "1",
    name: "Wireless Headphones",
    sku: "SKU-001",
    stock: 5,
    minStock: 10,
    status: "Low Stock",
  },
  {
    id: "2",
    name: "Smart Watch",
    sku: "SKU-002",
    stock: 3,
    minStock: 10,
    status: "Low Stock",
  },
  {
    id: "3",
    name: "Bluetooth Speaker",
    sku: "SKU-003",
    stock: 0,
    minStock: 10,
    status: "Out of Stock",
  },
  {
    id: "4",
    name: "Wireless Charger",
    sku: "SKU-004",
    stock: 2,
    minStock: 10,
    status: "Low Stock",
  },
  {
    id: "5",
    name: "USB-C Cable",
    sku: "SKU-005",
    stock: 4,
    minStock: 10,
    status: "Low Stock",
  },
];

export default function StockAlerts() {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Current Stock</TableHead>
            <TableHead>Min Stock</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lowStockItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.sku}</TableCell>
              <TableCell>{item.stock}</TableCell>
              <TableCell>{item.minStock}</TableCell>
              <TableCell>
                <Badge variant={item.stock === 0 ? "destructive" : "warning"}>
                  {item.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/stock?product=${item.id}`}>Restock</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 flex justify-end">
        <Button variant="outline" size="sm" asChild>
          <Link href="/stock/alerts">
            View all alerts
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

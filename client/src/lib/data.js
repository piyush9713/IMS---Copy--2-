// Users
export const users = [
  { id: 1, name: "Admin User", email: "admin@example.com", role: "admin" },
  {
    id: 2,
    name: "Manager User",
    email: "manager@example.com",
    role: "manager",
  },
  { id: 3, name: "Staff User", email: "staff@example.com", role: "staff" },
];

// Products
export const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    SKU: "WH-001",
    barcode: "123456789",
    price: 99.99,
    stock: 45,
    category: "Electronics",
    warehouse: "Main Warehouse",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Smartphone X",
    SKU: "SP-002",
    barcode: "987654321",
    price: 899.99,
    stock: 12,
    category: "Electronics",
    warehouse: "Main Warehouse",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Desk Lamp",
    SKU: "DL-003",
    barcode: "456789123",
    price: 29.99,
    stock: 78,
    category: "Home Goods",
    warehouse: "Secondary Warehouse",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "Coffee Maker",
    SKU: "CM-004",
    barcode: "789123456",
    price: 49.99,
    stock: 5,
    category: "Kitchen",
    warehouse: "Main Warehouse",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 5,
    name: "Bluetooth Speaker",
    SKU: "BS-005",
    barcode: "321654987",
    price: 79.99,
    stock: 30,
    category: "Electronics",
    warehouse: "Secondary Warehouse",
    image: "/placeholder.svg?height=100&width=100",
  },
];

// Stock Logs
export const stockLogs = [
  {
    id: 1,
    product: "Wireless Headphones",
    changeType: "added",
    quantity: 10,
    updatedBy: "Admin User",
    timestamp: "2023-10-15T10:30:00",
  },
  {
    id: 2,
    product: "Smartphone X",
    changeType: "sold",
    quantity: 2,
    updatedBy: "Manager User",
    timestamp: "2023-10-15T11:45:00",
  },
  {
    id: 3,
    product: "Desk Lamp",
    changeType: "added",
    quantity: 15,
    updatedBy: "Staff User",
    timestamp: "2023-10-16T09:15:00",
  },
  {
    id: 4,
    product: "Coffee Maker",
    changeType: "removed",
    quantity: 3,
    updatedBy: "Admin User",
    timestamp: "2023-10-16T14:20:00",
  },
  {
    id: 5,
    product: "Bluetooth Speaker",
    changeType: "added",
    quantity: 8,
    updatedBy: "Manager User",
    timestamp: "2023-10-17T10:00:00",
  },
];

// Orders
export const orders = [
  {
    id: 1,
    customerName: "John Doe",
    items: [
      { product: "Wireless Headphones", quantity: 1, price: 99.99 },
      { product: "Bluetooth Speaker", quantity: 1, price: 79.99 },
    ],
    totalAmount: 179.98,
    status: "delivered",
    paymentStatus: "paid",
    createdAt: "2023-10-10T15:30:00",
  },
  {
    id: 2,
    customerName: "Jane Smith",
    items: [{ product: "Smartphone X", quantity: 1, price: 899.99 }],
    totalAmount: 899.99,
    status: "shipped",
    paymentStatus: "paid",
    createdAt: "2023-10-12T11:20:00",
  },
  {
    id: 3,
    customerName: "Robert Johnson",
    items: [
      { product: "Desk Lamp", quantity: 2, price: 29.99 },
      { product: "Coffee Maker", quantity: 1, price: 49.99 },
    ],
    totalAmount: 109.97,
    status: "pending",
    paymentStatus: "pending",
    createdAt: "2023-10-17T09:45:00",
  },
  {
    id: 4,
    customerName: "Emily Davis",
    items: [{ product: "Bluetooth Speaker", quantity: 1, price: 79.99 }],
    totalAmount: 79.99,
    status: "cancelled",
    paymentStatus: "refunded",
    createdAt: "2023-10-15T16:10:00",
  },
  {
    id: 5,
    customerName: "Michael Wilson",
    items: [
      { product: "Wireless Headphones", quantity: 1, price: 99.99 },
      { product: "Desk Lamp", quantity: 1, price: 29.99 },
    ],
    totalAmount: 129.98,
    status: "delivered",
    paymentStatus: "paid",
    createdAt: "2023-10-11T14:25:00",
  },
];

// Sales Data for Reports
export const salesData = [
  { month: "Jan", sales: 12500 },
  { month: "Feb", sales: 15000 },
  { month: "Mar", sales: 18000 },
  { month: "Apr", sales: 16500 },
  { month: "May", sales: 21000 },
  { month: "Jun", sales: 19500 },
  { month: "Jul", sales: 22500 },
  { month: "Aug", sales: 25000 },
  { month: "Sep", sales: 23000 },
  { month: "Oct", sales: 20000 },
  { month: "Nov", sales: 22000 },
  { month: "Dec", sales: 27000 },
];

// Low Stock Products
export const lowStockProducts = [
  {
    id: 4,
    name: "Coffee Maker",
    SKU: "CM-004",
    stock: 5,
    threshold: 10,
  },
  {
    id: 2,
    name: "Smartphone X",
    SKU: "SP-002",
    stock: 12,
    threshold: 15,
  },
];

// // Categories
// export const categories = [
//   { id: 1, name: "Electronics" },
//   { id: 2, name: "Home Goods" },
//   { id: 3, name: "Kitchen" },
//   { id: 4, name: "Office Supplies" },
//   { id: 5, name: "Clothing" },
// ];

// Warehouses
export const warehouses = [
  { id: 1, name: "Main Warehouse", location: "New York" },
  { id: 2, name: "Secondary Warehouse", location: "Los Angeles" },
  { id: 3, name: "Distribution Center", location: "Chicago" },
];

// Dummy product data
export const dummyProducts = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    barcode: "123456789012",
    category: "Electronics",
    price: 129.99,
    cost: 89.99,
    stock: 45,
    supplier: "TechGadgets Inc.",
    description:
      "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
    lastUpdated: "2023-05-15",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 2,
    name: "Organic Green Tea 100g",
    barcode: "234567890123",
    category: "Groceries",
    price: 8.99,
    cost: 4.5,
    stock: 120,
    supplier: "Nature's Best",
    description:
      "Premium organic green tea leaves sourced from sustainable farms.",
    lastUpdated: "2023-06-20",
    image:
      "https://images.unsplash.com/photo-1564894809617-ee57e7b1c1f3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JlZW4lMjB0ZWF8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 3,
    name: "Stainless Steel Water Bottle",
    barcode: "345678901234",
    category: "Accessories",
    price: 24.95,
    cost: 12.0,
    stock: 78,
    supplier: "Outdoor Gear Co.",
    description:
      "Durable 750ml stainless steel water bottle with vacuum insulation.",
    lastUpdated: "2023-04-10",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2F0ZXIlMjBib3R0bGV8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 4,
    name: "Yoga Mat (6mm)",
    barcode: "456789012345",
    category: "Fitness",
    price: 39.99,
    cost: 22.0,
    stock: 32,
    supplier: "FitLife Essentials",
    description:
      "Non-slip yoga mat with carrying strap, perfect for all skill levels.",
    lastUpdated: "2023-07-05",
    image:
      "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8eW9nYSUyMG1hdHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 5,
    name: "Bluetooth Speaker",
    barcode: "567890123456",
    category: "Electronics",
    price: 89.99,
    cost: 55.0,
    stock: 56,
    supplier: "AudioTech",
    description:
      "Portable Bluetooth speaker with 20W output and 15-hour battery.",
    lastUpdated: "2023-05-30",
    image:
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ymx1ZXRvb3RoJTIwc3BlYWtlcnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 6,
    name: "Notebook Set (3-pack)",
    barcode: "678901234567",
    category: "Stationery",
    price: 12.5,
    cost: 6.25,
    stock: 210,
    supplier: "Office Supplies Ltd",
    description:
      "Premium quality notebooks with 120 pages each, college ruled.",
    lastUpdated: "2023-06-15",
    image:
      "https://images.unsplash.com/photo-1586232702178-f044c5f4d4b7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bm90ZWJvb2t8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 7,
    name: "Ceramic Coffee Mug",
    barcode: "789012345678",
    category: "Kitchenware",
    price: 14.99,
    cost: 7.5,
    stock: 95,
    supplier: "Home & Hearth",
    description: "Handcrafted ceramic mug with comfortable grip, holds 12oz.",
    lastUpdated: "2023-07-10",
    image:
      "https://images.unsplash.com/photo-1590013570927-32923589e8f2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29mZmVlJTIwbXVnfGVufDB8fDB8fHww",
  },
  {
    id: 8,
    name: "Wireless Phone Charger",
    barcode: "890123456789",
    category: "Electronics",
    price: 29.99,
    cost: 15.0,
    stock: 63,
    supplier: "TechGadgets Inc.",
    description:
      "10W fast wireless charging pad compatible with all Qi-enabled devices.",
    lastUpdated: "2023-06-25",
    image:
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2lyZWxlc3MlMjBjaGFyZ2VyfGVufDB8fDB8fHww",
  },
  {
    id: 9,
    name: "Vitamin C Supplements (60 tablets)",
    barcode: "901234567890",
    category: "Health",
    price: 19.99,
    cost: 9.5,
    stock: 42,
    supplier: "Wellness Plus",
    description: "High-potency Vitamin C with rose hips for immune support.",
    lastUpdated: "2023-07-01",
    image:
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dml0YW1pbiUyMGN8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 10,
    name: "Desk Organizer",
    barcode: "012345678901",
    category: "Office",
    price: 22.95,
    cost: 11.0,
    stock: 28,
    supplier: "Office Supplies Ltd",
    description:
      "Wooden desk organizer with compartments for pens, clips, and small items.",
    lastUpdated: "2023-05-20",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVzayUyMG9yZ2FuaXplcnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 11,
    name: "Premium Wireless Headphones",
    barcode: "123456789012",
    category: "Electronics",
    price: 129.99,
    cost: 89.99,
    stock: 45,
    supplier: "TechGadgets Inc.",
    description:
      "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
    lastUpdated: "2023-05-15",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 12,
    name: "Organic Green Tea 100g",
    barcode: "234567890123",
    category: "Groceries",
    price: 8.99,
    cost: 4.5,
    stock: 120,
    supplier: "Nature's Best",
    description:
      "Premium organic green tea leaves sourced from sustainable farms.",
    lastUpdated: "2023-06-20",
    image:
      "https://images.unsplash.com/photo-1564894809617-ee57e7b1c1f3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JlZW4lMjB0ZWF8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 13,
    name: "Stainless Steel Water Bottle",
    barcode: "345678901234",
    category: "Accessories",
    price: 24.95,
    cost: 12.0,
    stock: 78,
    supplier: "Outdoor Gear Co.",
    description:
      "Durable 750ml stainless steel water bottle with vacuum insulation.",
    lastUpdated: "2023-04-10",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2F0ZXIlMjBib3R0bGV8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 14,
    name: "Yoga Mat (6mm)",
    barcode: "456789012345",
    category: "Fitness",
    price: 39.99,
    cost: 22.0,
    stock: 32,
    supplier: "FitLife Essentials",
    description:
      "Non-slip yoga mat with carrying strap, perfect for all skill levels.",
    lastUpdated: "2023-07-05",
    image:
      "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8eW9nYSUyMG1hdHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 15,
    name: "Bluetooth Speaker",
    barcode: "567890123456",
    category: "Electronics",
    price: 89.99,
    cost: 55.0,
    stock: 56,
    supplier: "AudioTech",
    description:
      "Portable Bluetooth speaker with 20W output and 15-hour battery.",
    lastUpdated: "2023-05-30",
    image:
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ymx1ZXRvb3RoJTIwc3BlYWtlcnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 16,
    name: "Notebook Set (3-pack)",
    barcode: "678901234567",
    category: "Stationery",
    price: 12.5,
    cost: 6.25,
    stock: 210,
    supplier: "Office Supplies Ltd",
    description:
      "Premium quality notebooks with 120 pages each, college ruled.",
    lastUpdated: "2023-06-15",
    image:
      "https://images.unsplash.com/photo-1586232702178-f044c5f4d4b7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bm90ZWJvb2t8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 17,
    name: "Ceramic Coffee Mug",
    barcode: "789012345678",
    category: "Kitchenware",
    price: 14.99,
    cost: 7.5,
    stock: 95,
    supplier: "Home & Hearth",
    description: "Handcrafted ceramic mug with comfortable grip, holds 12oz.",
    lastUpdated: "2023-07-10",
    image:
      "https://images.unsplash.com/photo-1590013570927-32923589e8f2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29mZmVlJTIwbXVnfGVufDB8fDB8fHww",
  },
  {
    id: 18,
    name: "Wireless Phone Charger",
    barcode: "890123456789",
    category: "Electronics",
    price: 29.99,
    cost: 15.0,
    stock: 63,
    supplier: "TechGadgets Inc.",
    description:
      "10W fast wireless charging pad compatible with all Qi-enabled devices.",
    lastUpdated: "2023-06-25",
    image:
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2lyZWxlc3MlMjBjaGFyZ2VyfGVufDB8fDB8fHww",
  },
  {
    id: 19,
    name: "Vitamin C Supplements (60 tablets)",
    barcode: "901234567890",
    category: "Health",
    price: 19.99,
    cost: 9.5,
    stock: 42,
    supplier: "Wellness Plus",
    description: "High-potency Vitamin C with rose hips for immune support.",
    lastUpdated: "2023-07-01",
    image:
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dml0YW1pbiUyMGN8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 20,
    name: "Desk Organizer",
    barcode: "012345678901",
    category: "Office",
    price: 22.95,
    cost: 11.0,
    stock: 28,
    supplier: "Office Supplies Ltd",
    description:
      "Wooden desk organizer with compartments for pens, clips, and small items.",
    lastUpdated: "2023-05-20",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVzayUyMG9yZ2FuaXplcnxlbnwwfHwwfHx8MA%3D%3D",
  },
];

export const categories = [
  { value: "electronics", label: "Electronics" },
  { value: "groceries", label: "Groceries" },
  { value: "accessories", label: "Accessories" },
  { value: "fitness", label: "Fitness" },
  { value: "stationery", label: "Stationery" },
  { value: "kitchenware", label: "Kitchenware" },
  { value: "health", label: "Health" },
  { value: "office", label: "Office" },
];

export const suppliers = [
  { value: "techgadgets", label: "TechGadgets Inc." },
  { value: "naturesbest", label: "Nature's Best" },
  { value: "outdoorgear", label: "Outdoor Gear Co." },
  { value: "fitlife", label: "FitLife Essentials" },
  { value: "audiotech", label: "AudioTech" },
  { value: "officesupplies", label: "Office Supplies Ltd" },
  { value: "homehearth", label: "Home & Hearth" },
  { value: "wellnessplus", label: "Wellness Plus" },
];

export const sortOptions = [
  { value: "name-asc", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
  { value: "price-asc", label: "Price (Low to High)" },
  { value: "price-desc", label: "Price (High to Low)" },
  { value: "stock-asc", label: "Stock (Low to High)" },
  { value: "stock-desc", label: "Stock (High to Low)" },
];

export const statuses = [
  { value: "pending", label: "Pending" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
];

export const dummyOrders = [
  {
    id: 1,
    customer: "John Doe",
    status: "Pending",
    total: 259.98,
    supplier: "TechGadgets Inc.",
    date: "2023-08-01",
    items: [
      { name: "Premium Wireless Headphones", quantity: 2, price: 129.99 },
    ],
  },
  {
    id: 2,
    customer: "Jane Smith",
    status: "Shipped",
    total: 89.99,
    supplier: "AudioTech",
    date: "2023-08-02",
    items: [{ name: "Bluetooth Speaker", quantity: 1, price: 89.99 }],
  },
  {
    id: 3,
    customer: "Bob Johnson",
    status: "Delivered",
    total: 49.94,
    supplier: "Outdoor Gear Co.",
    date: "2023-08-03",
    items: [
      { name: "Stainless Steel Water Bottle", quantity: 2, price: 24.95 },
    ],
  },
  {
    id: 4,
    customer: "Alice Brown",
    status: "Pending",
    total: 39.99,
    supplier: "FitLife Essentials",
    date: "2023-08-04",
    items: [{ name: "Yoga Mat (6mm)", quantity: 1, price: 39.99 }],
  },
  {
    id: 5,
    customer: "Mike Wilson",
    status: "Shipped",
    total: 179.98,
    supplier: "TechGadgets Inc.",
    date: "2023-08-05",
    items: [
      { name: "Wireless Phone Charger", quantity: 2, price: 29.99 },
      { name: "Premium Wireless Headphones", quantity: 1, price: 129.99 },
    ],
  },
];

export const dummyCustomers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Anytown, USA",
    status: "active",
    totalOrders: 12,
    totalSpent: 1250.75,
    joinDate: "2022-03-15",
    recentOrders: [
      {
        id: "ORD-1001",
        date: "2023-05-10",
        amount: 125.99,
        quantity: 1,
        status: "completed",
      },
      {
        id: "ORD-998",
        date: "2023-04-28",
        amount: 89.5,
        quantity: 1,
        status: "completed",
      },
      {
        id: "ORD-995",
        date: "2023-04-15",
        amount: 210.25,
        quantity: 2,
        status: "completed",
      },
    ],
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 987-6543",
    address: "456 Oak Ave, Somewhere, USA",
    status: "inactive",
    totalOrders: 5,
    totalSpent: 450.2,
    joinDate: "2022-07-22",
    recentOrders: [
      { id: "ORD-876", date: "2023-02-18", amount: 75.3, status: "completed" },
    ],
  },
  // Add more customers as needed
];

export const customerStatuses = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "banned", label: "Banned" },
];

export const paymentMethods = [
  { value: "cash", label: "Cash" },
  { value: "credit", label: "Credit" },
  { value: "debit", label: "Debit Card" },
  { value: "bank_transfer", label: "Bank Transfer" },
  { value: "other", label: "Other" },
];

// Add this to your existing dummyOrderProducts
export const dummyOrderProducts = [
  {
    id: 1,
    name: "Premium Widget",
    price: 29.99,
    barcode: "123456789",
    stock: 45,
  },
  {
    id: 2,
    name: "Standard Widget",
    price: 19.99,
    barcode: "987654321",
    stock: 30,
  },
  // Add more products as needed
];

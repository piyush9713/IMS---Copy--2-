# 🌐 API Documentation

## 🔐 Authentication & User Management

| Method | Endpoint                           | Description                                           |
| ------ | ---------------------------------- | ----------------------------------------------------- |
| POST   | `/api/auth/register`               | Register User (Role: user by default) using Email OTP |
| POST   | `/api/auth/login`                  | Login using OTP                                       |
| POST   | `/api/auth/login-password`         | Login using email & password (for staff)              |
| POST   | `/api/auth/send-otp`               | Send OTP to Email                                     |
| POST   | `/api/auth/verify-otp`             | Verify OTP                                            |
| GET    | `/api/auth/me`                     | Get current user profile / Update own profile         |
| POST   | `/api/auth/logout`                 | Logout user                                           |
| POST   | `/api/auth/change-password`        | Change password (for staff/admin)                     |
| POST   | `/api/auth/reset-password`         | Send password reset email                             |
| POST   | `/api/auth/reset-password/confirm` | Confirm password reset with OTP or Token              |

---

## 👔 Staff Management

| Method | Endpoint                | Description                        |
| ------ | ----------------------- | ---------------------------------- |
| GET    | `/api/users/staffs`     | Get all staff members (Searchable) |
| POST   | `/api/users/staffs`     | Create new staff (by user)         |
| PUT    | `/api/users/staffs/:id` | Update staff details               |
| DELETE | `/api/users/staffs/:id` | Delete staff                       |

---

## 👤 Customer Management

| Method | Endpoint                     | Description                                                         |
| ------ | ---------------------------- | ------------------------------------------------------------------- |
| GET    | `/api/customers`             | Get all customers (Searchable)                                      |
| POST   | `/api/customers`             | Add new customer                                                    |
| PUT    | `/api/customers/:id`         | Update customer details                                             |
| DELETE | `/api/customers/:id`         | Delete customer                                                     |
| GET    | `/api/customers/:id`         | Get single customer details                                         |
| GET    | `/api/customers/:id/details` | Get detailed customer profile with sales, payments, dues, statement |

---

## 🏭 Vendor Management

| Method | Endpoint           | Description                  |
| ------ | ------------------ | ---------------------------- |
| GET    | `/api/vendors`     | Get all vendors (Searchable) |
| POST   | `/api/vendors`     | Add vendor                   |
| PUT    | `/api/vendors/:id` | Update vendor details        |
| DELETE | `/api/vendors/:id` | Delete vendor                |
| GET    | `/api/vendors/:id` | Get single vendor details    |

---

## 🏷️ Category & Brand Management

| Method | Endpoint              | Description        |
| ------ | --------------------- | ------------------ |
| GET    | `/api/categories`     | Get all categories |
| POST   | `/api/categories`     | Add new category   |
| PUT    | `/api/categories/:id` | Update category    |
| DELETE | `/api/categories/:id` | Delete category    |

---

## 📦 Item & Inventory

| Method | Endpoint                      | Description                     |
| ------ | ----------------------------- | ------------------------------- |
| GET    | `/api/items`                  | Get all items (Searchable)      |
| GET    | `/api/items/:id`              | Get single item                 |
| GET    | `/api/items/barcode/:barcode` | Get item by barcode             |
| POST   | `/api/items`                  | Add new item                    |
| PUT    | `/api/items/:id`              | Update item details             |
| DELETE | `/api/items/:id`              | Delete item                     |
| GET    | `/api/items/low-stock`        | Get list of low-stock items     |
| POST   | `/api/items/bulk-upload`      | Bulk import items via CSV/Excel |

---

## 📥 Purchase Management

| Method | Endpoint                            | Description                                           |
| ------ | ----------------------------------- | ----------------------------------------------------- |
| GET    | `/api/purchases`                    | Get all purchase records (search, filter, pagination) |
| GET    | `/api/purchases/:id`                | Get single purchase details                           |
| POST   | `/api/purchases`                    | Create new purchase entry (Add stock)                 |
| PUT    | `/api/purchases/:id`                | Update purchase details (admin only)                  |
| DELETE | `/api/purchases/:id`                | Delete a purchase entry                               |
| GET    | `/api/purchases/vendor/:vendorId`   | Get all purchases from vendor                         |
| PUT    | `/api/purchases/:id/payment-status` | Update payment status                                 |
| GET    | `/api/purchases/report`             | Get purchase report                                   |
| GET    | `/api/purchases/summary`            | Monthly/yearly purchase summary                       |

---

## 💰 Sales Management

| Method | Endpoint                          | Description                                     |
| ------ | --------------------------------- | ----------------------------------------------- |
| GET    | `/api/sales`                      | Get all sales (Searchable)                      |
| GET    | `/api/sales/:id`                  | Get single sale details                         |
| POST   | `/api/sales`                      | Create new sale                                 |
| PUT    | `/api/sales/:id`                  | Update sale (optional)                          |
| DELETE | `/api/sales/:id`                  | Delete sale (optional)                          |
| POST   | `/api/sales/draft`                | Save sales draft                                |
| GET    | `/api/sales/drafts`               | List saved drafts                               |
| GET    | `/api/sales/summary`              | Monthly/yearly sales summary                    |
| PUT    | `/api/sales/:id/payment-status`   | Update payment status                           |
| POST   | `/api/sales/:saleId/send-invoice` | Send invoice via WhatsApp after sales completed |

---

## 💳 Transaction Management

| Method | Endpoint                | Description            |
| ------ | ----------------------- | ---------------------- |
| GET    | `/api/transactions`     | Get all transactions   |
| POST   | `/api/transactions`     | Add transaction        |
| GET    | `/api/transactions/:id` | Get single transaction |

---

## 🧾 Invoice Management

| Method | Endpoint                     | Description            |
| ------ | ---------------------------- | ---------------------- |
| GET    | `/api/invoices`              | Get all invoices       |
| GET    | `/api/invoices/:id`          | Get specific invoice   |
| GET    | `/api/invoices/sale/:saleId` | Get invoice by sale ID |
| GET    | `/api/invoices/:id/download` | Download invoice PDF   |

---

## 📊 Dashboard & Analytics

| Method | Endpoint                              | Description            |
| ------ | ------------------------------------- | ---------------------- |
| GET    | `/api/dashboard/top-customers`        | Top customers by sales |
| GET    | `/api/dashboard/top-items`            | Top-selling items      |
| GET    | `/api/dashboard/sales-graph`          | Sales data for graphs  |
| GET    | `/api/dashboard/stock-status`         | Low-stock items        |
| GET    | `/api/dashboard/recent-sales`         | Recent transactions    |
| GET    | `/api/dashboard/revenue`              | Revenue metrics        |
| GET    | `/api/dashboard/recent-activities`    | System activities      |
| GET    | `/api/dashboard/today-summary`        | Today's metrics        |
| GET    | `/api/dashboard/customer-stats`       | Customer analytics     |
| GET    | `/api/dashboard/category-wise-sales`  | Sales by category      |
| GET    | `/api/dashboard/vendor-wise-purchase` | Purchases by vendor    |
| GET    | `/api/dashboard/profit-loss`          | Profit & Loss report   |

---

## 👑 Admin Management

| Method | Endpoint                      | Description      |
| ------ | ----------------------------- | ---------------- |
| GET    | `/api/admin/users`            | Get all users    |
| GET    | `/api/admin/users/:id`        | Get user details |
| POST   | `/api/admin/users/staff`      | Create staff     |
| PUT    | `/api/admin/users/:id`        | Update user      |
| PUT    | `/api/admin/users/:id/role`   | Update role      |
| PUT    | `/api/admin/users/:id/status` | Toggle status    |
| DELETE | `/api/admin/users/:id`        | Delete user      |
| GET    | `/api/admin/roles`            | Get all roles    |
| GET    | `/api/admin/audit-logs`       | View audit logs  |

---

# 📈 Reporting API Endpoints

## Sales Reports

| Method | Endpoint             | Description                                                                     |
| ------ | -------------------- | ------------------------------------------------------------------------------- |
| `GET`  | `/api/reports/sales` | Get detailed sales report (Date range, customer-wise, item-wise, category-wise) |

## Purchase Reports

| Method | Endpoint                 | Description                                                       |
| ------ | ------------------------ | ----------------------------------------------------------------- |
| `GET`  | `/api/reports/purchases` | Get detailed purchase report (Date range, vendor-wise, item-wise) |

## Profit & Loss Reports

| Method | Endpoint                                        | Description                                          |
| ------ | ----------------------------------------------- | ---------------------------------------------------- |
| `GET`  | `/api/reports/bill-profit/:saleId`              | Get profit & loss report for a specific bill/invoice |
| `GET`  | `/api/reports/customer-profit-loss/:customerId` | Get profit & loss summary for a specific customer    |
| `GET`  | `/api/reports/item-profit-loss/:itemId`         | Get profit & loss for a specific item                |

## Customer Reports

| Method | Endpoint                                          | Description                                                  |
| ------ | ------------------------------------------------- | ------------------------------------------------------------ |
| `GET`  | `/api/reports/customer-statement/:customerId`     | Get customer statement (Total purchase, total payment, dues) |
| `GET`  | `/api/reports/customers-summary`                  | Get complete customer report with sales, payment, dues       |
| `GET`  | `/api/reports/customer-sale-purchase/:customerId` | Get sale & purchase report by specific customer              |

## Inventory Reports

| Method | Endpoint                            | Description                                                      |
| ------ | ----------------------------------- | ---------------------------------------------------------------- |
| `GET`  | `/api/reports/item-details/:itemId` | Get detailed report of an item (Sales, Purchases, Stock, Profit) |
| `GET`  | `/api/reports/low-stock-summary`    | Get summary of all low-stock & out-of-stock items                |

---

## 🔄 Optional Modules

### Returns & Refunds

| Method | Endpoint           | Description        |
| ------ | ------------------ | ------------------ |
| POST   | `/api/returns`     | Create return      |
| GET    | `/api/returns`     | Get all returns    |
| GET    | `/api/returns/:id` | Get return details |

### Expenses

| Method | Endpoint            | Description    |
| ------ | ------------------- | -------------- |
| GET    | `/api/expenses`     | Get expenses   |
| POST   | `/api/expenses`     | Add expense    |
| PUT    | `/api/expenses/:id` | Update expense |
| DELETE | `/api/expenses/:id` | Delete expense |

### Notifications

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| GET    | `/api/notifications` | Get notifications |

---

## 📱 Mobile Endpoints

| Method | Endpoint                          | Description                 |
| ------ | --------------------------------- | --------------------------- |
| POST   | `/api/mobile/sync`                | Mobile sync                 |
| GET    | `/api/mobile/offline-data`        | Offline data                |
| POST   | `/api/mobile/upload-offline-data` | Upload offline transactions |

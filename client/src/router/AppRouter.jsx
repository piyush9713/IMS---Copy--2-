import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AuthRoute from "./AuthRoute";
import Login from "../pages/auth/Login";
import VerifyOtp from "../pages/auth/VerifyOtp";
import DashboardPage from "../pages/dashboard/DashboardPage";
import Register from "../pages/auth/Register";
import Layout from "../components/Layout";
import ProductsPage from "../pages/products/ProductsPage";
import AddProductPage from "../pages/products/AddProductPage";
import OrdersPage from "../pages/orders/OrdersPage";
import StockPage from "../pages/stock/StockPage";
import CustomerPage from "../pages/customers/CustomerPage";
import CreateOrderPage from "../pages/orders/CreateOrderPage";

const router = createBrowserRouter([
  {
    element: <AuthRoute />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/verify-otp",
        element: <VerifyOtp />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    element: (
      <Layout>
        <ProtectedRoute />
      </Layout>
    ),
    path: "/",
    children: [
      {
        path: "/",
        element: <DashboardPage />,
      },
      {
        path: "/products",
        element: <ProductsPage />,
      },
      {
        path: "/add-product",
        element: <AddProductPage />,
      },
      {
        path: "/orders",
        element: <OrdersPage />,
      },
      {
        path: "/add-order",
        element: <CreateOrderPage />,
      },
      {
        path: "/customers",
        element: <CustomerPage />,
      },
      {
        path: "/stock",
        element: <StockPage />,
      },
    ],
  },
  { path: "*", element: <Navigate to="/" replace /> },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;

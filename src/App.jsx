import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import { ThemeProvider } from "@/contexts/theme-context";

import Layout from "@/routes/layout";
import DashboardPage from "@/routes/dashboard/page";
import Analytics from "@/routes/analytics/page";
import Reports from "@/routes/reports/page";
import Customers from "@/routes/customers/page";
import NewCustomer from "@/routes/new-customer/page";
import VerifiedCustomers from "@/routes/verified-customers/page";
import Products from "@/routes/products/page";
import NewProduct from "@/routes/new-product/page";
import Inventory from "@/routes/inventory/page";
import Settings from "@/routes/settings/page";
import LoginPage from "@/routes/login";
import NotFound from "@/routes/not-found";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Navigate to="/login" replace />, 
        },
        {
            path: "/login",
            element: <LoginPage />,
        },
        {
            path: "/reports",
            element: <Reports />,
        },
        {
            path: "/dashboard",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <DashboardPage />,
                },
                { index: true,
                    path: "analytics",
                    element: <Analytics />,
                },
                {
                    path: "reports",
                    element: <Reports />,
                },
                {
                    path: "customers",
                    element: <Customers />,
                },
                {
                    path: "new-customer",
                    element: <NewCustomer />,
                },
                {
                    path: "verified-customers",
                    element: <VerifiedCustomers />,
                },
                {
                    path: "products",
                    element: <Products />,
                },
                {
                    path: "new-product",
                    element: <NewProduct />,
                },
                {
                    path: "inventory",
                    element: <Inventory />,
                },
                {
                    path: "settings",
                    element: <Settings />,
                },
            ],
        },
        {
            path: "*",
            element: <NotFound />,
        },
    ]);

    return (
        <ThemeProvider storageKey="theme">
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;

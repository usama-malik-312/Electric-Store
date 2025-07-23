import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import { ThemeProvider } from "@/contexts/theme-context";

import Layout from "@/routes/layout";
import DashboardPage from "@/routes/dashboard/page";
import Analytics from "@/routes/analytics/page";
import Reports from "@/routes/reports/page";
import Stores from "@/routes/stores/page";
import Customers from "@/routes/customers/page";
import NewCustomer from "@/routes/new-customer/page";
import Products from "@/routes/products/page";
import Inventory from "@/routes/inventory/page";
import Settings from "@/routes/settings/page";
import Users from "@/routes/users/page";
import Suppliers from "@/routes/suppliers/page";
import Brands from "@/routes/brands/page";
import LoginPage from "@/routes/login";
import NotFound from "@/routes/not-found";
import NewUser from "@/routes/users/new-user";
import NewStore from "@/routes/stores/new-store";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <Navigate
                    to="/login"
                    replace
                />
            ),
        },
        {
            path: "/login",
            element: <LoginPage />,
        },
        {
            path: "/dashboard",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <DashboardPage />,
                },
                {
                    path: "analytics",
                    element: <Analytics />,
                },
            ],
        },
        {
            path: "/reports",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <Reports />,
                },
            ],
        },
        {
            path: "/Stores",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <Stores />,
                },
            ],
        },
        {
            path: "/analytics",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <Analytics />,
                },
            ],
        },
        {
            path: "/customers",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <Customers />,
                },
            ],
        },
        {
            path: "/new-customer",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <NewCustomer />,
                },
            ],
        },
        {
            path: "/products",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <Products />,
                },
            ],
        },
        {
            path: "/inventory",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <Inventory />,
                },
            ],
        },
        {
            path: "/settings",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <Settings />,
                },
            ],
        },
        {
            path: "/users",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <Users />,
                },
            ],
        },
        {
            path: "/suppliers",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <Suppliers />,
                },
            ],
        },
        {
            path: "/brands",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <Brands />,
                },
            ],
        },
        {
            path: "/new-user",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <NewUser />,
                },
            ],
        },
        {
            path: "/new-store",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <NewStore />,
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

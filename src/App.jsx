import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import { ThemeProvider } from "@/contexts/theme-context";

import Layout from "@/routes/layout";
import DashboardPage from "@/routes/dashboard/page";
import Analytics from "@/routes/analytics/page";
import Reports from "@/routes/reports/page";
import Stores from "@/routes/stores/page";
import NewStore from "@/routes/stores/new-store";
import EditStore from "@/routes/stores/edit-store";
import Customers from "@/routes/customers/page";
import NewCustomer from "@/routes/customers/new-customer";
import EditCustomer from "@/routes/customers/edit-customer";
import Products from "@/routes/products/page";
import Inventory from "@/routes/inventory/page";
import Settings from "@/routes/settings/page";
import Users from "@/routes/users/page";
import NewUser from "@/routes/users/new-user";
import EditUser from "@/routes/users/edit-user";
import Suppliers from "@/routes/suppliers/page";
import NewSupplier from "@/routes/suppliers/new-supplier";
import EditSupplier from "@/routes/suppliers/edit-supplier";
import Brands from "@/routes/brands/page";
import NewBrand from "@/routes/brands/new-brand";
import EditBrand from "@/routes/brands/edit-brand";
import Items from "@/routes/items/page";
import NewItem from "@/routes/items/new-item";
import EditItem from "@/routes/items/edit-item";
import ItemGroups from "@/routes/item-groups/page";
import NewItemGroup from "@/routes/item-groups/new-item-group";
import EditItemGroup from "@/routes/item-groups/edit-item-group";
import LoginPage from "@/routes/login";
import NotFound from "@/routes/not-found";

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
            path: "/stores/:id/edit",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <EditStore />,
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
            path: "/customers/:id/edit",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <EditCustomer />,
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
            path: "/users/:id/edit",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <EditUser />,
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
            path: "/new-supplier",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <NewSupplier />,
                },
            ],
        },
        {
            path: "/suppliers/:id/edit",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <EditSupplier />,
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
            path: "/new-brand",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <NewBrand />,
                },
            ],
        },
        {
            path: "/brands/:id/edit",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <EditBrand />,
                },
            ],
        },
        {
            path: "/items",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <Items />,
                },
            ],
        },
        {
            path: "/new-item",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <NewItem />,
                },
            ],
        },
        {
            path: "/items/:id/edit",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <EditItem />,
                },
            ],
        },
        {
            path: "/item-groups",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <ItemGroups />,
                },
            ],
        },
        {
            path: "/new-item-group",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <NewItemGroup />,
                },
            ],
        },
        {
            path: "/item-groups/:id/edit",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <EditItemGroup />,
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

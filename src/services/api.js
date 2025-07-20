import api from '@/utils/api';

export const apiService = {
    // Generic CRUD operations
    async get(endpoint) {
        try {
            const response = await api.get(endpoint);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async post(endpoint, data) {
        try {
            const response = await api.post(endpoint, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async put(endpoint, data) {
        try {
            const response = await api.put(endpoint, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async delete(endpoint) {
        try {
            const response = await api.delete(endpoint);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Users
    async getUsers() {
        return this.get('/users');
    },

    async getUser(id) {
        return this.get(`/users/${id}`);
    },

    async createUser(userData) {
        return this.post('/users', userData);
    },

    async updateUser(id, userData) {
        return this.put(`/users/${id}`, userData);
    },

    async deleteUser(id) {
        return this.delete(`/users/${id}`);
    },

    // Products
    async getProducts() {
        return this.get('/products');
    },

    async getProduct(id) {
        return this.get(`/products/${id}`);
    },

    async createProduct(productData) {
        return this.post('/products', productData);
    },

    async updateProduct(id, productData) {
        return this.put(`/products/${id}`, productData);
    },

    async deleteProduct(id) {
        return this.delete(`/products/${id}`);
    },

    // Customers
    async getCustomers() {
        return this.get('/customers');
    },

    async getCustomer(id) {
        return this.get(`/customers/${id}`);
    },

    async createCustomer(customerData) {
        return this.post('/customers', customerData);
    },

    async updateCustomer(id, customerData) {
        return this.put(`/customers/${id}`, customerData);
    },

    async deleteCustomer(id) {
        return this.delete(`/customers/${id}`);
    },

    // Suppliers
    async getSuppliers() {
        return this.get('/suppliers');
    },

    async getSupplier(id) {
        return this.get(`/suppliers/${id}`);
    },

    async createSupplier(supplierData) {
        return this.post('/suppliers', supplierData);
    },

    async updateSupplier(id, supplierData) {
        return this.put(`/suppliers/${id}`, supplierData);
    },

    async deleteSupplier(id) {
        return this.delete(`/suppliers/${id}`);
    },

    // Brands
    async getBrands() {
        return this.get('/brands');
    },

    async getBrand(id) {
        return this.get(`/brands/${id}`);
    },

    async createBrand(brandData) {
        return this.post('/brands', brandData);
    },

    async updateBrand(id, brandData) {
        return this.put(`/brands/${id}`, brandData);
    },

    async deleteBrand(id) {
        return this.delete(`/brands/${id}`);
    },

    // Analytics/Dashboard
    async getDashboardStats() {
        return this.get('/dashboard/stats');
    },

    async getAnalytics() {
        return this.get('/analytics');
    },

    async getReports() {
        return this.get('/reports');
    },

    // Inventory
    async getInventory() {
        return this.get('/inventory');
    },

    async updateInventory(id, inventoryData) {
        return this.put(`/inventory/${id}`, inventoryData);
    }
}; 
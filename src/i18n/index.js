import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// English translations
const enTranslations = {
    translation: {
        // Common
        common: {
            save: 'Save',
            cancel: 'Cancel',
            edit: 'Edit',
            delete: 'Delete',
            view: 'View',
            create: 'Create',
            update: 'Update',
            back: 'Back',
            search: 'Search',
            loading: 'Loading...',
            error: 'Error',
            success: 'Success',
            confirm: 'Confirm',
            actions: 'Actions',
            status: 'Status',
            active: 'Active',
            inactive: 'Inactive',
            yes: 'Yes',
            no: 'No',
        },

        // Navigation
        nav: {
            dashboard: 'Dashboard',
            analytics: 'Analytics',
            reports: 'Reports',
            customers: 'Customers',
            products: 'Products',
            items: 'Items',
            itemGroups: 'Item Groups',
            stores: 'Stores',
            users: 'Users',
            suppliers: 'Suppliers',
            brands: 'Brands',
            settings: 'Settings',
            management: 'Management',
        },

        // Users
        users: {
            title: 'Users',
            createUser: 'Create User',
            editUser: 'Edit User',
            firstName: 'First Name',
            lastName: 'Last Name',
            fullName: 'Full Name',
            email: 'Email',
            password: 'Password',
            phoneNumber: 'Phone Number',
            address: 'Address',
            userRole: 'User Role',
            profileImage: 'Profile Image',
            admin: 'Admin',
            manager: 'Manager',
            staff: 'Staff',
            user: 'User',
        },

        // Customers
        customers: {
            title: 'Customers',
            createCustomer: 'Create Customer',
            editCustomer: 'Edit Customer',
            customerCode: 'Customer Code',
            creditLimit: 'Credit Limit',
            balance: 'Balance',
        },

        // Stores
        stores: {
            title: 'Stores',
            createStore: 'Create Store',
            editStore: 'Edit Store',
            storeName: 'Store Name',
            storeCode: 'Store Code',
            location: 'Location',
            description: 'Description',
            contactNumber: 'Contact Number',
        },

        // Brands
        brands: {
            title: 'Brands',
            createBrand: 'Create Brand',
            editBrand: 'Edit Brand',
            brandName: 'Brand Name',
            brandCode: 'Brand Code',
            logoImage: 'Logo Image',
        },

        // Suppliers
        suppliers: {
            title: 'Suppliers',
            createSupplier: 'Create Supplier',
            editSupplier: 'Edit Supplier',
            supplierName: 'Supplier Name',
            supplierCode: 'Supplier Code',
            contactPerson: 'Contact Person',
            taxId: 'Tax ID',
        },

        // Items
        items: {
            title: 'Items',
            createItem: 'Create Item',
            editItem: 'Edit Item',
            itemName: 'Item Name',
            itemCode: 'Item Code',
            unit: 'Unit',
            costPrice: 'Cost Price',
            sellingPrice: 'Selling Price',
            taxPercentage: 'Tax Percentage',
            discount: 'Discount',
            minStockLevel: 'Minimum Stock Level',
            currentStock: 'Current Stock',
            image: 'Item Image',
            pieces: 'Pieces',
            kilograms: 'Kilograms',
            grams: 'Grams',
            liters: 'Liters',
            milliliters: 'Milliliters',
            meters: 'Meters',
            centimeters: 'Centimeters',
            box: 'Box',
            pack: 'Pack',
            set: 'Set',
        },

        // Item Groups
        itemGroups: {
            title: 'Item Groups',
            createItemGroup: 'Create Item Group',
            editItemGroup: 'Edit Item Group',
            groupName: 'Group Name',
            groupCode: 'Group Code',
        },

        // Messages
        messages: {
            createdSuccessfully: 'created successfully!',
            updatedSuccessfully: 'updated successfully!',
            deletedSuccessfully: 'deleted successfully!',
            failedToCreate: 'Failed to create',
            failedToUpdate: 'Failed to update',
            failedToDelete: 'Failed to delete',
            failedToFetch: 'Failed to fetch data',
            confirmDelete: 'Are you sure you want to delete this',
            uploadSuccess: 'Image uploaded successfully',
            uploadFailed: 'Image upload failed',
        },

        // Form labels
        form: {
            basicInformation: 'Basic Information',
            relationships: 'Relationships',
            pricingInformation: 'Pricing Information',
            inventoryAndImage: 'Inventory & Image',
            selectBrand: 'Select brand',
            selectSupplier: 'Select supplier',
            selectItemGroup: 'Select item group',
            selectStore: 'Select store',
            selectStatus: 'Select status',
            selectUnit: 'Select unit',
            enterItemName: 'Enter item name',
            enterItemCode: 'Enter item code',
            enterDescription: 'Enter description',
            enterCostPrice: 'Enter cost price',
            enterSellingPrice: 'Enter selling price',
            enterTaxPercentage: 'Enter tax percentage',
            enterDiscount: 'Enter discount',
            enterMinStock: 'Enter minimum stock level',
            enterCurrentStock: 'Enter current stock',
            uploadImage: 'Upload Image',
        },
    },
};

// Urdu translations
const urTranslations = {
    translation: {
        // Common
        common: {
            save: 'محفوظ کریں',
            cancel: 'منسوخ کریں',
            edit: 'ترمیم',
            delete: 'حذف کریں',
            view: 'دیکھیں',
            create: 'بنائیں',
            update: 'اپڈیٹ کریں',
            back: 'واپس',
            search: 'تلاش کریں',
            loading: 'لوڈ ہو رہا ہے...',
            error: 'خرابی',
            success: 'کامیاب',
            confirm: 'تصدیق کریں',
            actions: 'اعمال',
            status: 'حیثیت',
            active: 'فعال',
            inactive: 'غیر فعال',
            yes: 'ہاں',
            no: 'نہیں',
        },

        // Navigation
        nav: {
            dashboard: 'ڈیش بورڈ',
            analytics: 'تجزیہ',
            reports: 'رپورٹس',
            customers: 'گاہک',
            products: 'مصنوعات',
            items: 'آئٹمز',
            itemGroups: 'آئٹم گروپس',
            stores: 'اسٹورز',
            users: 'صارفین',
            suppliers: 'سپلائرز',
            brands: 'برانڈز',
            settings: 'ترتیبات',
            management: 'انتظام',
        },

        // Users
        users: {
            title: 'صارفین',
            createUser: 'صارف بنائیں',
            editUser: 'صارف کی ترمیم',
            firstName: 'پہلا نام',
            lastName: 'آخری نام',
            fullName: 'پورا نام',
            email: 'ای میل',
            password: 'پاس ورڈ',
            phoneNumber: 'فون نمبر',
            address: 'پتہ',
            userRole: 'صارف کا کردار',
            profileImage: 'پروفائل تصویر',
            admin: 'ایڈمن',
            manager: 'مینیجر',
            staff: 'عملہ',
            user: 'صارف',
        },

        // Customers
        customers: {
            title: 'گاہک',
            createCustomer: 'گاہک بنائیں',
            editCustomer: 'گاہک کی ترمیم',
            customerCode: 'گاہک کا کوڈ',
            creditLimit: 'کریڈٹ کی حد',
            balance: 'بیلنس',
        },

        // Stores
        stores: {
            title: 'اسٹورز',
            createStore: 'اسٹور بنائیں',
            editStore: 'اسٹور کی ترمیم',
            storeName: 'اسٹور کا نام',
            storeCode: 'اسٹور کا کوڈ',
            location: 'مقام',
            description: 'تفصیل',
            contactNumber: 'رابطہ نمبر',
        },

        // Brands
        brands: {
            title: 'برانڈز',
            createBrand: 'برانڈ بنائیں',
            editBrand: 'برانڈ کی ترمیم',
            brandName: 'برانڈ کا نام',
            brandCode: 'برانڈ کا کوڈ',
            logoImage: 'لوگو تصویر',
        },

        // Suppliers
        suppliers: {
            title: 'سپلائرز',
            createSupplier: 'سپلائر بنائیں',
            editSupplier: 'سپلائر کی ترمیم',
            supplierName: 'سپلائر کا نام',
            supplierCode: 'سپلائر کا کوڈ',
            contactPerson: 'رابطہ شخص',
            taxId: 'ٹیکس آئی ڈی',
        },

        // Items
        items: {
            title: 'آئٹمز',
            createItem: 'آئٹم بنائیں',
            editItem: 'آئٹم کی ترمیم',
            itemName: 'آئٹم کا نام',
            itemCode: 'آئٹم کا کوڈ',
            unit: 'یونٹ',
            costPrice: 'لاگت کی قیمت',
            sellingPrice: 'فروخت کی قیمت',
            taxPercentage: 'ٹیکس کا فیصد',
            discount: 'رعایت',
            minStockLevel: 'کم سے کم اسٹاک کی سطح',
            currentStock: 'موجودہ اسٹاک',
            image: 'آئٹم کی تصویر',
            pieces: 'ٹکڑے',
            kilograms: 'کلوگرام',
            grams: 'گرام',
            liters: 'لیٹر',
            milliliters: 'ملی لیٹر',
            meters: 'میٹر',
            centimeters: 'سینٹی میٹر',
            box: 'بکس',
            pack: 'پیک',
            set: 'سیٹ',
        },

        // Item Groups
        itemGroups: {
            title: 'آئٹم گروپس',
            createItemGroup: 'آئٹم گروپ بنائیں',
            editItemGroup: 'آئٹم گروپ کی ترمیم',
            groupName: 'گروپ کا نام',
            groupCode: 'گروپ کا کوڈ',
        },

        // Messages
        messages: {
            createdSuccessfully: 'کامیابی سے بنایا گیا!',
            updatedSuccessfully: 'کامیابی سے اپڈیٹ کیا گیا!',
            deletedSuccessfully: 'کامیابی سے حذف کیا گیا!',
            failedToCreate: 'بنانے میں ناکام',
            failedToUpdate: 'اپڈیٹ کرنے میں ناکام',
            failedToDelete: 'حذف کرنے میں ناکام',
            failedToFetch: 'ڈیٹا حاصل کرنے میں ناکام',
            confirmDelete: 'کیا آپ واقعی اسے حذف کرنا چاہتے ہیں',
            uploadSuccess: 'تصویر کامیابی سے اپلوڈ ہوئی',
            uploadFailed: 'تصویر اپلوڈ کرنے میں ناکام',
        },

        // Form labels
        form: {
            basicInformation: 'بنیادی معلومات',
            relationships: 'تعلقات',
            pricingInformation: 'قیمتوں کی معلومات',
            inventoryAndImage: 'انوینٹری اور تصویر',
            selectBrand: 'برانڈ منتخب کریں',
            selectSupplier: 'سپلائر منتخب کریں',
            selectItemGroup: 'آئٹم گروپ منتخب کریں',
            selectStore: 'اسٹور منتخب کریں',
            selectStatus: 'حیثیت منتخب کریں',
            selectUnit: 'یونٹ منتخب کریں',
            enterItemName: 'آئٹم کا نام درج کریں',
            enterItemCode: 'آئٹم کا کوڈ درج کریں',
            enterDescription: 'تفصیل درج کریں',
            enterCostPrice: 'لاگت کی قیمت درج کریں',
            enterSellingPrice: 'فروخت کی قیمت درج کریں',
            enterTaxPercentage: 'ٹیکس کا فیصد درج کریں',
            enterDiscount: 'رعایت درج کریں',
            enterMinStock: 'کم سے کم اسٹاک کی سطح درج کریں',
            enterCurrentStock: 'موجودہ اسٹاک درج کریں',
            uploadImage: 'تصویر اپلوڈ کریں',
        },
    },
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: enTranslations,
            ur: urTranslations,
        },
        fallbackLng: 'en',
        debug: false,
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
        },
    });

export default i18n; 
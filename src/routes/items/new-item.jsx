import React, { useState, useEffect } from "react";
import { Form, Input, Button, Card, Select, InputNumber, Upload, message, Image } from "antd";
import { SaveOutlined, ArrowLeftOutlined, UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import api from "@/utils/api";

const { Option } = Select;
const { TextArea } = Input;

const NewItem = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    // Data for dropdowns
    const [brands, setBrands] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [itemGroups, setItemGroups] = useState([]);
    const [stores, setStores] = useState([]);

    const statusOptions = [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
    ];

    const unitOptions = [
        { value: "pcs", label: "Pieces" },
        { value: "kg", label: "Kilograms" },
        { value: "g", label: "Grams" },
        { value: "l", label: "Liters" },
        { value: "ml", label: "Milliliters" },
        { value: "m", label: "Meters" },
        { value: "cm", label: "Centimeters" },
        { value: "box", label: "Box" },
        { value: "pack", label: "Pack" },
        { value: "set", label: "Set" },
    ];

    // Fetch dropdown data
    useEffect(() => {
        const fetchDropdownData = async () => {
            try {
                const [brandsRes, suppliersRes, itemGroupsRes, storesRes] = await Promise.all([
                    api.get('/brands'),
                    api.get('/suppliers'),
                    api.get('/item-groups'),
                    api.get('/stores')
                ]);

                setBrands(brandsRes.data?.data || []);
                setSuppliers(suppliersRes.data?.data || []);
                setItemGroups(itemGroupsRes.data?.data || []);
                setStores(storesRes.data?.data || []);
            } catch (error) {
                message.error("Failed to load dropdown data");
            }
        };

        fetchDropdownData();
    }, []);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const itemData = {
                ...values,
                image: imageUrl,
            };

            await api.post("/items", itemData);
            message.success("Item created successfully!");
            navigate("/items");
        } catch (error) {
            message.error(error.response?.data?.message || "Failed to create item");
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = (info) => {
        if (info.file.status === "done") {
            setImageUrl(info.file.response?.url || "");
            message.success("Image uploaded successfully");
        } else if (info.file.status === "error") {
            message.error("Image upload failed");
        }
    };

    return (
        <Card>
            <div className="flex items-center justify-between mb-6">
                <h1 className="title">Create New Item</h1>
                <Button
                    icon={<ArrowLeftOutlined />}
                    onClick={() => navigate("/items")}
                >
                    Back to Items
                </Button>
            </div>

            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                    status: "active",
                    costPrice: 0,
                    sellingPrice: 0,
                    taxPercentage: 0,
                    discount: 0,
                    minStockLevel: 0,
                    currentStock: 0,
                }}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Basic Information</h3>

                        <Form.Item
                            name="itemName"
                            label="Item Name"
                            rules={[{ required: true, message: "Item name is required" }]}
                        >
                            <Input placeholder="Enter item name" />
                        </Form.Item>

                        <Form.Item
                            name="itemCode"
                            label="Item Code"
                            rules={[{ required: true, message: "Item code is required" }]}
                        >
                            <Input placeholder="Enter item code" />
                        </Form.Item>

                        <Form.Item
                            name="description"
                            label="Description"
                        >
                            <TextArea rows={3} placeholder="Enter item description" />
                        </Form.Item>

                        <Form.Item
                            name="unit"
                            label="Unit"
                            rules={[{ required: true, message: "Unit is required" }]}
                        >
                            <Select placeholder="Select unit">
                                {unitOptions.map(unit => (
                                    <Option key={unit.value} value={unit.value}>
                                        {unit.label}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </div>

                    {/* Relationships */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Relationships</h3>

                        <Form.Item
                            name="brandId"
                            label="Brand"
                        >
                            <Select placeholder="Select brand" allowClear>
                                {brands.map(brand => (
                                    <Option key={brand.id} value={brand.id}>
                                        {brand.brandName}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="supplierId"
                            label="Supplier"
                        >
                            <Select placeholder="Select supplier" allowClear>
                                {suppliers.map(supplier => (
                                    <Option key={supplier.id} value={supplier.id}>
                                        {supplier.supplierName}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="itemGroupId"
                            label="Item Group"
                        >
                            <Select placeholder="Select item group" allowClear>
                                {itemGroups.map(group => (
                                    <Option key={group.id} value={group.id}>
                                        {group.groupName}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="storeId"
                            label="Store"
                            rules={[{ required: true, message: "Store is required" }]}
                        >
                            <Select placeholder="Select store">
                                {stores.map(store => (
                                    <Option key={store.id} value={store.id}>
                                        {store.storeName}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </div>

                    {/* Pricing Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Pricing Information</h3>

                        <Form.Item
                            name="costPrice"
                            label="Cost Price"
                            rules={[{ required: true, message: "Cost price is required" }]}
                        >
                            <InputNumber
                                placeholder="Enter cost price"
                                style={{ width: '100%' }}
                                min={0}
                                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            />
                        </Form.Item>

                        <Form.Item
                            name="sellingPrice"
                            label="Selling Price"
                            rules={[{ required: true, message: "Selling price is required" }]}
                        >
                            <InputNumber
                                placeholder="Enter selling price"
                                style={{ width: '100%' }}
                                min={0}
                                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            />
                        </Form.Item>

                        <Form.Item
                            name="taxPercentage"
                            label="Tax Percentage"
                        >
                            <InputNumber
                                placeholder="Enter tax percentage"
                                style={{ width: '100%' }}
                                min={0}
                                max={100}
                                formatter={value => `${value}%`}
                                parser={value => value.replace('%', '')}
                            />
                        </Form.Item>

                        <Form.Item
                            name="discount"
                            label="Discount"
                        >
                            <InputNumber
                                placeholder="Enter discount"
                                style={{ width: '100%' }}
                                min={0}
                                max={100}
                                formatter={value => `${value}%`}
                                parser={value => value.replace('%', '')}
                            />
                        </Form.Item>
                    </div>

                    {/* Inventory & Image */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Inventory & Image</h3>

                        <Form.Item
                            name="minStockLevel"
                            label="Minimum Stock Level"
                            rules={[{ required: true, message: "Minimum stock level is required" }]}
                        >
                            <InputNumber
                                placeholder="Enter minimum stock level"
                                style={{ width: '100%' }}
                                min={0}
                            />
                        </Form.Item>

                        <Form.Item
                            name="currentStock"
                            label="Current Stock"
                            rules={[{ required: true, message: "Current stock is required" }]}
                        >
                            <InputNumber
                                placeholder="Enter current stock"
                                style={{ width: '100%' }}
                                min={0}
                            />
                        </Form.Item>

                        <Form.Item
                            name="status"
                            label="Status"
                            rules={[{ required: true, message: "Status is required" }]}
                        >
                            <Select placeholder="Select status">
                                {statusOptions.map(status => (
                                    <Option key={status.value} value={status.value}>
                                        {status.label}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="image"
                            label="Item Image"
                        >
                            <Upload
                                name="file"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action="/api/upload"
                                onChange={handleImageUpload}
                            >
                                {imageUrl ? (
                                    <div>
                                        <Image
                                            src={imageUrl}
                                            alt="Item"
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </div>
                                ) : (
                                    <div>
                                        <UploadOutlined />
                                        <div style={{ marginTop: 8 }}>Upload Image</div>
                                    </div>
                                )}
                            </Upload>
                        </Form.Item>
                    </div>
                </div>

                <div className="flex justify-end space-x-4 mt-6">
                    <Button onClick={() => navigate("/items")}>
                        Cancel
                    </Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        icon={<SaveOutlined />}
                    >
                        Create Item
                    </Button>
                </div>
            </Form>
        </Card>
    );
};

export default NewItem; 
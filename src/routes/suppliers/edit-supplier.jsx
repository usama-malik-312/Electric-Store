import React, { useState, useEffect } from "react";
import { Form, Input, Button, Card, Select, message } from "antd";
import { SaveOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import api from "@/utils/api";

const { Option } = Select;
const { TextArea } = Input;

const EditSupplier = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    const statusOptions = [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
    ];

    // Fetch supplier data
    useEffect(() => {
        const fetchSupplier = async () => {
            try {
                const response = await api.get(`/suppliers/${id}`);
                const supplierData = response.data;

                form.setFieldsValue({
                    supplierName: supplierData.supplierName,
                    supplierCode: supplierData.supplierCode,
                    contactPerson: supplierData.contactPerson,
                    phoneNumber: supplierData.phoneNumber,
                    address: supplierData.address,
                    location: supplierData.location,
                    taxId: supplierData.taxId,
                    status: supplierData.status,
                });
            } catch (error) {
                message.error("Failed to fetch supplier data");
                navigate("/suppliers");
            } finally {
                setFetching(false);
            }
        };

        if (id) {
            fetchSupplier();
        }
    }, [id, form, navigate]);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            await api.put(`/suppliers/${id}`, values);
            message.success("Supplier updated successfully!");
            navigate("/suppliers");
        } catch (error) {
            message.error(error.response?.data?.message || "Failed to update supplier");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <Card>
                <div className="text-center py-8">Loading supplier data...</div>
            </Card>
        );
    }

    return (
        <Card>
            <div className="flex items-center justify-between mb-6">
                <h1 className="title">Edit Supplier</h1>
                <Button
                    icon={<ArrowLeftOutlined />}
                    onClick={() => navigate("/suppliers")}
                >
                    Back to Suppliers
                </Button>
            </div>

            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Basic Information</h3>

                        <Form.Item
                            name="supplierName"
                            label="Supplier Name"
                            rules={[{ required: true, message: "Supplier name is required" }]}
                        >
                            <Input placeholder="Enter supplier name" />
                        </Form.Item>

                        <Form.Item
                            name="supplierCode"
                            label="Supplier Code"
                            rules={[{ required: true, message: "Supplier code is required" }]}
                        >
                            <Input placeholder="Enter supplier code" />
                        </Form.Item>

                        <Form.Item
                            name="contactPerson"
                            label="Contact Person"
                            rules={[{ required: true, message: "Contact person is required" }]}
                        >
                            <Input placeholder="Enter contact person name" />
                        </Form.Item>

                        <Form.Item
                            name="phoneNumber"
                            label="Phone Number"
                            rules={[{ required: true, message: "Phone number is required" }]}
                        >
                            <Input placeholder="Enter phone number" />
                        </Form.Item>
                    </div>

                    {/* Additional Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Additional Information</h3>

                        <Form.Item
                            name="address"
                            label="Address"
                        >
                            <TextArea rows={3} placeholder="Enter address" />
                        </Form.Item>

                        <Form.Item
                            name="location"
                            label="Location"
                            rules={[{ required: true, message: "Location is required" }]}
                        >
                            <Input placeholder="Enter location" />
                        </Form.Item>

                        <Form.Item
                            name="taxId"
                            label="Tax ID"
                        >
                            <Input placeholder="Enter tax ID" />
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
                    </div>
                </div>

                <div className="flex justify-end space-x-4 mt-6">
                    <Button onClick={() => navigate("/suppliers")}>
                        Cancel
                    </Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        icon={<SaveOutlined />}
                    >
                        Update Supplier
                    </Button>
                </div>
            </Form>
        </Card>
    );
};

export default EditSupplier; 
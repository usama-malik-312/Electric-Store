import React, { useState, useEffect } from "react";
import { Form, Input, Button, Card, Select, message } from "antd";
import { SaveOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import api from "@/utils/api";

const { Option } = Select;
const { TextArea } = Input;

const EditStore = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    const statusOptions = [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
    ];

    // Fetch store data
    useEffect(() => {
        const fetchStore = async () => {
            try {
                const response = await api.get(`/stores/${id}`);
                const storeData = response.data;

                form.setFieldsValue({
                    storeName: storeData.storeName,
                    storeCode: storeData.storeCode,
                    location: storeData.location,
                    contactNumber: storeData.contactNumber,
                    description: storeData.description,
                    status: storeData.status,
                });
            } catch (error) {
                message.error("Failed to fetch store data");
                navigate("/stores");
            } finally {
                setFetching(false);
            }
        };

        if (id) {
            fetchStore();
        }
    }, [id, form, navigate]);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            await api.put(`/stores/${id}`, values);
            message.success("Store updated successfully!");
            navigate("/stores");
        } catch (error) {
            message.error(error.response?.data?.message || "Failed to update store");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <Card>
                <div className="text-center py-8">Loading store data...</div>
            </Card>
        );
    }

    return (
        <Card>
            <div className="flex items-center justify-between mb-6">
                <h1 className="title">Edit Store</h1>
                <Button
                    icon={<ArrowLeftOutlined />}
                    onClick={() => navigate("/stores")}
                >
                    Back to Stores
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
                            name="storeName"
                            label="Store Name"
                            rules={[{ required: true, message: "Store name is required" }]}
                        >
                            <Input placeholder="Enter store name" />
                        </Form.Item>

                        <Form.Item
                            name="storeCode"
                            label="Store Code"
                            rules={[{ required: true, message: "Store code is required" }]}
                        >
                            <Input placeholder="Enter store code" />
                        </Form.Item>

                        <Form.Item
                            name="location"
                            label="Location"
                            rules={[{ required: true, message: "Location is required" }]}
                        >
                            <Input placeholder="Enter store location" />
                        </Form.Item>

                        <Form.Item
                            name="contactNumber"
                            label="Contact Number"
                            rules={[{ required: true, message: "Contact number is required" }]}
                        >
                            <Input placeholder="Enter contact number" />
                        </Form.Item>
                    </div>

                    {/* Additional Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Additional Information</h3>

                        <Form.Item
                            name="description"
                            label="Description"
                        >
                            <TextArea rows={4} placeholder="Enter store description" />
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
                    <Button onClick={() => navigate("/stores")}>
                        Cancel
                    </Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        icon={<SaveOutlined />}
                    >
                        Update Store
                    </Button>
                </div>
            </Form>
        </Card>
    );
};

export default EditStore; 
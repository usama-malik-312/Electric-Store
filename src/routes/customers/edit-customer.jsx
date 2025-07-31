import React, { useState, useEffect } from "react";
import { Form, Input, Button, Card, Select, InputNumber, message } from "antd";
import { SaveOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import api from "@/utils/api";

const { Option } = Select;
const { TextArea } = Input;

const EditCustomer = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    const statusOptions = [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
    ];

    // Fetch customer data
    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const response = await api.get(`/customers/${id}`);
                const customerData = response.data;

                form.setFieldsValue({
                    fullName: customerData.fullName,
                    customerCode: customerData.customerCode,
                    phoneNumber: customerData.phoneNumber,
                    address: customerData.address,
                    creditLimit: customerData.creditLimit,
                    balance: customerData.balance,
                    status: customerData.status,
                });
            } catch (error) {
                message.error("Failed to fetch customer data");
                navigate("/customers");
            } finally {
                setFetching(false);
            }
        };

        if (id) {
            fetchCustomer();
        }
    }, [id, form, navigate]);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            await api.put(`/customers/${id}`, values);
            message.success("Customer updated successfully!");
            navigate("/customers");
        } catch (error) {
            message.error(error.response?.data?.message || "Failed to update customer");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <Card>
                <div className="text-center py-8">Loading customer data...</div>
            </Card>
        );
    }

    return (
        <Card>
            <div className="flex items-center justify-between mb-6">
                <h1 className="title">Edit Customer</h1>
                <Button
                    icon={<ArrowLeftOutlined />}
                    onClick={() => navigate("/customers")}
                >
                    Back to Customers
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
                            name="fullName"
                            label="Full Name"
                            rules={[{ required: true, message: "Full name is required" }]}
                        >
                            <Input placeholder="Enter full name" />
                        </Form.Item>

                        <Form.Item
                            name="customerCode"
                            label="Customer Code"
                            rules={[{ required: true, message: "Customer code is required" }]}
                        >
                            <Input placeholder="Enter customer code" />
                        </Form.Item>

                        <Form.Item
                            name="phoneNumber"
                            label="Phone Number"
                            rules={[{ required: true, message: "Phone number is required" }]}
                        >
                            <Input placeholder="Enter phone number" />
                        </Form.Item>

                        <Form.Item
                            name="address"
                            label="Address"
                        >
                            <TextArea rows={3} placeholder="Enter address" />
                        </Form.Item>
                    </div>

                    {/* Financial Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Financial Information</h3>

                        <Form.Item
                            name="creditLimit"
                            label="Credit Limit"
                            rules={[{ required: true, message: "Credit limit is required" }]}
                        >
                            <InputNumber
                                placeholder="Enter credit limit"
                                style={{ width: '100%' }}
                                min={0}
                                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            />
                        </Form.Item>

                        <Form.Item
                            name="balance"
                            label="Current Balance"
                            rules={[{ required: true, message: "Balance is required" }]}
                        >
                            <InputNumber
                                placeholder="Enter current balance"
                                style={{ width: '100%' }}
                                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
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
                    </div>
                </div>

                <div className="flex justify-end space-x-4 mt-6">
                    <Button onClick={() => navigate("/customers")}>
                        Cancel
                    </Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        icon={<SaveOutlined />}
                    >
                        Update Customer
                    </Button>
                </div>
            </Form>
        </Card>
    );
};

export default EditCustomer; 
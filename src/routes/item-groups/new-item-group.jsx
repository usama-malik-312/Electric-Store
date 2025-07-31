import React, { useState } from "react";
import { Form, Input, Button, Card, Select, message } from "antd";
import { SaveOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import api from "@/utils/api";

const { Option } = Select;
const { TextArea } = Input;

const NewItemGroup = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const statusOptions = [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
    ];

    const onFinish = async (values) => {
        setLoading(true);
        try {
            await api.post("/item-groups", values);
            message.success("Item Group created successfully!");
            navigate("/item-groups");
        } catch (error) {
            message.error(error.response?.data?.message || "Failed to create item group");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <div className="flex items-center justify-between mb-6">
                <h1 className="title">Create New Item Group</h1>
                <Button
                    icon={<ArrowLeftOutlined />}
                    onClick={() => navigate("/item-groups")}
                >
                    Back to Item Groups
                </Button>
            </div>

            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                    status: "active",
                }}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Basic Information</h3>

                        <Form.Item
                            name="groupName"
                            label="Group Name"
                            rules={[{ required: true, message: "Group name is required" }]}
                        >
                            <Input placeholder="Enter group name" />
                        </Form.Item>

                        <Form.Item
                            name="groupCode"
                            label="Group Code"
                            rules={[{ required: true, message: "Group code is required" }]}
                        >
                            <Input placeholder="Enter group code" />
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

                    {/* Description */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Description</h3>

                        <Form.Item
                            name="description"
                            label="Description"
                        >
                            <TextArea rows={6} placeholder="Enter group description" />
                        </Form.Item>
                    </div>
                </div>

                <div className="flex justify-end space-x-4 mt-6">
                    <Button onClick={() => navigate("/item-groups")}>
                        Cancel
                    </Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        icon={<SaveOutlined />}
                    >
                        Create Item Group
                    </Button>
                </div>
            </Form>
        </Card>
    );
};

export default NewItemGroup; 
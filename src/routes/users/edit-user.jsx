import React, { useState, useEffect } from "react";
import { Form, Input, Button, Card, Select, Upload, message } from "antd";
import { UploadOutlined, SaveOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import api from "@/utils/api";

const { Option } = Select;
const { TextArea } = Input;

const EditUser = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [imageUrl, setImageUrl] = useState("");

    const userRoles = [
        { value: "admin", label: "Admin" },
        { value: "manager", label: "Manager" },
        { value: "staff", label: "Staff" },
        { value: "cashier", label: "Cashier" },
    ];

    const statusOptions = [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
    ];

    // Fetch user data
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get(`/users/${id}`);
                const userData = response.data;

                // Split fullName into firstName and lastName
                const nameParts = userData.fullName?.split(' ') || [];
                const firstName = nameParts[0] || '';
                const lastName = nameParts.slice(1).join(' ') || '';

                form.setFieldsValue({
                    firstName,
                    lastName,
                    email: userData.email,
                    phoneNumber: userData.phoneNumber,
                    address: userData.address,
                    userRole: userData.userRole,
                    status: userData.status,
                });

                setImageUrl(userData.profileImage || "");
            } catch (error) {
                message.error("Failed to fetch user data");
                navigate("/users");
            } finally {
                setFetching(false);
            }
        };

        if (id) {
            fetchUser();
        }
    }, [id, form, navigate]);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const fullName = `${values.firstName} ${values.lastName}`.trim();
            const userData = {
                ...values,
                fullName,
                profileImage: imageUrl,
            };

            await api.put(`/users/${id}`, userData);
            message.success("User updated successfully!");
            navigate("/users");
        } catch (error) {
            message.error(error.response?.data?.message || "Failed to update user");
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

    if (fetching) {
        return (
            <Card>
                <div className="text-center py-8">Loading user data...</div>
            </Card>
        );
    }

    return (
        <Card>
            <div className="flex items-center justify-between mb-6">
                <h1 className="title">Edit User</h1>
                <Button
                    icon={<ArrowLeftOutlined />}
                    onClick={() => navigate("/users")}
                >
                    Back to Users
                </Button>
            </div>

            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Personal Information</h3>

                        <Form.Item
                            name="firstName"
                            label="First Name"
                            rules={[{ required: true, message: "First name is required" }]}
                        >
                            <Input placeholder="Enter first name" />
                        </Form.Item>

                        <Form.Item
                            name="lastName"
                            label="Last Name"
                            rules={[{ required: true, message: "Last name is required" }]}
                        >
                            <Input placeholder="Enter last name" />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                { required: true, message: "Email is required" },
                                { type: "email", message: "Please enter a valid email" }
                            ]}
                        >
                            <Input placeholder="Enter email address" />
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
                            name="userRole"
                            label="User Role"
                            rules={[{ required: true, message: "User role is required" }]}
                        >
                            <Select placeholder="Select user role">
                                {userRoles.map(role => (
                                    <Option key={role.value} value={role.value}>
                                        {role.label}
                                    </Option>
                                ))}
                            </Select>
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
                            name="profileImage"
                            label="Profile Image"
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
                                    <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
                                ) : (
                                    <div>
                                        <UploadOutlined />
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>
                                )}
                            </Upload>
                        </Form.Item>
                    </div>
                </div>

                <div className="flex justify-end space-x-4 mt-6">
                    <Button onClick={() => navigate("/users")}>
                        Cancel
                    </Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        icon={<SaveOutlined />}
                    >
                        Update User
                    </Button>
                </div>
            </Form>
        </Card>
    );
};

export default EditUser; 
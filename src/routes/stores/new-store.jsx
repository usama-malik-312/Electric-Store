import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Select, Card, message, Row, Col } from "antd";
import api from "@/utils/api";

const { Option } = Select;

export default function NewUser() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            await api.post("/users", values);
            message.success("User created successfully!");
            navigate("/users");
        } catch (error) {
            message.error(error.response?.data?.message || "Failed to create user.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Card>
                <h1 style={{ textAlign: "center", marginBottom: 24 }}>Add New Store</h1>
                <Form
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Row gutter={16}>
                        <Col
                            xs={24}
                            md={12}
                        >
                            <Form.Item
                                label="Full Name"
                                name="full_name"
                                rules={[{ required: true, message: "Full name is required" }]}
                            >
                                <Input placeholder="Enter full name" />
                            </Form.Item>
                        </Col>
                        <Col
                            xs={24}
                            md={12}
                        >
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, type: "email", message: "Valid email is required" }]}
                            >
                                <Input placeholder="Enter email" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col
                            xs={24}
                            md={12}
                        >
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: "Password is required" }]}
                            >
                                <Input.Password placeholder="Enter password" />
                            </Form.Item>
                        </Col>
                        <Col
                            xs={24}
                            md={12}
                        >
                            <Form.Item
                                label="Role"
                                name="role"
                                rules={[{ required: true, message: "Role is required" }]}
                            >
                                <Select placeholder="Select role">
                                    <Option value="admin">Admin</Option>
                                    <Option value="user">User</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <div className="flex justify-end gap-4">
                        <Form.Item>
                            <Button
                                // type="primary"
                                htmlType="cancel"
                                block
                                loading={loading}
                                onClick={() => navigate("/stores")}
                            >
                                cancel
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                loading={loading}
                            >
                                Create Store
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </Card>
        </div>
    );
}

import React, { useState } from "react";
import { Form, Input, Button, Card, Upload, message, Image } from "antd";
import { SaveOutlined, ArrowLeftOutlined, UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import api from "@/utils/api";

const { TextArea } = Input;

const NewBrand = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const brandData = {
                ...values,
                logoImage: imageUrl,
            };

            await api.post("/brands", brandData);
            message.success("Brand created successfully!");
            navigate("/brands");
        } catch (error) {
            message.error(error.response?.data?.message || "Failed to create brand");
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = (info) => {
        if (info.file.status === "done") {
            setImageUrl(info.file.response?.url || "");
            message.success("Logo uploaded successfully");
        } else if (info.file.status === "error") {
            message.error("Logo upload failed");
        }
    };

    return (
        <Card>
            <div className="flex items-center justify-between mb-6">
                <h1 className="title">Create New Brand</h1>
                <Button
                    icon={<ArrowLeftOutlined />}
                    onClick={() => navigate("/brands")}
                >
                    Back to Brands
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
                            name="brandName"
                            label="Brand Name"
                            rules={[{ required: true, message: "Brand name is required" }]}
                        >
                            <Input placeholder="Enter brand name" />
                        </Form.Item>

                        <Form.Item
                            name="brandCode"
                            label="Brand Code"
                            rules={[{ required: true, message: "Brand code is required" }]}
                        >
                            <Input placeholder="Enter brand code" />
                        </Form.Item>

                        <Form.Item
                            name="description"
                            label="Description"
                        >
                            <TextArea rows={4} placeholder="Enter brand description" />
                        </Form.Item>
                    </div>

                    {/* Logo Upload */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Brand Logo</h3>

                        <Form.Item
                            name="logoImage"
                            label="Logo Image"
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
                                            alt="Brand Logo"
                                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                        />
                                    </div>
                                ) : (
                                    <div>
                                        <UploadOutlined />
                                        <div style={{ marginTop: 8 }}>Upload Logo</div>
                                    </div>
                                )}
                            </Upload>
                        </Form.Item>

                        {imageUrl && (
                            <div className="text-sm text-gray-500">
                                Logo uploaded successfully
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-end space-x-4 mt-6">
                    <Button onClick={() => navigate("/brands")}>
                        Cancel
                    </Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        icon={<SaveOutlined />}
                    >
                        Create Brand
                    </Button>
                </div>
            </Form>
        </Card>
    );
};

export default NewBrand; 
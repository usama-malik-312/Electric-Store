import React, { useEffect, useState } from "react";
import { Table, Card, Button, Space, Popconfirm, message, Tag, Input, Image } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import api from '@/utils/api';

const { Search } = Input;

export default function Brands() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [brands, setBrands] = useState([]);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
    const [filter, setFilter] = useState({ page: 1, limit: 10, search: '' });

    // Fetch brands with filters
    const getBrands = async (filterObj = filter) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get('/brands', { params: filterObj });
            setBrands(response.data?.data || []);
            setPagination({
                current: filterObj.page,
                pageSize: filterObj.limit,
                total: response.data?.total || 0,
            });
        } catch (error) {
            setError(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    // Handle table pagination/filter change
    const handleTableChange = (pagination) => {
        const newFilter = {
            ...filter,
            page: pagination.current,
            limit: pagination.pageSize,
        };
        setFilter(newFilter);
        getBrands(newFilter);
    };

    // Handle search
    const handleSearch = (value) => {
        const newFilter = { ...filter, search: value, page: 1 };
        setFilter(newFilter);
        getBrands(newFilter);
    };

    // Handle row click for editing
    const handleRowClick = (record) => {
        navigate(`/brands/${record.id}/edit`);
    };

    // Handle delete brand
    const handleDelete = async (brandId) => {
        try {
            await api.delete(`/brands/${brandId}`);
            message.success("Brand deleted successfully!");
            getBrands();
        } catch (error) {
            message.error(error.response?.data?.message || "Failed to delete brand");
        }
    };

    useEffect(() => {
        getBrands(filter);
        // eslint-disable-next-line
    }, []);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 80,
        },
        {
            title: 'Logo',
            dataIndex: 'logoImage',
            key: 'logoImage',
            width: 100,
            render: (logoImage) => (
                logoImage ? (
                    <Image
                        src={logoImage}
                        alt="Brand Logo"
                        width={50}
                        height={50}
                        style={{ objectFit: 'contain' }}
                        fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RnG4W+FgYxN"
                    />
                ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs">
                        No Logo
                    </div>
                )
            ),
        },
        {
            title: 'Brand Code',
            dataIndex: 'brandCode',
            key: 'brandCode',
            width: 120,
        },
        {
            title: 'Brand Name',
            dataIndex: 'brandName',
            key: 'brandName',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true,
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 120,
            render: (_, record) => (
                <Space size="small">
                    <Button
                        type="text"
                        icon={<EyeOutlined />}
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/brands/${record.id}`);
                        }}
                        title="View"
                    />
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/brands/${record.id}/edit`);
                        }}
                        title="Edit"
                    />
                    <Popconfirm
                        title="Are you sure you want to delete this brand?"
                        onConfirm={(e) => {
                            e.stopPropagation();
                            handleDelete(record.id);
                        }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            type="text"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={(e) => e.stopPropagation()}
                            title="Delete"
                        />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <Card>
            <div className="flex items-center justify-between mb-6">
                <h1 className="title">Brands</h1>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => navigate("/new-brand")}
                >
                    Create Brand
                </Button>
            </div>

            <div className="mb-4">
                <Search
                    placeholder="Search brands by name or code"
                    allowClear
                    enterButton={<SearchOutlined />}
                    size="large"
                    onSearch={handleSearch}
                    style={{ maxWidth: 400 }}
                />
            </div>

            <Table
                columns={columns}
                dataSource={brands}
                rowKey="id"
                loading={loading}
                pagination={{
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                    total: pagination.total,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) =>
                        `${range[0]}-${range[1]} of ${total} brands`,
                }}
                onChange={handleTableChange}
                onRow={(record) => ({
                    onClick: () => handleRowClick(record),
                    style: { cursor: 'pointer' },
                })}
                scroll={{ x: 800 }}
            />

            {error && <p style={{ color: 'red', marginTop: 16 }}>Error: {error}</p>}
        </Card>
    );
} 
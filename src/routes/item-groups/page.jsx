import React, { useEffect, useState } from "react";
import { Table, Card, Button, Space, Popconfirm, message, Tag, Input } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import api from '@/utils/api';

const { Search } = Input;

export default function ItemGroups() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [itemGroups, setItemGroups] = useState([]);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
    const [filter, setFilter] = useState({ page: 1, limit: 10, search: '' });

    // Fetch item groups with filters
    const getItemGroups = async (filterObj = filter) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get('/item-groups', { params: filterObj });
            setItemGroups(response.data?.data || []);
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
        getItemGroups(newFilter);
    };

    // Handle search
    const handleSearch = (value) => {
        const newFilter = { ...filter, search: value, page: 1 };
        setFilter(newFilter);
        getItemGroups(newFilter);
    };

    // Handle row click for editing
    const handleRowClick = (record) => {
        navigate(`/item-groups/${record.id}/edit`);
    };

    // Handle delete item group
    const handleDelete = async (itemGroupId) => {
        try {
            await api.delete(`/item-groups/${itemGroupId}`);
            message.success("Item Group deleted successfully!");
            getItemGroups();
        } catch (error) {
            message.error(error.response?.data?.message || "Failed to delete item group");
        }
    };

    useEffect(() => {
        getItemGroups(filter);
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
            title: 'Group Code',
            dataIndex: 'groupCode',
            key: 'groupCode',
            width: 120,
        },
        {
            title: 'Group Name',
            dataIndex: 'groupName',
            key: 'groupName',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status === 'active' ? 'green' : 'red'}>
                    {status?.toUpperCase()}
                </Tag>
            ),
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
                            navigate(`/item-groups/${record.id}`);
                        }}
                        title="View"
                    />
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/item-groups/${record.id}/edit`);
                        }}
                        title="Edit"
                    />
                    <Popconfirm
                        title="Are you sure you want to delete this item group?"
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
                <h1 className="title">Item Groups</h1>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => navigate("/new-item-group")}
                >
                    Create Item Group
                </Button>
            </div>

            <div className="mb-4">
                <Search
                    placeholder="Search item groups by name or code"
                    allowClear
                    enterButton={<SearchOutlined />}
                    size="large"
                    onSearch={handleSearch}
                    style={{ maxWidth: 400 }}
                />
            </div>

            <Table
                columns={columns}
                dataSource={itemGroups}
                rowKey="id"
                loading={loading}
                pagination={{
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                    total: pagination.total,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) =>
                        `${range[0]}-${range[1]} of ${total} item groups`,
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
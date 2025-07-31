import React, { useEffect, useState } from "react";
import { Table, Card, Button, Space, Popconfirm, message, Tag } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import api from '@/utils/api';

export default function Users() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 3, total: 0 });
    const [filter, setFilter] = useState({ page: 1, limit: 3 });

    // Fetch users with filters (pagination, etc.)
    const getUsers = async (filterObj = filter) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get('/users', { params: filterObj });
            setUsers(response.data?.data || []);
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
        getUsers(newFilter);
    };

    // Handle row click for editing
    const handleRowClick = (record) => {
        navigate(`/users/${record.id}/edit`);
    };

    // Handle delete user
    const handleDelete = async (userId) => {
        try {
            await api.delete(`/users/${userId}`);
            message.success("User deleted successfully!");
            getUsers(); // Refresh the list
        } catch (error) {
            message.error(error.response?.data?.message || "Failed to delete user");
        }
    };

    useEffect(() => {
        getUsers(filter);
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
            title: 'Full Name',
            dataIndex: 'fullName',
            key: 'fullName',
            render: (text, record) => (
                <div className="flex items-center space-x-2">
                    {record.profileImage && (
                        <img
                            src={record.profileImage}
                            alt="profile"
                            className="w-8 h-8 rounded-full object-cover"
                        />
                    )}
                    <span>{text}</span>
                </div>
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Role',
            dataIndex: 'userRole',
            key: 'userRole',
            render: (role) => (
                <Tag color={
                    role === 'admin' ? 'red' :
                        role === 'manager' ? 'blue' :
                            role === 'staff' ? 'green' : 'orange'
                }>
                    {role?.toUpperCase()}
                </Tag>
            ),
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
                            navigate(`/users/${record.id}`);
                        }}
                        title="View"
                    />
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/users/${record.id}/edit`);
                        }}
                        title="Edit"
                    />
                    <Popconfirm
                        title="Are you sure you want to delete this user?"
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
                <h1 className="title">Users</h1>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => navigate("/new-user")}
                >
                    Create User
                </Button>
            </div>

            <Table
                columns={columns}
                dataSource={users}
                rowKey="id"
                loading={loading}
                pagination={{
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                    total: pagination.total,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) =>
                        `${range[0]}-${range[1]} of ${total} users`,
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
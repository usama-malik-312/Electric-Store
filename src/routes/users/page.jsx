import React, { useEffect, useState } from "react";
import { Table, Card, Button, Space, Popconfirm, message, Tag, Input } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from '@/utils/api';

const { Search } = Input;

export default function Users() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
    const [filter, setFilter] = useState({ page: 1, limit: 10, search: '' });

    // Fetch users with filters
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

    // Handle search
    const handleSearch = (value) => {
        const newFilter = { ...filter, search: value, page: 1 };
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
            message.success(t('messages.deletedSuccessfully'));
            getUsers();
        } catch (error) {
            message.error(error.response?.data?.message || t('messages.failedToDelete'));
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
            title: t('users.fullName'),
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
            title: t('users.email'),
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: t('users.phoneNumber'),
            dataIndex: 'phoneNumber',
            key: 'phoneNumber'
        },
        {
            title: t('users.userRole'),
            dataIndex: 'userRole',
            key: 'userRole',
            render: (role) => (
                <Tag color={role === 'admin' ? 'red' : role === 'manager' ? 'blue' : role === 'staff' ? 'green' : 'orange'}>
                    {t(`users.${role}`)}
                </Tag>
            ),
        },
        {
            title: t('common.status'),
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status === 'active' ? 'green' : 'red'}>
                    {t(`common.${status}`)}
                </Tag>
            ),
        },
        {
            title: t('common.actions'),
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
                        title={t('common.view')}
                    />
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/users/${record.id}/edit`);
                        }}
                        title={t('common.edit')}
                    />
                    <Popconfirm
                        title={`${t('messages.confirmDelete')} ${t('users.title').toLowerCase()}?`}
                        onConfirm={(e) => {
                            e.stopPropagation();
                            handleDelete(record.id);
                        }}
                        okText={t('common.yes')}
                        cancelText={t('common.no')}
                    >
                        <Button
                            type="text"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={(e) => e.stopPropagation()}
                            title={t('common.delete')}
                        />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <Card className="card">
            <div className="flex items-center justify-between mb-6">
                <h1 className="title">{t('users.title')}</h1>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => navigate("/new-user")}
                >
                    {t('users.createUser')}
                </Button>
            </div>

            <div className="mb-4">
                <Search
                    placeholder={t('common.search')}
                    allowClear
                    enterButton={<SearchOutlined />}
                    size="large"
                    onSearch={handleSearch}
                    style={{ maxWidth: 400 }}
                />
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
                        `${range[0]}-${range[1]} of ${total} ${t('users.title').toLowerCase()}`,
                }}
                onChange={handleTableChange}
                onRow={(record) => ({
                    onClick: () => handleRowClick(record),
                    style: { cursor: 'pointer' },
                })}
                scroll={{ x: 800 }}
            />

            {error && <p style={{ color: 'red', marginTop: 16 }}>{t('common.error')}: {error}</p>}
        </Card>
    );
} 
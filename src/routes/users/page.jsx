import { useEffect, useState } from "react";
import { Table, Card, Button } from "antd";
import api from "@/utils/api";
import { useNavigate } from "react-router-dom";

export default function Users() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 3, total: 0 });
    const [filter, setFilter] = useState({ page: 1, limit: 3 });
    const navigate = useNavigate();

    // Fetch users with filters (pagination, etc.)
    const getUsers = async (filterObj = filter) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get("/users", { params: filterObj });
            // Adjust if your backend returns a different structure
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

    useEffect(() => {
        getUsers(filter);
        // eslint-disable-next-line
    }, []);

    const columns = [
        { title: "ID", dataIndex: "id", key: "id" },
        { title: "Full Name", dataIndex: "full_name", key: "full_name" },
        { title: "Email", dataIndex: "email", key: "email" },
        { title: "Role", dataIndex: "role", key: "role" },
        // Add more columns as needed
    ];

    return (
        <Card>
            <h1 className="title">Users</h1>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
                <Button
                    type="primary"
                    onClick={() => navigate("/new-user")}
                >
                    Add New User
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
                }}
                onChange={handleTableChange}
            />
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
        </Card>
    );
}

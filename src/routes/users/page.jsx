import React, { useEffect, useState } from "react";
import { apiService } from '@/services/api';
import api from '@/utils/api';


export default function Users() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);

    // Get all users
    const getUsers = async () => {
        console.log("getUsers function called");
        setLoading(true);
        setError(null);

        try {
            console.log("Making API call to get users...");
            // Call API directly
            // const response = await api.get('/users');
            const response = await api.get('/users');
            console.log("users======", response.data);
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
            console.error("Error details:", error.response?.data);
            setError(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    // Call getUsers when component mounts
    useEffect(() => {
        console.log("Users component mounted, calling getUsers...");
        getUsers();
    }, []);

    console.log("Users component rendering, loading:", loading, "error:", error);

    return (
        <div>
            <h1 className="title">Users</h1>
            {loading && <p>Loading users...</p>}
            {error && <p>Error: {error}</p>}
            {users?.length > 0 && (
                <div>
                    <h2>Users List:</h2>
                    <pre>{JSON.stringify(users, null, 2)}</pre>
                </div>
            )}
        </div>
    );
} 
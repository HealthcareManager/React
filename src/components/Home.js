import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserList from './UserList'; // 引入 UserList 組件
import styles from '../styles/HomePage.module.css'; // 如果有特定的樣式，可以創建此文件

function HomePage() {
    const [usersData, setUsersData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsersData();
    }, []);

    const fetchUsersData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/api/admin/users-data', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            // 將 response.data 的值提取為數組
            const formattedUsersData = Object.values(response.data);
            setUsersData(formattedUsersData);
        } catch (error) {
            console.error('Error fetching users data:', error);
            alert('Error fetching users data: ' + (error.response ? error.response.data : error.message));
        } finally {
            setLoading(false);
        }
    };

    const handleUserClick = (userId) => {
        console.log("Navigating to user data page with userId:", userId);
        navigate(`/user-data/${userId}`);
    };

    return (
        <div>
            <div className={styles.bodyDiv}>
                {loading ? (
                    <div className={styles.loading}>Loading...</div>
                ) : (
                    <UserList users={usersData} onUserClick={handleUserClick} />
                )}
            </div>
        </div>
    );
}

export default HomePage;

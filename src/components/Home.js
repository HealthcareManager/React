import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserList from './UserList'; // 引入 UserList 組件
import styles from '../styles/HomePage.module.css'; // 如果有特定的樣式，可以創建此文件

function HomePage() {
    const [usersData, setUsersData] = useState([]);  // 保存用戶數據
    const [loading, setLoading] = useState(true);  // 是否加載中的標誌
    const navigate = useNavigate();  // 用來導航到不同頁面的函數

    useEffect(() => {
        fetchUsersData();  // 在組件渲染時調用獲取用戶數據的函數
    }, []);

    // 從後端獲取用戶數據的函數
    const fetchUsersData = async () => {
        try {
            const token = localStorage.getItem('token');  // 從本地存儲中獲取 JWT token
            const response = await axios.get('http://localhost:8080/api/admin/users-data', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const formattedUsersData = Object.values(response.data);  // 將返回的數據格式化為數組
            setUsersData(formattedUsersData);  // 設置用戶數據
        } catch (error) {
            console.error('Error fetching users data:', error);
            alert('Error fetching users data: ' + (error.response ? error.response.data : error.message));
        } finally {
            setLoading(false);  // 結束加載
        }
    };

    // 更改角色的處理函數
    const handleRoleChange = async (userId, newRole) => {
        try {
            const token = localStorage.getItem('token');
            // 發送更新角色的請求到後端 API
            const response = await axios.put(`http://localhost:8080/api/admin/update/role/${userId}`, 
            { role: newRole }, 
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                // 如果成功，更新本地的用戶數據
                setUsersData(usersData.map(user => 
                    user.id === userId ? { ...user, role: newRole } : user
                ));
            } else {
                console.error('Failed to update role');
            }
        } catch (error) {
            console.error('Error updating role:', error);
            alert('Error updating role: ' + (error.response ? error.response.data : error.message));
        }
    };

    // 當用戶被點擊時的處理函數，導航到詳細頁面
    const handleUserClick = (userId) => {
        console.log("Navigating to user data page with userId:", userId);
        navigate(`/user-data/${userId}`);
    };

    return (
        <div>
            <div className={styles.bodyDiv}>
                {loading ? (
                    <div className={styles.loading}>Loading...</div>  // 顯示加載中的狀態
                ) : (
                    <UserList 
                        users={usersData}  // 將用戶數據傳遞給 UserList 子組件
                        onUserClick={handleUserClick}  // 當用戶點擊時調用的函數
                        onRoleChange={handleRoleChange}  // 傳遞角色更改處理函數
                    />
                )}
            </div>
        </div>
    );
}

export default HomePage;

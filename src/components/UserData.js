import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/UserData.module.css';

function UserData({ userId }) {
    const [userData, setUserData] = useState(null);
    const [userHabits, setUserHabits] = useState(null);
    const [healthChecks, setHealthChecks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8080/api/admin/user-data/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Cache-Control': 'no-cache',
                        'Pragma': 'no-cache',
                    },
                });
                const data = response.data;
                setUserData(data[0]);  // 假設第一個是 userData
                setUserHabits(data[1]);  // 假設第二個是 userHabits
                setHealthChecks(data[2]); // 假設第三個是 healthChecks
            } catch (error) {
                alert('Error fetching user data: ' + (error.response ? error.response.data : error.message));
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchUserData();
        }
    }, [userId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.userDataContainer}>
            {/* Basic Information Section */}
            <div className={styles.basicInfo}>
                <h2>基本資料</h2>
                {userData && (
                    <ul>
                        <li>ID: {userData.id}</li>
                        <li>Username: {userData.username}</li>
                        <li>Email: {userData.email}</li>
                        <li>Date of Birth: {userData.dateOfBirth}</li>
                        <li>Height: {userData.height} cm</li>
                        <li>Weight: {userData.weight} kg</li>
                        <li>Gender: {userData.gender}</li>
                        <li>Phone Number: {userData.phoneNumber}</li>
                        <li>Role: {userData.role}</li>
                        <li>Account Locked: {userData.accountLocked ? '是' : '否'}</li>
                    </ul>
                )}
            </div>

            {/* Habits Section */}
            <div className={styles.habits}>
                <h2>習慣</h2>
                {userHabits && (
                    <ul>
                        <li>Alcohol: {userHabits.alcohol ? '是' : '否'}</li>
                        <li>Cigarette: {userHabits.cigarette ? '是' : '否'}</li>
                        <li>Areca: {userHabits.areca ? '是' : '否'}</li>
                    </ul>
                )}
            </div>

            {/* Health Check Section */}
            <div className={styles.healthChecks}>
                <h2>最近的健康檢查</h2>
                {healthChecks.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>日期</th>
                                <th>心率</th>
                                <th>血壓</th>
                                <th>血糖</th>
                                <th>血氧</th>
                                <th>燃燒的卡路里</th>
                                <th>睡眠時長</th>
                            </tr>
                        </thead>
                        <tbody>
                            {healthChecks.map((check) => (
                                <tr key={check.id}>
                                    <td>{check.date}</td>
                                    <td>{check.heartRate}</td>
                                    <td>{check.bloodPressure}</td>
                                    <td>{check.bloodSugar}</td>
                                    <td>{check.bloodOxygen}</td>
                                    <td>{check.caloriesBurned}</td>
                                    <td>{check.sleepDuration} 小時</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>沒有健康檢查記錄</p>
                )}
            </div>
        </div>
    );
}

export default UserData;




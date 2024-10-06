import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/UserData.module.css';

function UserData({ userId }) {
    const [userData, setUserData] = useState(null);
    const [userHabits, setUserHabits] = useState(null);
    const [healthChecks, setHealthChecks] = useState([]);
    const [exercises, setExercises] = useState([]);
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
                setUserHabits(data[1] || []);  // 假設第二個是 userHabits
                setExercises(data[2] || []); // 假設第三個是 exercises
                setHealthChecks(data[3] || []); // 假設第四個是 healthChecks
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
        return <div><h1>Loading...</h1></div>;
    }

    return (
        <div className={styles.userDataContainer}>
            {/* Basic Information Section */}
            <div className={styles.basicInfo}>
                <h2>基本資料</h2>
                {userData ? (
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
                ) : (
                    <p>沒有基本資料記錄</p>
                )}
            </div>

            {/* Habits Section */}
            <div className={styles.habits}>
                <h2>習慣</h2>
                {userHabits ? (
                    <ul>
                        <li>Alcohol: {userHabits.alcohol ? '是' : '否'}</li>
                        <li>Cigarette: {userHabits.cigarette ? '是' : '否'}</li>
                        <li>Areca: {userHabits.areca ? '是' : '否'}</li>
                    </ul>
                ) : (
                    <p>沒有習慣記錄</p>
                )}
            </div>

            {/* Exercise Section */}
            <div className={styles.exercises}>
                <h2>運動記錄</h2>
                {exercises.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>運動類型</th>
                                <th>時長</th>
                                <th>燃燒的卡路里</th>
                                <th>公里數</th>
                                <th>日期</th>
                            </tr>
                        </thead>
                        <tbody>
                            {exercises.map((exercise) => (
                                <tr key={exercise.id}>
                                    <td>{exercise.exerciseType}</td>
                                    <td>{exercise.duration} 分鐘</td>
                                    <td>{exercise.caloriesBurned} 卡路里</td>
                                    <td>{exercise.kilometers} 公里</td>
                                    <td>{exercise.createdAt}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>沒有運動記錄</p>
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





import React from 'react';
import styles from '../styles/UserList.module.css';

function UserList({ users, onUserClick }) {
    if (!users.length) return <div>Loading...</div>;

    return (
        <div className={styles.userList}>
            <h2>用戶列表</h2>
            <table className={styles.userTable}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Phone Number</th>
                        <th>Date of Birth</th>
                        <th>Gender</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} onClick={() => onUserClick(user.id)}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.password}</td>
                            <td>{user.phoneNumber}</td>
                            <td>{user.dateOfBirth}</td>
                            <td>{user.gender}</td>
                            <td>{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserList;

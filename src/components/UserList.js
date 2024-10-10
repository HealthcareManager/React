import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from '../styles/UserList.module.css';

// 為 Modal 設置 App 元素
Modal.setAppElement('#root');

function UserList({ users, onUserClick, onRoleChange }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [newRole, setNewRole] = useState('');

    if (!users.length) return <div>Loading...</div>;

    const handleRoleChangeClick = (userId, role) => {
        setSelectedUserId(userId);
        setNewRole(role);
        setIsModalOpen(true); // 打開 Modal
    };

    const confirmRoleChange = () => {
        onRoleChange(selectedUserId, newRole); // 呼叫父元件的函式來更新角色
        setIsModalOpen(false); // 關閉 Modal
    };

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
                        <tr key={user.id}>
                            <td onClick={() => onUserClick(user.id)}>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.password}</td>
                            <td>{user.phoneNumber}</td>
                            <td>{user.dateOfBirth}</td>
                            <td>{user.gender}</td>
                            <td>
                                <select 
                                    value={user.role} 
                                    onChange={(e) => handleRoleChangeClick(user.id, e.target.value)}
                                >
                                    <option value="USER">USER</option>
                                    <option value="ADMIN">ADMIN</option>
                                    <option value="VIP">VIP</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* React Modal */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                contentLabel="Confirm Role Change"
                className={styles.modal}
                overlayClassName={styles.overlay}
            >
                <h2>確認角色更改</h2>
                <p>確定要將用戶的角色更改為 <strong>{newRole}</strong> 嗎？</p>
                <button onClick={confirmRoleChange}>確認</button>
                <button onClick={() => setIsModalOpen(false)}>取消</button>
            </Modal>
        </div>
    );
}

export default UserList;




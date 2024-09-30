import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Login.module.css';
import { FaUser, FaLock } from "react-icons/fa";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/admin/admin-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                const { token, roles, imagelink, username } = data;

                localStorage.setItem('token', token);
                localStorage.setItem('roles', JSON.stringify(roles));
                localStorage.setItem('imagelink', imagelink);
                localStorage.setItem('username', username);

                navigate('/Home');
            } else {
                alert('Login failed: ' + data.message);
            }
        } catch (error) {
            alert('Error during login: ' + error.message);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <div className={styles.inputBox}>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <FaUser className={styles.icon} />
                    </div>
                    <div className={styles.inputBox}>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <FaLock className={styles.icon} />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;


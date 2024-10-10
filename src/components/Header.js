import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/Header.module.css';
import user_icon from '../assets/chatbot.png';

const Header = () => {

    const navigate = useNavigate();

    

    const handleLogout = () => {
        // 登出時清除 localStorage 並導向登入頁面
        localStorage.clear();
        navigate('/login');
    };

    

    return (
        <div className={styles.headerSTY}>
            {/* 導向首頁的 logo */}
            <Link to="/Home">
                <img src={user_icon} alt="Logo" className={styles.logo} />
            </Link>
            <div className={styles.header}>
            <ul className={styles.navList}>
                <li><a href="/Home">用戶管理</a></li>
            </ul>
        </div>
            <div className={styles['user-actions']}>
                <button onClick={handleLogout} className="btn btn-outline-secondary">👤 登出</button>
            </div>
        </div>
    );
};

export default Header;

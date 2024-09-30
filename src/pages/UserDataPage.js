import React from 'react';
import Header from '../components/Header'; 
import UserData from '../components/UserData'; 
import { useParams } from 'react-router-dom'; // Import useParams here

const UserDataPage = () => {
    const { userId } = useParams(); // 確保從路由中獲取 userId

    return (
        <div>
            <Header />
            <UserData userId={userId} /> {/* 確保傳遞 userId */}
        </div>
    )
}

export default UserDataPage;

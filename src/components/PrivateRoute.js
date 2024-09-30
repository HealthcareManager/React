import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
    const authHeader = localStorage.getItem('token'); // 从 localStorage 获取 token

    // 检查 token 是否存在
    const isTokenValid = authHeader !== null; // 只需检查 token 是否存在

    return isTokenValid ? element : <Navigate to="/Login" />;
};


export default PrivateRoute;

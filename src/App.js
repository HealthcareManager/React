import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserListPage from './pages/UserListPage';
import UserDataPage from './pages/UserDataPage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/Login" element={<LoginPage />} />
                <Route path="/Home" element={<PrivateRoute element={<HomePage />} />} />
                <Route path="/UserList" element={<PrivateRoute element={<UserListPage />} />} />
                <Route path="/user-data/:userId" element={<PrivateRoute element={<UserDataPage />} />} />
                <Route path="*" element={<h1>找不到頁面</h1>} />
            </Routes>
        </Router>
    );
}

export default App;

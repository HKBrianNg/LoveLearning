import { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './layout/MainLayout';
import { BrowserRouter as Router } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register'; // 记得导入
import ForgetPassword from './pages/ForgetPassword';
import Logoff from './pages/Logoff';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import ChangePassword from './pages/ChangePassword';
import Course from './pages/Course';
import CourseManage from './pages/CourseManage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'login':
        return <Login goHome={() => navigateTo('home')} goRegister={() => navigateTo('register')} />;
      case 'register':
        return <Register goLogin={() => navigateTo('login')} />;
      case 'forget':
        return <ForgetPassword goLogin={() => navigateTo('login')} />;
      case 'logoff':
        return <Logoff goHome={() => navigateTo('home')} />;
      case 'settings':
        return <Settings onNavigate={navigateTo} />;
      case 'profile':
        return <Profile goEdit={() => navigateTo('profileEdit')} />;
      case 'profileEdit':
        return <ProfileEdit goBack={() => navigateTo('profile')} />;
      case 'changePwd':
        return <ChangePassword goBack={() => navigateTo('settings')} />;
      case 'course':
        return <Course />;
      case 'courseManage':
        return <CourseManage goLogin={() => navigateTo('login')} />;
      default:
        return <Home />;
    }
  };

  return (
    <AuthProvider>
      <Router>
        <MainLayout onNavigate={navigateTo}>
          {renderPage()}
        </MainLayout>
      </Router>
    </AuthProvider>
  );
}
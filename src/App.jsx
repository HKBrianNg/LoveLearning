import { useState } from 'react';
import MainLayout from './layout/MainLayout';

// 页面导入
import Home from './pages/Home';
import Login from './pages/Login';
import ForgetPassword from './pages/ForgetPassword';
import Logoff from './pages/Logoff';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import ChangePassword from './pages/ChangePassword';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // 统一页面跳转函数
  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  // 渲染当前页面
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'login':
        return <Login goHome={() => navigateTo('home')} />;
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
      default:
        return <Home />;
    }
  };

  return (
    <MainLayout onNavigate={navigateTo}>
      {renderPage()}
    </MainLayout>
  );
}
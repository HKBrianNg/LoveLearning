import { useState } from 'react';
import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import ForgetPassword from './pages/ForgetPassword';
import Logoff from './pages/Logoff';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';

export default function App() {
  const [page, setPage] = useState('home');

  // 定义导航函数，解决 "handleNavigate is not defined" 报错
  const handleNavigate = (newPage) => {
    setPage(newPage);
  };

  // 根据当前 page 渲染不同页面
  const renderPage = () => {
    switch (page) {
      case 'home':
        return <Home goLogin={() => handleNavigate('login')} />;
      case 'login':
        return <Login goHome={() => handleNavigate('home')} />;
      case 'forget':
        return <ForgetPassword goLogin={() => handleNavigate('login')} />;
      case 'logoff':
        return <Logoff goHome={() => handleNavigate('home')} />;
      case 'settings':
        // 关键：给 Settings 组件传入 onNavigate
        return <Settings onNavigate={handleNavigate} />;
      case 'profile':
        return <Profile goEdit={() => handleNavigate('profileEdit')} />;
      case 'profileEdit':
        return <ProfileEdit goBack={() => handleNavigate('profile')} />;
      default:
        return <Home goLogin={() => handleNavigate('login')} />;
    }
  };

  return (
    <MainLayout onNavigate={handleNavigate}>
      {renderPage()}
    </MainLayout>
  );
}
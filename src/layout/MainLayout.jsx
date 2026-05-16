import { useState } from 'react';
import {
  Box, CssBaseline, AppBar, Drawer, Toolbar,
  IconButton, Menu, MenuItem, Divider, TextField,
  List, ListItem, ListItemIcon, ListItemText, Typography,
  Avatar // 新增：引入 Avatar 组件
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';

import { useLang } from '../context/LangContext';
import { useAuth } from '../context/AuthContext'; // 引入 Auth

const drawerWidth = 180;

export default function MainLayout({ children, onNavigate }) {
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [search, setSearch] = useState('');
  const { t } = useLang();
  const { user, logout } = useAuth(); // 获取用户信息和登出方法

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const goTo = (page) => {
    onNavigate(page);
    handleMenuClose();
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      alert(`${t.searchPlaceholder}: ${search}`);
      setSearch('');
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={() => setOpen(!open)} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>

          <Box sx={{ fontSize:20, fontWeight:'bold', color:'#fff' }}>
            Love Learning
          </Box>

          <TextField
            placeholder={t.searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
            variant="outlined"
            sx={{
              maxWidth: 450,
              ml: 4,
              backgroundColor: 'rgba(255,255,255,0.15)',
              borderRadius: '6px',
              '& .MuiInputBase-input': { color: '#fff' },
              '& .MuiInputBase-input::placeholder': { color: 'rgba(255,255,255,0.8)' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.6)' },
                '&.Mui-focused fieldset': { borderColor: '#fff' },
              },
            }}
          />

          <Box sx={{ flexGrow: 1 }} />

          {/* 右上角：登录显示头像+用户名，未登录显示默认图标 */}
          <IconButton color="inherit" onClick={handleMenuOpen} sx={{ display: 'flex', alignItems: 'center' }}>
            {user && user.avatar ? (
              // 显示用户自定义头像
              <Avatar
                  src={user.avatar ? `http://localhost:5000${user.avatar}` : ''}
                  sx={{ width: 40, height: 40, fontSize: 40 }}
                >
                  {user.nickname?.charAt(0) || user.username?.charAt(0)}
              </Avatar>
            ) : (
              // 未登录/无头像时显示默认图标
              <AccountCircle sx={{ fontSize: 28 }} />
            )}
            {user && (
              <Typography sx={{ ml: 1, fontWeight: 'bold' }}>
                {user.nickname || user.username}
              </Typography>
            )}
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {!user ? (
              // 未登录菜单
              <>
                <MenuItem onClick={() => goTo('home')}>{t.home}</MenuItem>
                <MenuItem onClick={() => goTo('login')}>{t.login}</MenuItem>
                <MenuItem onClick={() => goTo('forget')}>{t.forgetPwd}</MenuItem>
              </>
            ) : (
              // 已登录菜单
              <>
                <MenuItem onClick={() => goTo('home')}>{t.home}</MenuItem>
                <MenuItem onClick={() => goTo('profile')}>{t.profile}</MenuItem>
                <MenuItem onClick={() => goTo('settings')}>{t.settings}</MenuItem>
                <Divider />
                <MenuItem onClick={() => { logout(); goTo('logoff'); }}>
                  {t.logoff}
                </MenuItem>
              </>
            )}
          </Menu>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? drawerWidth : 60,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? drawerWidth : 60,
            transition: 'width 0.3s ease',
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <List>
          <ListItem button onClick={() => goTo('home')}>
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary={t.home} />
          </ListItem>

          <ListItem button onClick={() => goTo('course')}>
            <ListItemIcon><SchoolIcon /></ListItemIcon>
            <ListItemText primary={t.course} />
          </ListItem>

          {user && user.role === 'admin' && (
            <ListItem button onClick={() => goTo('courseManage')}>
              <ListItemIcon><SettingsIcon /></ListItemIcon>
              <ListItemText primary={t.courseManage} />
            </ListItem>
          )}
          
          {/* <ListItem button onClick={() => goTo('profile')}>
            <ListItemIcon><PersonIcon /></ListItemIcon>
            <ListItemText primary={t.profile} />
          </ListItem>

          <ListItem button onClick={() => goTo('settings')}>
            <ListItemIcon><SettingsIcon /></ListItemIcon>
            <ListItemText primary={t.settings} />
          </ListItem> */}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, minHeight: '100vh' }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
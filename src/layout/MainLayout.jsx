import { useState } from 'react';
import {
  Box,
  CssBaseline,
  AppBar,
  Drawer,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Divider
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

const drawerWidth = 240;

export default function MainLayout({ children, onNavigate }) {
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  // 菜单跳转
  const goTo = (page) => {
    onNavigate(page);
    handleMenuClose();
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* 顶部导航 */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={() => setOpen(!open)} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Love Learning
          </Typography>

          {/* 用户菜单 */}
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <AccountCircle />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={() => goTo('home')}>首页 Home</MenuItem>
            <MenuItem onClick={() => goTo('login')}>登录 Login</MenuItem>
            <MenuItem onClick={() => goTo('forget')}>忘记密码</MenuItem>
            <Divider />
            <MenuItem onClick={() => goTo('logoff')}>退出 Logoff</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* 侧边栏 */}
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? drawerWidth : 60,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? drawerWidth : 60,
            transition: 'width 0.3s',
            boxSizing: 'border-box'
          }
        }}
      >
        <Toolbar />
        <Box sx={{ px: 2, py: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>主菜单</Typography>
          <Typography sx={{ my: 1 }}>首页</Typography>
          <Typography sx={{ my: 1 }}>课程</Typography>
          <Typography sx={{ my: 1 }}>设置</Typography>
        </Box>
      </Drawer>

      {/* 内容区 */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
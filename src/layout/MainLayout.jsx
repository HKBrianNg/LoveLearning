import { useState } from 'react';
import {
  Box, CssBaseline, AppBar, Drawer, Toolbar,
  IconButton, Menu, MenuItem, Divider, TextField,
  List, ListItem, ListItemIcon, ListItemText
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';

// 引入全局语言
import { useLang } from '../context/LangContext';
// 引入本地Logo图片
import Logo from '../assets/logo.png';

const drawerWidth = 240;

export default function MainLayout({ children, onNavigate }) {
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [search, setSearch] = useState('');

  // 多语言文案
  const { t } = useLang();

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const goTo = (page) => {
    onNavigate(page);
    handleMenuClose();
  };

  // 搜索回车事件
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      alert(`${t.searchPlaceholder}: ${search}`);
      setSearch('');
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* 顶部导航栏 */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          {/* 侧边栏展开/收起按钮 */}
          <IconButton color="inherit" edge="start" onClick={() => setOpen(!open)} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>

          {/* 自定义Logo 替代文字标题 */}
          <img
            src={Logo}
            alt="Love Learning"
            style={{
              height: 60,
              marginRight: 24,
              objectFit: 'contain'
            }}
          />

          {/* 搜索框：白色文字 + 靠右 + 多语言占位符 */}
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
              '& .MuiInputBase-input': {
                color: '#fff',
              },
              '& .MuiInputBase-input::placeholder': {
                color: 'rgba(255,255,255,0.8) !important',
                opacity: 1,
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.6)' },
                '&.Mui-focused fieldset': { borderColor: '#fff' },
              },
            }}
          />

          <Box sx={{ flexGrow: 1 }} />

          {/* 右上角用户菜单 */}
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <AccountCircle sx={{ fontSize: 28 }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => goTo('home')}>{t.home}</MenuItem>
            <MenuItem onClick={() => goTo('login')}>{t.login}</MenuItem>
            <MenuItem onClick={() => goTo('forget')}>{t.forgetPwd}</MenuItem>
            <Divider />
            <MenuItem onClick={() => goTo('logoff')}>{t.logoff}</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* 侧边栏菜单 */}
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

          <ListItem button>
            <ListItemIcon><SchoolIcon /></ListItemIcon>
            <ListItemText primary={t.course} />
          </ListItem>

          <ListItem button onClick={() => goTo('profile')}>
            <ListItemIcon><PersonIcon /></ListItemIcon>
            <ListItemText primary={t.profile} />
          </ListItem>

          <ListItem button onClick={() => goTo('settings')}>
            <ListItemIcon><SettingsIcon /></ListItemIcon>
            <ListItemText primary={t.settings} />
          </ListItem>
        </List>
      </Drawer>

      {/* 主内容区域 */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
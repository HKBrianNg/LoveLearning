import { useState, useEffect } from 'react';
import {
  Box, Typography, TextField, Avatar, Paper
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LangContext';

export default function Profile() {
  const { t } = useLang();
  const { user } = useAuth();
  const [form, setForm] = useState({
    nickname: '',
    bio: '',
    gender: '',
    phone: '',
    email: ''
  });

  // 加载用户资料
  useEffect(() => {
    if (user) {
      setForm({
        nickname: user.nickname || '',
        bio: user.bio || '',
        gender: user.gender || '',
        phone: user.phone || '',
        email: user.email || ''
      });
    }
  }, [user]);

  if (!user) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6">请先登录</Typography>
      </Box>
    );
  }

  return (
    <Paper sx={{ maxWidth: 600, mx: 'auto', p: 4, mt: 4 }}>
      <Typography variant="h5" mb={4}>
        {t.profile || '个人资料'}
      </Typography>

      {/* 头像显示 */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <Avatar
          src={user.avatar ? `http://localhost:5000${user.avatar}` : ''}
          sx={{ width: 100, height: 100, fontSize: 40 }}
        >
          {user.nickname?.charAt(0) || user.username?.charAt(0)}
        </Avatar>
      </Box>

      {/* 只读表单 */}
      <TextField
        fullWidth
        label={t.nickname || '昵称'}
        value={form.nickname}
        InputProps={{ readOnly: true }}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label={t.bio || '简介'}
        value={form.bio}
        InputProps={{ readOnly: true }}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label={t.gender || '性别'}
        value={form.gender}
        InputProps={{ readOnly: true }}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label={t.phone || '电话'}
        value={form.phone}
        InputProps={{ readOnly: true }}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label={t.email || '邮箱'}
        value={form.email}
        InputProps={{ readOnly: true }}
        sx={{ mb: 2 }}
      />
    </Paper>
  );
}
import { useState, useEffect } from 'react';
import {
  Box, Typography, TextField, Button, Avatar
} from '@mui/material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LangContext';

export default function ProfileEdit() {
  const { t } = useLang();
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({
    nickname: '',
    bio: '',
    gender: '',
    phone: '',
    email: ''
  });

  // 初始化用户资料
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

  // 上传头像
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const res = await axios.post(
        'http://localhost:5000/api/upload/avatar',
        formData,
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        }
      );

      if (res.data.code === 200) {
        const newUser = { ...user, avatar: res.data.avatar };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        alert('头像上传成功！');
      }
    } catch (err) {
      console.error(err);
      alert('头像上传失败');
    }
  };

  // 保存资料
  const saveProfile = async () => {
    try {
      await axios.post(
        'http://localhost:5000/api/user/profile',
        form,
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        }
      );

      const newUser = { ...user, ...form };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      alert(t.saveSuccess || '保存成功');
    } catch (err) {
      console.error(err);
      alert('保存失败');
    }
  };

  if (!user) return <Box sx={{ p: 3 }}>请先登录</Box>;

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 3 }}>
      <Typography variant="h5" mb={3}>
        {t.editProfile || '编辑个人资料'}
      </Typography>

      {/* 头像区域 */}
      <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar
          src={user.avatar ? `http://localhost:5000${user.avatar}` : ''}
          sx={{ width: 100, height: 100, fontSize: 40 }}
        >
          {user.nickname?.charAt(0) || user.username?.charAt(0)}
        </Avatar>

        <Button variant="outlined" sx={{ mt: 2 }} component="label">
          更换头像
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleAvatarChange}
          />
        </Button>
      </Box>

      {/* 表单 */}
      <TextField
        fullWidth
        label={t.nickname || '昵称'}
        value={form.nickname}
        sx={{ mb: 2 }}
        onChange={(e) => setForm({ ...form, nickname: e.target.value })}
      />
      <TextField
        fullWidth
        label={t.bio || '简介'}
        value={form.bio}
        sx={{ mb: 2 }}
        onChange={(e) => setForm({ ...form, bio: e.target.value })}
      />
      <TextField
        fullWidth
        label={t.gender || '性别'}
        value={form.gender}
        sx={{ mb: 2 }}
        onChange={(e) => setForm({ ...form, gender: e.target.value })}
      />
      <TextField
        fullWidth
        label={t.phone || '电话'}
        value={form.phone}
        sx={{ mb: 2 }}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />
      <TextField
        fullWidth
        label={t.email || '邮箱'}
        value={form.email}
        sx={{ mb: 3 }}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <Button variant="contained" fullWidth onClick={saveProfile}>
        {t.save || '保存'}
      </Button>
    </Box>
  );
}
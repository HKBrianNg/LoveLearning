import { useState } from 'react';
import {
  Box, Typography, Card, CardContent, TextField,
  Button, Avatar, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { useLang } from '../context/LangContext';

export default function ProfileEdit({ goBack }) {
  const { t } = useLang();

  // 模拟用户数据
  const [form, setForm] = useState({
    nickname: "张三",
    bio: "热爱学习，每天进步一点点",
    gender: "male",
    phone: "13800138000",
    email: "test@example.com"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    alert(t.saveSuccess);
    goBack();
  };

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 4 }}>
      <Card>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" mb={3}>
            {t.editProfile}
          </Typography>

          {/* 头像 */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <Avatar sx={{ width: 100, height: 100 }}>
              {form.nickname.charAt(0)}
            </Avatar>
          </Box>
          <Button fullWidth sx={{ mb: 3 }}>
            {t.avatar}
          </Button>

          {/* 昵称 */}
          <TextField
            fullWidth
            label={t.nickname}
            name="nickname"
            value={form.nickname}
            onChange={handleChange}
            margin="normal"
          />

          {/* 简介 */}
          <TextField
            fullWidth
            multiline rows={3}
            label={t.bio}
            name="bio"
            value={form.bio}
            onChange={handleChange}
            margin="normal"
          />

          {/* 性别 */}
          <FormControl fullWidth margin="normal">
            <InputLabel>{t.gender}</InputLabel>
            <Select
              name="gender"
              value={form.gender}
              label={t.gender}
              onChange={handleChange}
            >
              <MenuItem value="male">{t.male}</MenuItem>
              <MenuItem value="female">{t.female}</MenuItem>
              <MenuItem value="secret">{t.secret}</MenuItem>
            </Select>
          </FormControl>

          {/* 手机 */}
          <TextField
            fullWidth
            label={t.phone}
            name="phone"
            value={form.phone}
            onChange={handleChange}
            margin="normal"
          />

          {/* 邮箱 */}
          <TextField
            fullWidth
            label={t.email}
            name="email"
            value={form.email}
            onChange={handleChange}
            margin="normal"
          />

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            onClick={handleSave}
          >
            {t.save}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
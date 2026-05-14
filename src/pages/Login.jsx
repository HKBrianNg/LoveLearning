import { useState } from 'react';
import { Box, Typography, Card, CardContent, TextField, Button } from '@mui/material';
import { useLang } from '../context/LangContext';
import { useAuth } from '../context/AuthContext'; // 引入 Auth

export default function Login({ goHome }) {
  const { t } = useLang();
  const { login } = useAuth(); // 获取 login 方法
  const [user, setUser] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    // 模拟登录：保存用户名到全局状态
    login({ username: user.username, nickname: user.username });
    goHome();
  };

  return (
    <Box sx={{ maxWidth: 420, mx: 'auto', mt: 6 }}>
      <Card>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom align="center">
            {t.login}
          </Typography>

          <TextField
            fullWidth
            label={t.username}
            name="username"
            value={user.username}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label={t.password}
            name="password"
            type="password"
            value={user.password}
            onChange={handleChange}
            margin="normal"
          />

          <Button fullWidth variant="contained" sx={{ mt: 3 }} onClick={handleLogin}>
            {t.loginBtn}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
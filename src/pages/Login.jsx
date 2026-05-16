import { useState } from 'react';
import { Box, Typography, TextField, Button, Card, CardContent } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LangContext';

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const { t } = useLang();

  const handleLogin = async () => {
    try {
      // ✅ 使用正确路由：/api/auth/login
      await login(username, password);
      alert(t.loginSuccess || '登录成功');
      if (onLoginSuccess) onLoginSuccess();
    } catch (err) {
      console.error(err);
      alert(t.loginFailed || '登录失败：用户名或密码错误');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8 }}>
      <Card elevation={3}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" mb={3} textAlign="center">
            {t.login || '登录'}
          </Typography>

          <TextField
            fullWidth
            label={t.username || '用户名'}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label={t.password || '密码'}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 3 }}
          />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLogin}
          >
            {t.login || '登录'}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
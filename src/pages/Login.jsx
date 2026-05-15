import { useState } from 'react';
import { Box, Typography, Card, CardContent, TextField, Button } from '@mui/material';
import { useLang } from '../context/LangContext';
import { useAuth } from '../context/AuthContext';

export default function Login({ goHome, goRegister }) {
  const { t } = useLang();
  const { login } = useAuth();
  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    const ok = await login(form.username, form.password);
    if (ok) goHome();
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
            value={form.username}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label={t.password}
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            margin="normal"
          />

          <Button fullWidth variant="contained" sx={{ mt: 3 }} onClick={handleLogin}>
            {t.loginBtn}
          </Button>

          <Button fullWidth sx={{ mt: 2 }} onClick={goRegister}>
            没有账号？去注册
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
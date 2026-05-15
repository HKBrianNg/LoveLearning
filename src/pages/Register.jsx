import { useState } from 'react';
import { Box, Typography, Card, CardContent, TextField, Button } from '@mui/material';
import axios from 'axios';
import { useLang } from '../context/LangContext';

export default function Register({ goLogin }) {
  const { t } = useLang();
  const [form, setForm] = useState({
    username: '',
    password: '',
    confirm: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    if (form.password !== form.confirm) {
      alert(t.pwdNotMatch);
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/user/register', {
        username: form.username,
        password: form.password
      });

      if (res.data.code === 200) {
        alert(t.registerSuccess);
        goLogin();
      } else {
        alert(res.data.msg);
      }
    } catch {
      alert('Register failed');
    }
  };

  return (
    <Box sx={{ maxWidth: 420, mx: 'auto', mt: 6 }}>
      <Card>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom align="center">
            {t.register}
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
          <TextField
            fullWidth
            label={t.confirmPassword}
            name="confirm"
            type="password"
            value={form.confirm}
            onChange={handleChange}
            margin="normal"
          />

          <Button fullWidth variant="contained" sx={{ mt: 3 }} onClick={handleRegister}>
            {t.registerBtn}
          </Button>
          <Button fullWidth sx={{ mt: 2 }} onClick={goLogin}>
            {t.haveAccount}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
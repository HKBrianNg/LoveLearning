import { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, TextField, Button, Avatar, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useLang } from '../context/LangContext';
import { useAuth } from '../context/AuthContext';

export default function ProfileEdit({ goBack }) {
  const { t } = useLang();
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({ nickname: '', bio: '', gender: '', phone: '', email: '' });

  useEffect(() => {
    if (user) setForm(user);
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    await updateUser(form);
    alert(t.saveSuccess);
    goBack();
  };

  if (!user) return <Box sx={{ textAlign: 'center', mt: 4 }}><Typography>请先登录</Typography></Box>;

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 4 }}>
      <Card>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" mb={3}>{t.editProfile}</Typography>
          <TextField fullWidth label={t.nickname} name="nickname" value={form.nickname} onChange={handleChange} margin="normal" />
          <TextField fullWidth multiline rows={3} label={t.bio} name="bio" value={form.bio} onChange={handleChange} margin="normal" />
          <FormControl fullWidth margin="normal">
            <InputLabel>{t.gender}</InputLabel>
            <Select name="gender" value={form.gender} label={t.gender} onChange={handleChange}>
              <MenuItem value="male">{t.male}</MenuItem>
              <MenuItem value="female">{t.female}</MenuItem>
              <MenuItem value="secret">{t.secret}</MenuItem>
            </Select>
          </FormControl>
          <TextField fullWidth label={t.phone} name="phone" value={form.phone} onChange={handleChange} margin="normal" />
          <TextField fullWidth label={t.email} name="email" value={form.email} onChange={handleChange} margin="normal" />
          <Button fullWidth variant="contained" sx={{ mt: 3 }} onClick={handleSave}>{t.save}</Button>
        </CardContent>
      </Card>
    </Box>
  );
}
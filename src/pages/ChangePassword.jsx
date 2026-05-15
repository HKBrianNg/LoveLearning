import { useState } from 'react';
import { Box, Typography, Card, CardContent, TextField, Button, FormHelperText } from '@mui/material';
import { useLang } from '../context/LangContext';
import { useAuth } from '../context/AuthContext';

export default function ChangePassword({ goBack }) {
  const { t } = useLang();
  const { changePwd } = useAuth();
  const [form, setForm] = useState({ old: '', new: '', confirm: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (form.new !== form.confirm) {
      setError(t.passwordNotMatch);
      return;
    }
    const ok = await changePwd(form.old, form.new);
    if (ok) {
      alert(t.passwordChanged);
      goBack();
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
      <Card>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" mb={3}>{t.changePassword}</Typography>
          <TextField fullWidth label={t.oldPassword} name="old" type="password" value={form.old} onChange={handleChange} margin="normal" />
          <TextField fullWidth label={t.newPassword} name="new" type="password" value={form.new} onChange={handleChange} margin="normal" />
          <TextField fullWidth label={t.confirmPassword} name="confirm" type="password" value={form.confirm} onChange={handleChange} margin="normal" error={!!error} />
          {error && <FormHelperText error>{error}</FormHelperText>}
          <Button fullWidth variant="contained" sx={{ mt: 3 }} onClick={handleSubmit}>{t.save}</Button>
        </CardContent>
      </Card>
    </Box>
  );
}
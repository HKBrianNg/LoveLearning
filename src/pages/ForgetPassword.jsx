import { useState } from 'react';
import { Box, Typography, Card, CardContent, TextField, Button } from '@mui/material';
import { useLang } from '../context/LangContext';

export default function ForgetPassword({ goLogin }) {
  const { t } = useLang();
  const [email, setEmail] = useState('');

  return (
    <Box sx={{ maxWidth: 420, mx: 'auto', mt: 6 }}>
      <Card>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom align="center">
            {t.forgetPwd}
          </Typography>
          <Typography sx={{ mb: 2 }} color="text.secondary">
            {t.resetPwdTip}
          </Typography>

          <TextField
            fullWidth
            label={t.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />

          <Button fullWidth variant="contained" sx={{ mt: 3 }}>
            {t.sendResetLink}
          </Button>
          <Button fullWidth sx={{ mt: 2 }} onClick={goLogin}>
            {t.backToLogin}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
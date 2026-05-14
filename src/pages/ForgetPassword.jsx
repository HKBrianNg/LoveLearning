import { useState } from 'react'
import { Box, Typography, Card, CardContent, TextField, Button } from '@mui/material'
import { useLang } from '../context/LangContext'

export default function ForgetPassword({ goLogin }) {
  const { t } = useLang()
  const [email, setEmail] = useState('')

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 5 }}>
      <Card>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" mb={2}>{t.forgetPwdPage}</Typography>
          <Typography color="text.secondary" mb={3}>{t.resetPwdTip}</Typography>

          <TextField
            fullWidth
            label={t.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />

          <Button fullWidth variant="contained" sx={{ mt: 2 }}>
            {t.sendResetLink}
          </Button>

          <Button fullWidth sx={{ mt: 1 }} onClick={goLogin}>
            {t.backToLogin}
          </Button>
        </CardContent>
      </Card>
    </Box>
  )
}
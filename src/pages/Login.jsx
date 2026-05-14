import { useState } from 'react'
import { Box, Typography, Card, CardContent, TextField, Button } from '@mui/material'
import { useLang } from '../context/LangContext'

export default function Login({ goHome }) {
  const { t } = useLang()
  const [form, setForm] = useState({ username: '', password: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(p => ({ ...p, [name]: value }))
  }

  const handleLogin = () => {
    alert(t.loginBtn + ' success!')
    goHome()
  }

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 5 }}>
      <Card>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" mb={3}>{t.login}</Typography>

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

          <Button
            fullWidth
            variant="contained"
            onClick={handleLogin}
            sx={{ mt: 3 }}
          >
            {t.loginBtn}
          </Button>
        </CardContent>
      </Card>
    </Box>
  )
}
import { useState } from 'react'
import { Box, Card, CardContent, TextField, Button, Typography, Container } from '@mui/material'

export default function Login({ goHome }) {
  const [form, setForm] = useState({ username: '', password: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    // ✅ 这里修复正确了
    setForm(p => ({ ...p, [name]: value }))
  }

  const handleLogin = () => {
    alert('登录成功！')
    goHome()
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Card sx={{ width: '100%', borderRadius: 2, boxShadow: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
              登录
            </Typography>

            <TextField
              fullWidth label="用户名" name="username"
              margin="normal" variant="outlined"
              value={form.username} onChange={handleChange}
            />
            <TextField
              fullWidth label="密码" name="password" type="password"
              margin="normal" variant="outlined"
              value={form.password} onChange={handleChange}
            />

            <Button fullWidth variant="contained" sx={{ mt: 3, py:1.5 }} onClick={handleLogin}>
              登录
            </Button>

            <Button fullWidth sx={{ mt: 2 }} onClick={goHome}>
              返回主页
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}
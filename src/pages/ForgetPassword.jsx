import { useState } from 'react'
import { Box, Card, CardContent, TextField, Button, Typography, Container } from '@mui/material'

export default function ForgetPassword({ goHome }) {
  const [email, setEmail] = useState('')

  return (
    <Container maxWidth="sm">
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Card sx={{ width: '100%', borderRadius: 2, boxShadow: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>忘记密码</Typography>
            <TextField fullWidth label="邮箱" margin="normal" onChange={(e)=>setEmail(e.target.value)} />
            <Button fullWidth variant="contained" sx={{ mt:3 }}>发送重置链接</Button>
            <Button fullWidth sx={{ mt:2 }} onClick={goHome}>返回主页</Button>
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}
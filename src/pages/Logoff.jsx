import { Box, Card, Button, Typography, Container } from '@mui/material'

export default function Logoff({ goHome }) {
  return (
    <Container maxWidth="sm">
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Card sx={{ p:4, textAlign:'center' }}>
          <Typography variant="h5" gutterBottom>退出登录</Typography>
          <Button variant="contained" color="error" sx={{ mr:2 }}>确认退出</Button>
          <Button onClick={goHome}>返回主页</Button>
        </Card>
      </Box>
    </Container>
  )
}
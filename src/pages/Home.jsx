import { Typography, Box, Button, Card, CardContent } from '@mui/material';

export default function Home({ goLogin }) {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        🏠 Love Learning 学习平台
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
        欢迎来到主页，请登录后开始学习
      </Typography>

      <Card sx={{ maxWidth: 500, boxShadow: 2 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            未登录状态
          </Typography>
          <Typography sx={{ mb: 3 }}>
            请点击右上角头像 → 登录，进入你的学习中心
          </Typography>
          <Button variant="contained" onClick={goLogin}>
            前往登录
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
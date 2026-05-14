import { Box, Typography, Card, CardContent, Button, Avatar } from '@mui/material';
import { useLang } from '../context/LangContext';
import { useAuth } from '../context/AuthContext';

export default function Profile({ goEdit }) {
  const { t } = useLang();
  const { user } = useAuth();

  if (!user) {
    return (
      <Box sx={{ textAlign:'center', mt:4 }}>
        <Typography>请先登录</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 4 }}>
      <Card>
        <CardContent sx={{ p: 4, textAlign: "center" }}>
          <Avatar sx={{ width: 100, height: 100, mx: "auto", fontSize:40 }}>
            {user.nickname?.charAt(0) || user.username?.charAt(0) || '?'}
          </Avatar>
          <Typography variant="h5" mt={2}>
            {user.nickname || user.username}
          </Typography>
          <Typography color="text.secondary" mb={2}>
            {user.bio || '热爱学习的用户'}
          </Typography>
          <Button variant="contained" onClick={goEdit}>
            {t.editProfile}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
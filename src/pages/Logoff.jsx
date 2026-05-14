import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { useLang } from '../context/LangContext';
import { useAuth } from '../context/AuthContext'; // 引入 Auth

export default function Logoff({ goHome }) {
  const { t } = useLang();
  const { logout } = useAuth(); // 获取 logout 方法

  const handleLogout = () => {
    logout(); // 清除全局用户信息
    goHome();
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 6 }}>
      <Card>
        <CardContent sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            {t.logoutSuccess}
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            {t.logoutTip}
          </Typography>
          <Button variant="contained" onClick={handleLogout}>
            {t.home}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
import { Box, Typography, Card, CardContent, Button, Avatar } from '@mui/material';
import { useLang } from '../context/LangContext';

export default function Profile({ goEdit }) {
  const { t } = useLang();

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 4 }}>
      <Card>
        <CardContent sx={{ p: 4, textAlign: "center" }}>
          <Avatar sx={{ width: 100, height: 100, mx: "auto" }}>
            张
          </Avatar>
          <Typography variant="h5" mt={2}>张三</Typography>
          <Typography color="text.secondary" mb={2}>热爱学习的用户</Typography>

          <Button variant="contained" onClick={goEdit}>
            {t.editProfile}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
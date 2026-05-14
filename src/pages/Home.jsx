import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { useLang } from '../context/LangContext';

export default function Home({ goLogin }) {
  const { t } = useLang();

  return (
    <Box>
      <Typography variant="h5" color="text.secondary" gutterBottom>
        {t.welcomeMsg}
      </Typography>

      <Card sx={{ mt: 4, p: 2 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {t.notLoginStatus}
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            {t.notLoginTip}
          </Typography>
          <Button variant="contained" color="primary" onClick={goLogin}>
            {t.goLogin}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
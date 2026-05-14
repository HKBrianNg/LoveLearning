import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { useLang } from '../context/LangContext';

export default function Home() {
  const { t } = useLang();

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 4 }}>
      <Card>
        <CardContent sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            {t.platformName}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
            {t.welcomeMsg}
          </Typography>
          <Typography sx={{ mb: 2 }}>
            {t.notLoginTip}
          </Typography>
          <Button variant="contained">{t.goLogin}</Button>
        </CardContent>
      </Card>
    </Box>
  );
}
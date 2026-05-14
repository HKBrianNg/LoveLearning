import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import { useLang } from '../context/LangContext';
import { useAuth } from '../context/AuthContext';

export default function Course() {
  const { t } = useLang();
  const { user } = useAuth();

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        {t.course}
      </Typography>

      {user ? (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" color="primary">
              👋 {user.nickname}
            </Typography>
            <Typography color="text.secondary">
              {t.courseWelcome}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography color="text.secondary">
              {t.courseNeedLogin}
            </Typography>
          </CardContent>
        </Card>
      )}

      <Grid container spacing={3}>
        {[1,2,3,4].map(item => (
          <Grid item xs={12} sm={6} md={4} key={item}>
            <Card>
              <CardContent>
                <Typography variant="h6">{t.course} {item}</Typography>
                <Typography color="text.secondary">
                  {t.courseItem}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
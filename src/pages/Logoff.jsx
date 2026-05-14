import { Box, Typography, Card, CardContent, Button } from '@mui/material'
import { useLang } from '../context/LangContext'

export default function Logoff({ goHome }) {
  const { t } = useLang()

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 5 }}>
      <Card>
        <CardContent sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h4" mb={2}>{t.logoff}</Typography>
          <Typography variant="h6" mb={1}>{t.logoutSuccess}</Typography>
          <Typography color="text.secondary" mb={3}>{t.logoutTip}</Typography>

          <Button variant="contained" onClick={goHome}>
            {t.home}
          </Button>
        </CardContent>
      </Card>
    </Box>
  )
}
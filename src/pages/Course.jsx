import { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import axios from 'axios';
import { useLang } from '../context/LangContext';
import { useAuth } from '../context/AuthContext';

export default function Course() {
  const { t } = useLang();
  const { user } = useAuth();
  const [list, setList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/course/list').then(res => {
      if (res.data.code === 200) setList(res.data.list);
    });
  }, []);

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>{t.course}</Typography>
      {user ? (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" color="primary">👋 {user.nickname}</Typography>
            <Typography color="text.secondary">{t.courseWelcome}</Typography>
          </CardContent>
        </Card>
      ) : (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography color="text.secondary">{t.courseNeedLogin}</Typography>
          </CardContent>
        </Card>
      )}
      <Grid container spacing={3}>
        {list.map(item => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{item.title}</Typography>
                <Typography color="text.secondary">{item.descr}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
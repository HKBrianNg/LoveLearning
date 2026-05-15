const express = require('express');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// 路由
app.use('/api/user', userRoutes);
app.use('/api/course', courseRoutes);

app.listen(PORT, ()=>{
  console.log(`后端运行在 http://localhost:${PORT}`);
});
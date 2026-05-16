const express = require('express');
const cors = require('cors');
const app = express();

// 中间件
app.use(cors());
app.use(express.json());

// 静态文件：头像访问
app.use('/uploads', express.static('uploads'));

// ==============================================
// 你原来的所有路由（我不动，全部保留）
// ==============================================
const courseRoutes = require('./routes/courseRoutes');
// const enrollRoutes = require('./routes/enrollRoutes');
// const messageRoutes = require('./routes/messageRoutes');
// const noticeRoutes = require('./routes/noticeRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

app.use('/api/course', courseRoutes);
// app.use('/api/enroll', enrollRoutes);
// app.use('/api/message', messageRoutes);
// app.use('/api/notice', noticeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/upload', uploadRoutes);

// 启动服务
const PORT = 5000;
app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
import { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Dialog,
  DialogTitle, DialogContent, TextField, DialogActions
} from '@mui/material';
import axios from 'axios';
import { useLang } from '../context/LangContext';
import { useAuth } from '../context/AuthContext';

export default function CourseManage({ goLogin }) {
  const { t } = useLang();
  const { user } = useAuth();
  const [list, setList] = useState([]);

  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ title: '', descr: '' });

  // ======================
  // 权限校验：未登录直接跳转到登录页
  // ======================
  useEffect(() => {
    if (!user) {
      alert(t.courseNeedLogin);
      goLogin();
    }
    // 非管理员禁止进入
    if (user.role !== 'admin') {
      alert('无管理员权限');
      goLogin();
    }
  }, [user, goLogin, t]);

  // 未登录直接不渲染页面
  if (!user) return null;

  // 加载课程列表
  const loadList = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/course/list');
      if (res.data.code === 200) setList(res.data.list);
    } catch (err) {
      alert('登录已过期，请重新登录');
      goLogin();
    }
  };

  useEffect(() => {
    loadList();
  }, []);

  // 新增
  const handleAdd = () => {
    setEditId(null);
    setForm({ title: '', descr: '' });
    setOpen(true);
  };

  // 编辑
  const handleEdit = (item) => {
    setEditId(item.id);
    setForm({ title: item.title, descr: item.descr });
    setOpen(true);
  };

  // 保存
  const handleSave = async () => {
    if (!form.title) return;
    try {
      if (editId) {
        await axios.post('http://localhost:5000/api/course/edit', {
          id: editId,
          title: form.title,
          descr: form.descr
        });
      } else {
        await axios.post('http://localhost:5000/api/course/add', form);
      }
      setOpen(false);
      loadList();
    } catch {
      alert('登录已过期，请重新登录');
      goLogin();
    }
  };

  // 删除
  const handleDel = async (id) => {
    if (!window.confirm(t.confirmDel)) return;
    try {
      await axios.post('http://localhost:5000/api/course/del', { id });
      loadList();
    } catch {
      alert('登录已过期，请重新登录');
      goLogin();
    }
  };

  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto', mt: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">{t.courseManage}</Typography>
        <Button variant="contained" onClick={handleAdd}>{t.addCourse}</Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>{t.courseTitle}</TableCell>
              <TableCell>{t.courseDesc}</TableCell>
              <TableCell>{t.operate}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.descr}</TableCell>
                <TableCell>
                  <Button size="small" onClick={() => handleEdit(item)}>{t.edit}</Button>
                  <Button size="small" color="error" onClick={() => handleDel(item.id)}>{t.del}</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editId ? t.editCourse : t.addCourse}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label={t.courseTitle}
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label={t.courseDesc}
            multiline
            rows={3}
            value={form.descr}
            onChange={(e) => setForm({ ...form, descr: e.target.value })}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>{t.save}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
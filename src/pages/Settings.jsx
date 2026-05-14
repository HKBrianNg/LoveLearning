import {
  Box, Typography, Card, CardContent,
  FormControl, InputLabel, Select, MenuItem,
  Switch, FormControlLabel, Button
} from '@mui/material';
import { useLang } from '../context/LangContext';
import { useThemeStore } from '../context/ThemeContext';

export default function Settings({ onNavigate }) {
  const { lang, t, changeLang } = useLang();
  const { mode, toggleTheme, color, changeColor, density, changeDensity } = useThemeStore();

  const langText = {
    'zh-CN': '简体中文',
    'zh-TW': '繁體中文',
    'en': 'English'
  };

  // 兜底：如果 onNavigate 没传，用空函数防止报错
  const safeNavigate = typeof onNavigate === 'function' ? onNavigate : () => {};

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', pt: 2 }}>
      <Typography variant="h4" gutterBottom>
        {t.systemSetting}
      </Typography>

      {/* 语言设置 */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {t.langSetting}
          </Typography>
          <FormControl fullWidth sx={{ maxWidth: 320 }}>
            <InputLabel>{t.selectLang}</InputLabel>
            <Select
              value={lang}
              label={t.selectLang}
              onChange={(e) => changeLang(e.target.value)}
            >
              <MenuItem value="zh-CN">简体中文</MenuItem>
              <MenuItem value="zh-TW">繁體中文</MenuItem>
              <MenuItem value="en">English</MenuItem>
            </Select>
          </FormControl>
          <Typography sx={{ mt: 2 }} color="text.secondary">
            {t.currentLang}{langText[lang]}
          </Typography>
        </CardContent>
      </Card>

      {/* 暗黑模式 */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {t.themeSetting}
          </Typography>
          <FormControlLabel
            control={<Switch checked={mode === 'dark'} onChange={toggleTheme} />}
            label={t.darkMode}
          />
        </CardContent>
      </Card>

      {/* 主题颜色 */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {t.themeColor}
          </Typography>
          <FormControl fullWidth sx={{ maxWidth: 320 }}>
            <InputLabel>{t.themeColor}</InputLabel>
            <Select
              value={color}
              label={t.themeColor}
              onChange={(e) => changeColor(e.target.value)}
            >
              <MenuItem value="blue">{t.blue}</MenuItem>
              <MenuItem value="green">{t.green}</MenuItem>
              <MenuItem value="purple">{t.purple}</MenuItem>
              <MenuItem value="red">{t.red}</MenuItem>
            </Select>
          </FormControl>
        </CardContent>
      </Card>

      {/* 布局风格 */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {t.layoutStyle}
          </Typography>
          <FormControl fullWidth sx={{ maxWidth: 320 }}>
            <InputLabel>{t.layoutStyle}</InputLabel>
            <Select
              value={density}
              label={t.layoutStyle}
              onChange={(e) => changeDensity(e.target.value)}
            >
              <MenuItem value="compact">{t.compact}</MenuItem>
              <MenuItem value="normal">{t.normal}</MenuItem>
            </Select>
          </FormControl>
        </CardContent>
      </Card>

      {/* 基础设置 */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {t.baseSetting}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, maxWidth: 320 }}>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => safeNavigate('profileEdit')}
            >
              {t.editProfile}
            </Button>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => safeNavigate('changePwd')}
            >
              {t.changePassword}
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* 通知设置 */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {t.notifySetting}
          </Typography>
          <Typography color="text.secondary">
            课程提醒、系统消息、邮件通知
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
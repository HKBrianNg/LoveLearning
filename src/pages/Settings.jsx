import {
  Box, Typography, Card, CardContent,
  FormControl, InputLabel, Select, MenuItem, Switch, FormControlLabel
} from '@mui/material';
import { useLang } from '../context/LangContext';
import { useThemeStore } from '../context/ThemeContext';

export default function Settings() {
  const { lang, t, changeLang } = useLang();
  const { mode, toggleTheme, color, changeColor, density, changeDensity } = useThemeStore();

  const langText = { 'zh-CN': '简体中文', 'zh-TW': '繁體中文', 'en': 'English' };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>{t.systemSetting}</Typography>

      {/* 语言 */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>{t.langSetting}</Typography>
          <FormControl fullWidth sx={{ maxWidth: 300 }}>
            <InputLabel>{t.selectLang}</InputLabel>
            <Select value={lang} label={t.selectLang} onChange={(e) => changeLang(e.target.value)}>
              <MenuItem value="zh-CN">简体中文</MenuItem>
              <MenuItem value="zh-TW">繁體中文</MenuItem>
              <MenuItem value="en">English</MenuItem>
            </Select>
          </FormControl>
          <Typography sx={{ mt: 2 }} color="text.secondary">{t.currentLang}{langText[lang]}</Typography>
        </CardContent>
      </Card>

      {/* 暗黑模式 */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>{t.themeSetting}</Typography>
          <FormControlLabel
            control={<Switch checked={mode === 'dark'} onChange={toggleTheme} />}
            label={t.darkMode}
          />
        </CardContent>
      </Card>

      {/* 主题颜色 */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>{t.themeColor}</Typography>
          <FormControl fullWidth sx={{ maxWidth: 300 }}>
            <InputLabel>{t.themeColor}</InputLabel>
            <Select value={color} label={t.themeColor} onChange={(e) => changeColor(e.target.value)}>
              <MenuItem value="blue">{t.blue}</MenuItem>
              <MenuItem value="green">{t.green}</MenuItem>
              <MenuItem value="purple">{t.purple}</MenuItem>
              <MenuItem value="red">{t.red}</MenuItem>
            </Select>
          </FormControl>
        </CardContent>
      </Card>

      {/* 布局紧凑/宽松 */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>{t.layoutStyle}</Typography>
          <FormControl fullWidth sx={{ maxWidth: 300 }}>
            <InputLabel>{t.layoutStyle}</InputLabel>
            <Select value={density} label={t.layoutStyle} onChange={(e) => changeDensity(e.target.value)}>
              <MenuItem value="compact">{t.compact}</MenuItem>
              <MenuItem value="normal">{t.normal}</MenuItem>
            </Select>
          </FormControl>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">{t.baseSetting}</Typography>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6">{t.notifySetting}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
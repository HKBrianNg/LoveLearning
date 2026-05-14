import { 
  Box, Typography, Card, CardContent, 
  FormControl, InputLabel, Select, MenuItem 
} from '@mui/material'
import { useLang } from '../context/LangContext';

export default function Settings() {
  const { lang, t, changeLang } = useLang();

  const langText = {
    'zh-CN': '简体中文',
    'zh-TW': '繁體中文',
    'en': 'English'
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {t.systemSetting}
      </Typography>

      {/* 语言设置 */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {t.langSetting}
          </Typography>
          
          <FormControl fullWidth sx={{ maxWidth: 300 }}>
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

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">{t.baseSetting}</Typography>
          <Typography color="text.secondary">账号安全、密码修改、邮箱绑定</Typography>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">{t.themeSetting}</Typography>
          <Typography color="text.secondary">主题颜色、暗黑模式、布局风格</Typography>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6">{t.notifySetting}</Typography>
          <Typography color="text.secondary">课程提醒、系统消息、邮件通知</Typography>
        </CardContent>
      </Card>
    </Box>
  )
}
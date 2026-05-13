// theme.js  全局主题配置
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  // 主色调（你可以随便改颜色）
  palette: {
    primary: {
      main: '#1976d2', // 蓝色
    },
    secondary: {
      main: '#dc004e', // 粉色
    },
  },

  // 字体
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif',
  },
});

export default theme;
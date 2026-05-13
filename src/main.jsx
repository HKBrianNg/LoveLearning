import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// 引入 MUI 主题
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from './theme.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 主题包裹整个项目 */}
    <ThemeProvider theme={theme}>
      {/* 自动重置全局样式 = 代替 index.css */}
      <CssBaseline />
      
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
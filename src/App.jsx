import React from 'react'
import {Button, TextField, Box} from '@mui/material'

function App() {
  return (
    <Box sx={{ margin: 5 }}>
      <h1>我爱学习 Love Learning</h1>

      {/* Material Design 输入框 */}
      <TextField
        label="请输入内容"
        variant="outlined"
        sx={{ marginRight: 2 }}
      />

      {/* Material Design 按钮 */}
      <Button variant="contained" color="primary">
        提交
      </Button>
    </Box>
  )
}

export default App
import { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const ThemeContext = createContext();

// ✅ 修复：必须使用 { main: '#xxx' } 格式
const paletteColors = {
  blue: {
    primary: { main: '#1976d2' }
  },
  green: {
    primary: { main: '#388e3c' }
  },
  purple: {
    primary: { main: '#7b1fa2' }
  },
  red: {
    primary: { main: '#d32f2f' }
  }
};

export function ThemeProviderWrapper({ children }) {
  const [mode, setMode] = useState(() => localStorage.getItem('mode') || 'light');
  const [color, setColor] = useState(() => localStorage.getItem('color') || 'blue');
  const [density, setDensity] = useState(() => localStorage.getItem('density') || 'normal');

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('mode', newMode);
  };

  const changeColor = (c) => {
    setColor(c);
    localStorage.setItem('color', c);
  };

  const changeDensity = (d) => {
    setDensity(d);
    localStorage.setItem('density', d);
  };

  const theme = createTheme({
    palette: {
      mode,
      ...paletteColors[color],
    },
    spacing: density === 'compact' ? 2 : 4,
  });

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, color, changeColor, density, changeDensity }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export const useThemeStore = () => useContext(ThemeContext);
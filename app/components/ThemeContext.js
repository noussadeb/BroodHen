// ThemeContext.js
import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const theme = {
    isDarkMode,
    toggleDarkMode,
    colors: {
      background: isDarkMode ? '#333' : '#f4f4f4',
      text: isDarkMode ? '#fff' : '#333',
      primary: isDarkMode ? '#BB86FC' : '#6200EE',
    },
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

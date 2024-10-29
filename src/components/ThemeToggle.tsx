import React, { useEffect } from 'react';

const ThemeToggle: React.FC = () => {
  useEffect(() => {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.body.classList.toggle('dark', prefersDarkScheme);
  }, []);

  return null; // No UI element needed
};

export default ThemeToggle;

// src/theme.ts

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2', // プライマリカラー
            light: '#42a5f5',
            dark: '#1565c0',
        },
        secondary: {
            main: '#dc004e', // セカンダリカラー
            light: '#ff4081',
            dark: '#9a0036',
        },
        background: {
            default: '#f5f5f5',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 500,
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 500,
        },
        h3: {
            fontSize: '1.75rem',
            fontWeight: 500,
        },
        body1: {
            fontSize: '1rem',
        },
        button: {
            textTransform: 'none', // ボタンテキストを大文字に変換しない
        },
    },
    shape: {
        borderRadius: 8,
    },
    spacing: 8, // ベーススペーシング（単位: px）
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    padding: '8px 16px',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    marginBottom: '16px',
                },
            },
        },
    },
});

export default theme;
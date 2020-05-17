import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import * as serviceWorker from './serviceWorker';
import { CssBaseline } from './styles';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { COLORS, FONT_WEIGHT } from './styles/constants';

import { BrowserRouter } from "react-router-dom";

const defaultTheme = createMuiTheme({
  palette: {
    primary: {
      light: 'E57B42',
      main: COLORS.primary,
      dark: '#AA4A17',
      contrastText: '#fff',
    },
    secondary: {
      light: '#3A8DF2',
      main: COLORS.secondary,
      dark: '#0B5ABA',
      contrastText: '#fff',
    },
    background: {
      default: COLORS.bodyBackground,
    },
    text: {
      primary: '#39394D',
    }
  },
  typography: {
    fontFamily: [
      'Avenir Next',
      'Avenir',
      'Lato',
      'Helvetica',
      'Arial',
      '"游ゴシック"',
      '"Yu Gothic"',
      '"游ゴシック体"',
      '"YuGothic"',
      '"ヒラギノ角ゴ Pro W3"',
      '"Hiragino Kaku Gothic Pro"',
      '"Meiryo UI"',
      '"メイリオ"',
      'Meiryo',
      'sans-serif',
    ].join(','),
    h6: {
      fontWeight: FONT_WEIGHT.bold,
    }
  },
})

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();

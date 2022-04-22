import CssBaseline from '@mui/material/CssBaseline';
import * as React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

if (typeof window !== "undefined") {
  ReactDOM.render(
    <React.Fragment>
      <CssBaseline />
      <App />
    </React.Fragment>,
    document.getElementById('root'),
  );
}
import React from 'react';
import ReactDOM from 'react-dom/client';

import { Root } from './components/Root';

import './index.css';
import '@xelene/tgui/dist/styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);

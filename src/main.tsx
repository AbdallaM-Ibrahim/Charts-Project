import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './store';
import { FileProvider } from './contexts/FileContext';
import { Chart } from 'chart.js';
import { MatrixController, MatrixElement } from 'chartjs-chart-matrix';

Chart.register(MatrixController, MatrixElement);

// biome-ignore lint/style/noNonNullAssertion: <explanation>
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <FileProvider>
        <App />
      </FileProvider>
    </Provider>
  </React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HashRouter as Router} from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter basename='/mtm-frontend-react'>
    <App />
  </BrowserRouter>
);

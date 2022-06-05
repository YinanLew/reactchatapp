import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import App from './App';
import * as serviceWorker from "./StateProvider";
import reducer, {initialState} from "./reducer";
import {StateProvider} from "./StateProvider";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <StateProvider initialState={initialState}
      reducer={reducer}>
          <BrowserRouter>
              <App />
          </BrowserRouter>
      </StateProvider>
  </React.StrictMode>
);

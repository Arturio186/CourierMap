import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';

import UserStore from './store/UserStore';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

export const Context = createContext(null as any);

root.render(
  <Context.Provider value={{
    user: new UserStore()
  }}>

      <App />
    
  </Context.Provider>
);



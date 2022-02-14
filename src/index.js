import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ProxyStore from './store/ProxyStore';
import UserStore from './store/UserStore';

export const Context = createContext(null) 

ReactDOM.render(
  <Context.Provider value={{
    user: new UserStore(),
    proxy: new ProxyStore()
  }}>
    <App />
  </Context.Provider>,
  document.getElementById('root')
);



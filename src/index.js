import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ProxyStore from './store/ProxyStore';
import ProxyWithoutStore from './store/ProxyWithoutStore';
import UserStore from './store/UserStore';
import PaymentStore from './store/paymentStore';

export const Context = createContext(null) 

ReactDOM.render(
  <Context.Provider value={{
    user: new UserStore(),
    proxy: new ProxyStore(),
    withoutProxy: new ProxyWithoutStore(),
    payment: new PaymentStore()
  }}>
    <App />
  </Context.Provider>,
  document.getElementById('root')
);



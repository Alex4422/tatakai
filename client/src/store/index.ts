import { createStore, applyMiddleware } from 'redux';

import rootReducer from '../reducers';
import web3MW from '../middlewares/web3';

declare const window: any;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 });

const store = createStore(
  rootReducer,
  composeEnhancers( 
    applyMiddleware(web3MW)
  )
);

// on l'exporte par défaut
export default store;
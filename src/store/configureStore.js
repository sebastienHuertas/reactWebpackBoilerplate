import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';

import rootReducers from './rootReducers';
import {
  checkMiddlewares,
  apiMiddlewares,
  storageMiddlewares,
  errorMiddlewares
} from './middlewares';

const composeEnhancers = composeWithDevTools;

export default (defaultState, services) => {
  const api = services.get('api');
  const storage = services.get('storage');
  const persistConfig = {
    key: process.env.STORAGE_NAME,
    storage
  };

  const persistedReducer = persistReducer(persistConfig, rootReducers);

  const store = createStore(
    persistedReducer,
    defaultState,
    composeEnhancers(
      applyMiddleware(
        thunk,
        ...checkMiddlewares({ api, storage }),
        ...apiMiddlewares({ api }),
        ...storageMiddlewares({ storage }),
        ...errorMiddlewares()
      )
    )
  );

  const persistor = persistStore(store);

  return { store, persistor };
};

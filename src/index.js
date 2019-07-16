import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import App from './views';
import services from './services';
import config from './config';
import { configureStore } from './store';

const servicesContainer = services(config);
const { store, persistor } = configureStore({}, servicesContainer);

const Root = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));

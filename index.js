import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import i18n from './i18n';
import { ThemeProvider } from 'emotion-theming';

import services from './services';
import config from './config';
import App from './views';
import { configureStore } from './store';

import theme from './theme';

const servicesContainer = services(config);
const store = configureStore({}, servicesContainer);

const Root = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme.getTheme()}>
        <IntlProvider locale="fr" messages={i18n.getMessages('fr')}>
          <App />
        </IntlProvider>
      </ThemeProvider>
    </Provider>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));

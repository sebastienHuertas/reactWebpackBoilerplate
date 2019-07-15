import axios from 'axios';
import HTTPError from './HTTPError';

export default ({ baseURL, storage }) => {
  return {
    async request({
      method,
      route,
      params,
      data,
      headers = {},
      responseType = 'json',
      auth = false
    }) {
      try {
        if (auth) {
          const credentials = await storage.get('credentials', true);
          if (!credentials) {
            throw new Error('No credentials stored');
          }
          headers = Object.assign(
            {
              Authorization: `${credentials.tokenType} ${credentials.accessToken}`
            },
            headers
          );
        }
        const response = await axios.request({
          method,
          responseType,
          baseURL,
          url: route,
          params,
          data,
          headers
        });
        return response;
      } catch (err) {
        if (err.response && err.response.data) {
          const { name, message, context } = err.response.data;
          throw new HTTPError(name, message, context);
        } else {
          throw err;
        }
      }
    }
  };
};

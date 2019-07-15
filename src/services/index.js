import api from './api';
import storage from './storage';

export default config => {
  const services = {};
  services.storage = storage();
  services.api = api({ baseURL: config.api.url, storage: services.storage });

  return {
    get(name) {
      return services[name];
    }
  };
};

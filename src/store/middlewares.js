import * as app from './app/middlewares';

export function checkMiddlewares({ api, storage }) {
  return [];
}

export function apiMiddlewares({ api }) {
  return [];
}

export function storageMiddlewares({ storage }) {
  return [];
}

export function errorMiddlewares() {
  return [app.errorMiddleware()];
}

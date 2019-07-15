import _ from 'lodash';

async function get(key, toObject = false) {
  const value = localStorage.getItem(key);
  if (toObject) {
    return JSON.parse(value);
  }
  return value;
}

async function getItem(key, toObject = false) {
  return get(key, toObject);
}

async function set(key, value) {
  if (typeof value === 'object') {
    value = JSON.stringify(value);
  }

  return localStorage.setItem(key, value);
}

async function setItem(key, value) {
  return set(key, value);
}

async function merge(key, newValue) {
  const oldValue = await get(key, true);
  if (_.isObject(oldValue)) {
    return set(key, { ...oldValue, ...newValue });
  }
  return set(key, newValue);
}

async function has(key) {
  return (await get(key)) !== null;
}

async function remove(key) {
  return localStorage.removeItem(key);
}

async function clear() {
  return localStorage.clear();
}

export default () => ({
  get,
  getItem,
  set,
  setItem,
  merge,
  has,
  remove,
  clear
});

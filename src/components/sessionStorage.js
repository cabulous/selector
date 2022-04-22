import { merge } from 'lodash';

import { getLogger } from './logger';
import is from '../utils/is';

class SessionStorage {
  constructor(key) {
    this.key = key;
  }

  static get supported() {
    const logger = getLogger();

    try {
      if (!('sessionStorage' in window)) {
        logger.error('sessionStorage not in window');
        return false;
      }

      const test = '___test';

      // Try to use it (it might be disabled, e.g. user is in private mode)
      window.sessionStorage.setItem(test, test);
      window.sessionStorage.removeItem(test);

      return true;
    } catch (e) {
      logger.error('sessionStorage not supported');
      return false;
    }
  }

  /**
   * @param {string} [key]
   * @return {*|null}
   */
  get(key) {
    if (!SessionStorage.supported) {
      return null;
    }

    const store = window.sessionStorage.getItem(this.key);

    if (is.empty(store)) {
      return null;
    }

    const json = JSON.parse(store);

    return is.string(key) && key.length ? json[key] : json;
  }

  /**
   * @param {*} object
   */
  set(object) {
    if (!SessionStorage.supported) {
      return;
    }

    // Can only store objects
    if (!is.object(object)) {
      return;
    }

    // Get current storage
    let storage = this.get();

    // Default to empty object
    if (is.empty(storage)) {
      storage = {};
    }

    // Update the working copy of the values
    storage = merge(storage, object);

    // Update storage
    window.sessionStorage.setItem(this.key, JSON.stringify(storage));
  }
}

export default SessionStorage;

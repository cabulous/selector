import { getLogger } from './logger';
import SessionStorage from './sessionStorage';
import is from '../utils/is';

const SESSION_STORAGE_KEY = 'session-storage';
const CACHE_NAME = 'FileTranslatorCache';

class CacheClient {
  constructor() {
    this.cache = new SessionStorage(SESSION_STORAGE_KEY);
  }

  /**
   * @param {*} data
   * @return {boolean}
   */
  set(data) {
    const logger = getLogger();

    try {
      this.cache.set(data);
      return true;
    } catch (e) {
      logger.error('Fail saving cache');
      logger.error(e);
      return false;
    }
  }

  /**
   * @return {*|null}
   */
  get() {
    const data = this.cache.get();
    const success = CacheClient.verify(data);
    if (success) {
      return data;
    }
    return null;
  }

  /**
   * @param {*} data
   * @return {boolean}
   */
  static verify(data) {
    const logger = getLogger();
  }
}

export function getCacheClient() {
  let cache = window[CACHE_NAME];

  if (!is.nullOrUndefined(cache)) {
    return cache;
  }

  cache = new CacheClient();
  window[CACHE_NAME] = cache;

  return cache;
}

